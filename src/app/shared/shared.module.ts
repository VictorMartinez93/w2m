import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TableComponent } from './components/table/table.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatProgressBarModule
    ],
    declarations: [
        ConfirmModalComponent,
        TableComponent
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSnackBarModule,
        TableComponent
    ]
})
export class SharedModule { }