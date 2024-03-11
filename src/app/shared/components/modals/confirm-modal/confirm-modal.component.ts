import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationModal, ConfirmationModalResult } from '../../../interfaces/modals/confirmation-modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

  constructor(
    private readonly dialogRef: MatDialogRef<ConfirmModalComponent, ConfirmationModalResult>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationModal,
  ) { }

  public cancel(): void {
    this.dialogRef.close({ result: false });
  }

  public accept(): void {
    this.dialogRef.close({ result: true });
  }

}
