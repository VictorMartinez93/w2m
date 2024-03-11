import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../../shared/services/hero.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Hero } from '../../shared/interfaces/heroes/hero';
import { EAlignment } from '../../shared/enums/e-alignment.enum';
import { ConfirmModalComponent } from '../../shared/components/modals/confirm-modal/confirm-modal.component';
import { ConfirmationModalResult } from '../../shared/interfaces/modals/confirmation-modal';
import { TableComponent } from '../../shared/components/table/table.component';

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let fixture: ComponentFixture<HeroesComponent>;
    let heroService: jasmine.SpyObj<HeroService>;
    let dialog: jasmine.SpyObj<MatDialog>;

    beforeEach(async () => {
        const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getAll', 'delete']);
        const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

        await TestBed.configureTestingModule({
            declarations: [HeroesComponent, TableComponent],
            imports: [
                ReactiveFormsModule,
                HttpClientModule,
                MatInputModule,
                MatIconModule,
                MatTableModule,
                BrowserAnimationsModule
            ],
            providers: [
                { provide: HeroService, useValue: heroServiceSpy },
                { provide: MatDialog, useValue: dialogSpy }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeroesComponent);
        component = fixture.componentInstance;
        heroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
        dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;

        heroService.getAll.and.returnValue(of([]));
        heroService.delete.and.returnValue(of(true));

        const dialogRefSpyObj = jasmine.createSpyObj<MatDialogRef<ConfirmModalComponent, ConfirmationModalResult>>(['afterClosed', 'close']);
        dialogRefSpyObj.afterClosed.and.returnValue(of({ result: true }));
        dialog.open.and.returnValue(dialogRefSpyObj);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize form group', () => {
        expect(component.formGroup).toBeTruthy();
    });

    it('should fetch heroes on initialization', () => {
        expect(heroService.getAll).toHaveBeenCalled();
    });

    it('should delete a hero', () => {
        const hero: Hero = { id: 1, name: 'Superman', alignment: EAlignment.EVIL, powers: ['Fly'] };
        component.onDelete(hero);

        expect(heroService.delete).toHaveBeenCalledWith(hero.id);
    });
});
