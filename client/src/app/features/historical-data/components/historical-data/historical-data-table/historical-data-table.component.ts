import { EntityMetadataService } from './../../../../../shared/services/entity-metadata-service';
import { HistoricalDataService } from './../../../services/historical-data.service';
import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from 'src/app/shared/misc/base.component';
import { takeUntil, count } from 'rxjs/operators';
import { EntityMetadata } from 'src/app/shared/models/entity-metadata';
import { RawParameters } from '../../../models/historical-data-objects';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { Observable, combineLatest } from 'rxjs';

@Component({
    selector: 'app-historical-data-table',
    templateUrl: './historical-data-table.component.html',
    styleUrls: ['./historical-data-table.component.scss'],
})
export class HistoricalDataTableComponent extends BaseComponent implements OnInit {

    @Input() public entityMetadata: EntityMetadata;
    protected dateFrom: Date;
    protected dateTo: Date;
    protected titles: string[] = [];
    protected totalRecords: number;
    protected first: number = 0;
    protected last: number = 0;
    protected content: any = {};
    protected data: any[] = [];
    protected pageReport: string = '';
    protected loading: boolean;
    private hLimit: number = 10;
    private time: string = 'time';
    private rawParameters: RawParameters;
    private totalCount: string = 'fiware-total-count';

    constructor(
        private historicalDataService: HistoricalDataService,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.rawParameters = {
            hLimit: this.hLimit,
            hOffset: this.first,
            count: true,
        };
    }

    protected onLazyLoad(event: LazyLoadEvent): void {
        this.prepareParameters(event.first, event.rows);
    }

    protected prepareParameters(first: number, rows: number): void {
        const total: number = first + rows;
        this.first = first;
        this.last = total > this.totalRecords ? this.totalRecords : total;
        this.data = [];
        this.changeRawParameter();
        if (this.entityMetadata && this.entityMetadata.attrs) {
            this.getAllContent();
        }
    }

    protected getAllContent(): void {
        this.titles = [];
        this.loading = true;
        const combinedCalls: Observable<any>[] = this.entityMetadata.attrs.map((column) => {
            return this.historicalDataService.getRaw(this.entityMetadata, column, this.rawParameters);
        });
        combineLatest(combinedCalls).subscribe({
            next: (combinedResults): void => {
                combinedResults.forEach((res, i) => this.processContent(res, this.entityMetadata.attrs[i]));
            },
            complete: (): void => { this.loading = false; },
        });
    }

    protected changeRawParameter(): void {
        this.rawParameters = {
            hLimit: this.hLimit,
            hOffset: this.first,
            dateFrom: this.dateFrom !== null ? this.dateFrom : undefined,
            dateTo: this.dateTo !== null ? this.dateTo : undefined,
            count: true,
        };
    }

    protected onDateChange(): void {
        if (this.dateFrom) {
            this.dateFrom.setSeconds(0);
            this.dateFrom.setMilliseconds(0);
        }
        if (this.dateTo) {
            this.dateTo.setSeconds(0);
            this.dateTo.setMilliseconds(0);
        }
        this.prepareParameters(0, this.hLimit);
    }

    private processContent(res: any, column: string): void {
        if (res && res.headers[this.totalCount] > 0) {
            this.totalRecords = res.headers[this.totalCount];
            if (!this.titles.includes(column)) { this.titles.push(column); }
            this.content[column] = res.body.contextResponses[0].contextElement.attributes[0];
            this.content[column].values.forEach((element, index) => {
                if (!this.data[index]) {
                    this.data[index] = {};
                    // RESET DATE
                    this.data[index][this.time] = element.recvTime;
                }
                this.data[index][column] = element;
            });
        }
    }

}
