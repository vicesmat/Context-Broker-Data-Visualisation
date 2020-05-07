import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { BaseComponent } from 'src/app/shared/misc/base.component';
import { ConfigDashboardService } from '../services/config-dashboard.service';
import { takeUntil } from 'rxjs/operators';
import { ContextBrokerForm, ServiceForm } from '../models/context-broker-form';
import { ContextBrokerConfiguration, ServiceConfiguration } from '../models/context-broker-configuration';
import { AppMessageService } from 'src/app/shared/services/app-message-service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ServiceConfigurationComponent } from './service-configuration/service-configuration.component';
import { AccordionTab } from 'primeng/accordion/accordion';
import { EntityTreeNodeService } from '../services/entity-tree-node.service';

@Component({
    selector: 'app-config-dashboard',
    templateUrl: './config-dashboard.component.html',
    styleUrls: ['./config-dashboard.component.scss'],
})
export class ConfigDashboardComponent extends BaseComponent implements OnInit {

    public configurationLoaded: boolean = false;
    public addedContextBrokerAtLeastOnce: boolean = false;
    public removedContextBrokerAtLeastOnce: boolean = false;
    public removedServiceAtLeastOnce: boolean = false;
    public selectedEntitiesChange: boolean = false;
    public accordionTabsSelected: boolean = false;
    public favAttrChange: boolean = false;
    public contextBrokers: ContextBrokerForm[] = [];

    @ViewChild('serviceConfiguration') private serviceConfiguration: ServiceConfigurationComponent;
    @ViewChildren('accordionTab') private accordionTabs: QueryList<AccordionTab>;

    constructor(
        private configDashboardService: ConfigDashboardService,
        private appMessageService: AppMessageService,
        private entityTreeNodeService: EntityTreeNodeService,
        private confirmationService: ConfirmationService,
        private router: Router,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.configDashboardService.getConfiguration().pipe(takeUntil(this.destroy$)).subscribe(
            contextBrokers => {
                if (contextBrokers.length === 0) {
                    this.onAddContextBroker();
                    this.configurationLoaded = true;
                } else {
                    this.loadConfiguration(contextBrokers);
                    this.configurationLoaded = true;
                }
            },
            err => {
                this.appMessageService.add({ severity: 'error', summary: 'Cannot load the configuration' });
            },
        );
    }

    public shouldApplyButtonBeDisplayed(): boolean {
        return this.configurationLoaded
            && (this.contextBrokers.length > 0 || this.addedContextBrokerAtLeastOnce || this.removedContextBrokerAtLeastOnce);
    }

    public shouldApplyButtonBeEnabled(): boolean {
        return this.shouldApplyButtonBeDisplayed() && this.isDirtyConfiguration() && this.isValidConfiguration();
    }

    public shouldAdvertisementBeDisplayed(): boolean {
        return this.shouldApplyButtonBeEnabled();
    }

    public onAddContextBroker(): void {
        this.accordionTabsSelected = true;
        if (this.accordionTabs && this.accordionTabs.length > 0) {
            this.accordionTabs.forEach(a => a.selected = false);
        }
        this.addedContextBrokerAtLeastOnce = true;
        this.contextBrokers.push({
            header: this.configDashboardService.defaultContextName,
            form: this.configDashboardService.createContextBrokerForm(),
            historicalForm: this.configDashboardService.createHistoricalForm(),
            services: [],
            entities: [],
            selectedEntities: [],
        });
    }

    public onRemoveService(): void {
        this.removedServiceAtLeastOnce = true;
    }

    public onSelectedEntitiesChange(): void {
        this.selectedEntitiesChange = true;
    }

    public onFavChange(): void {
        this.favAttrChange = true;
    }

    public onRemoveContextBroker(index: number): void {
        this.confirmationService.confirm({
            icon: 'pi pi-info',
            header: 'Are you sure you want to delete this Context Broker?',
            message: 'The configuration of the Context Broker "' + this.contextBrokers[index].header + '" will be deleted. ' +
                'Note that this change will only be confirmed when applying the configuration.',
            acceptLabel: 'Delete',
            rejectLabel: 'Cancel',
            accept: (): void => {
                this.removeContextBroker(index);
            },
        });
    }

    public onApplyConfiguration(): void {
        if (this.checkEntities()) {
            this.applyConfiguration();
        }
    }

    public onUrlChange(): void {
        if (this.serviceConfiguration) {
            this.serviceConfiguration.onContextBrokerUrlChange();
        }
    }

    private checkEntities(): boolean {
        let valid: boolean = true;
        this.contextBrokers.forEach(cb => {
            if (cb.services.length === 0) {
                if (cb.selectedEntities.length === 0) {
                    valid = false;
                }
            } else {
                cb.services.forEach(s => {
                    if (s.selectedEntities.length === 0) {
                        valid = false;
                    }
                });
            }
        });
        if (!valid) {
            this.appMessageService.add({
                severity: 'error', summary: 'Cannot apply the configuration',
                detail: 'There is at least one context broker or one service with no selected entities',
            });
        }
        return valid;
    }

    private applyConfiguration(): void {
        const config: ContextBrokerConfiguration[] = this.getContextBrokers();
        this.configDashboardService.postConfiguration(config).pipe(takeUntil(this.destroy$)).subscribe(
            res => {
                this.onApplyConfigurationSuccess();
            },
            err => {
                this.onApplyConfigurationFail();
            });
    }

    private onApplyConfigurationSuccess(): void {
        this.appMessageService.add({ severity: 'success', summary: 'Configuration applied' });
        this.router.navigate(['/map-dashboard']);
    }

    private onApplyConfigurationFail(): void {
        this.appMessageService.add({ severity: 'error', summary: 'Cannot apply the configuration' });
    }

    private isDirtyConfiguration(): boolean {
        return this.contextBrokers.some(cb => {
            return cb.form.dirty ||
                (cb.form.get('needHistoricalData').value && cb.historicalForm.dirty) ||
                (cb.form.get('needServices').value && cb.services.some(s => s.form.dirty));
        }) || this.removedContextBrokerAtLeastOnce || this.removedServiceAtLeastOnce || this.selectedEntitiesChange || this.favAttrChange;
    }

    private isValidConfiguration(): boolean {
        return this.contextBrokers.every(cb => {
            return cb.form.valid &&
                (!cb.form.get('needHistoricalData').value || cb.historicalForm.valid) &&
                (!cb.form.get('needServices').value || (cb.services.length > 0 && cb.services.every(s => s.form.valid)));
        });
    }

    private removeContextBroker(index: number): void {
        this.removedContextBrokerAtLeastOnce = true;
        this.contextBrokers.splice(index, 1);
    }

    private getContextBrokers(): ContextBrokerConfiguration[] {
        return this.contextBrokers.map(cb => {
            const needServicesBool: boolean = cb.form.get('needServices').value;
            const needHistoricalDataBool: boolean = cb.form.get('needHistoricalData').value;
            return {
                name: cb.form.get('name').value,
                url: cb.form.get('url').value,
                needServices: needServicesBool,
                needHistoricalData: needHistoricalDataBool,
                cygnus: needHistoricalDataBool ? cb.historicalForm.get('cygnus').value : '',
                comet: needHistoricalDataBool ? cb.historicalForm.get('comet').value : '',
                entities: this.entityTreeNodeService.convertNodesToEntitiesConf(cb.entities, cb.selectedEntities),
                services: needServicesBool ? this.getServices(cb) : [],
            };
        });
    }

    private getServices(cb: ContextBrokerForm): ServiceConfiguration[] {
        return cb.services.map(s => {
            return {
                service: s.form.get('service').value,
                servicePath: s.form.get('servicePath').value,
                entities: this.entityTreeNodeService.convertNodesToEntitiesConf(s.entities, s.selectedEntities),
            };
        });
    }

    private loadConfiguration(contextBrokers: ContextBrokerConfiguration[]): void {
        contextBrokers.forEach(cb => {
            const { treeNodes, selectedTreeNodes }: any = this.entityTreeNodeService.convertEntitiesConfToNodes(cb.entities);
            this.contextBrokers.unshift({
                header: cb.name,
                form: this.configDashboardService.createContextBrokerFormFromConfig(cb),
                historicalForm: this.configDashboardService.createHistoricalFormFromConfig(cb),
                services: this.loadServiceConfiguration(cb),
                entities: treeNodes,
                selectedEntities: selectedTreeNodes,
            });
        });
        setTimeout(() => {
            if (this.accordionTabs && this.accordionTabs.length > 0) {
                this.accordionTabs.forEach(a => a.selected = false);
            }
        });
    }

    private loadServiceConfiguration(cb: ContextBrokerConfiguration): ServiceForm[] {
        return cb.services.map(s => {
            const { treeNodes, selectedTreeNodes }: any = this.entityTreeNodeService.convertEntitiesConfToNodes(s.entities);
            return {
                header: s.service + s.servicePath,
                form: this.configDashboardService.createServiceFormFromConfig(s),
                entities: treeNodes,
                selectedEntities: selectedTreeNodes,
            };
        });
    }

    // Method not used by now, but that could be useful to mark all the configuration page as pristine
    private markFormsAsPristine(): void {
        this.addedContextBrokerAtLeastOnce = false;
        this.removedContextBrokerAtLeastOnce = false;
        this.removedServiceAtLeastOnce = false;
        this.selectedEntitiesChange = false;
        this.favAttrChange = false;
        this.contextBrokers.forEach(cb => {
            cb.form.markAsPristine();
            cb.historicalForm.markAsPristine();
            cb.services.forEach(s => s.form.markAsPristine());
        });
    }

}
