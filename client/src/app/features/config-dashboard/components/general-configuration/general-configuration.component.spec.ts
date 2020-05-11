import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigDashboardModule } from '../../config-dashboard.module';
import { GeneralConfigurationComponent } from './general-configuration.component';

describe('GeneralConfigurationComponent', () => {

    let fixture: ComponentFixture<GeneralConfigurationComponent>;
    let component: GeneralConfigurationComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports:
                [
                    ConfigDashboardModule,
                    HttpClientTestingModule,
                ],
        });

        fixture = TestBed.createComponent(GeneralConfigurationComponent);
        component = fixture.debugElement.componentInstance;
        // fixture.detectChanges();
    });

    it('setup', () => {
        expect(component).toBeTruthy();
    });

});
