import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> {
  @Input() dataSource!: T[];
  @Input() displayedColumns!: string[];
  @Input() isLoading!: boolean;
  @Input() showEdit!: boolean;
  @Input() showDelete!: boolean;
  @Input() isFiltering!: boolean;
  @Output() edit: EventEmitter<T> = new EventEmitter<T>();
  @Output() delete: EventEmitter<T> = new EventEmitter<T>();

  constructor() { }

  public editElement(object: T): void {
    this.edit.emit(object);
  }

  public deleteElement(object: T): void {
    this.delete.emit(object);
  }

}
