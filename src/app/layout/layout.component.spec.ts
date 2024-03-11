import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { LayoutService } from '../shared/services/layout.service';
import { ActivatedRoute } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatListModule } from '@angular/material/list';

class ActivatedRouteStub {

}

describe('LayoutComponent', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;
    let activatedRoute: ActivatedRouteStub;

    beforeEach(async () => {
        activatedRoute = new ActivatedRouteStub();
        await TestBed.configureTestingModule({
            imports: [
                MatToolbarModule,
                MatIconModule,
                MatListModule,
                MatSidenavModule,
                BrowserAnimationsModule,
                RouterTestingModule
            ],
            declarations: [LayoutComponent],
            providers: [LayoutService, { provide: ActivatedRoute, useValue: activatedRoute }]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the initial value of opened to true', () => {
        expect(component.opened).toBe(true);
    });

    it('should set the menu on initialization', () => {
        component.ngOnInit();
        expect(component.menu).toEqual([{ name: 'Héroes', routerLink: '/heroes' }]);
    });

    it('should toggle the sidenav', () => {
        component.toggleSidenav();
        expect(component.opened).toBe(false);
        component.toggleSidenav();
        expect(component.opened).toBe(true);
    });
});
