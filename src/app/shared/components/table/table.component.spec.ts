/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TableComponent', () => {
  let component: TableComponent<any>;
  let fixture: ComponentFixture<TableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind input properties correctly', () => {
    component.dataSource = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]; // Example data
    component.displayedColumns = ['id', 'name'];
    component.isLoading = false;
    component.showEdit = true;
    component.showDelete = true;

    fixture.detectChanges();

    expect(component.dataSource).toEqual([{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]);
    expect(component.displayedColumns).toEqual(['id', 'name']);
    expect(component.isLoading).toBe(false);
    expect(component.showEdit).toBe(true);
    expect(component.showDelete).toBe(true);
  });

  it('should emit edit event', () => {
    const testObject = { id: 1, name: 'Test Object' };
    let emittedObject: any;
    component.edit.subscribe((object: any) => {
      emittedObject = object;
    });

    component.editElement(testObject);

    expect(emittedObject).toEqual(testObject);
  });

  it('should emit delete event', () => {
    const testObject = { id: 1, name: 'Test Object' };
    let emittedObject: any;
    component.delete.subscribe((object: any) => {
      emittedObject = object;
    });

    component.deleteElement(testObject);

    expect(emittedObject).toEqual(testObject);
  });
});
