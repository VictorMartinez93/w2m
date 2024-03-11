/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ConfirmModalComponent } from './confirm-modal.component';
import { ConfirmationModalResult } from '../../../interfaces/modals/confirmation-modal';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;
  let matDialogRef: MatDialogRef<ConfirmModalComponent, ConfirmationModalResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmModalComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => { } } },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    matDialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with result false on cancel', () => {
    const closeSpy = spyOn(matDialogRef, 'close');
    component.cancel();
    expect(closeSpy).toHaveBeenCalledWith({ result: false });
  });

  it('should close dialog with result true on accept', () => {
    const closeSpy = spyOn(matDialogRef, 'close');
    component.accept();
    expect(closeSpy).toHaveBeenCalledWith({ result: true });
  });
});
