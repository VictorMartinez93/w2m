import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeroService } from '../../shared/services/hero.service';
import { Subscription, concatMap, debounceTime, distinctUntilChanged, filter, finalize } from 'rxjs';
import { Hero } from '../../shared/interfaces/heroes/hero';
import { FormControl, FormGroup } from '@angular/forms';
import { CONSTANTS } from '../../core/constants';
import { Filter } from '../../shared/interfaces/filters/filter';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../shared/components/modals/confirm-modal/confirm-modal.component';
import { ConfirmationModal, ConfirmationModalResult } from '../../shared/interfaces/modals/confirmation-modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit, OnDestroy {
  public isLoading!: boolean;
  public heroes!: Hero[];
  public displayedColumns: string[] = ['actions', 'name', 'alignment'];
  public formGroup!: FormGroup;
  public isFiltering: boolean = false;

  private subscriptions$: Subscription = new Subscription();
  private filters: Filter[] = [];

  constructor(
    private readonly heroService: HeroService,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.initForm();
    this.getHeroes();
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  public onEdit(hero: Hero): void {
    this.router.navigate(['/', 'heroes', hero.id]);
  }

  public onDelete(hero: Hero): void {
    const dialogRef = this.dialog.open<ConfirmModalComponent, ConfirmationModal, ConfirmationModalResult>(ConfirmModalComponent, {
      width: '25%',
      data: {
        title: 'Eliminar héroe',
        body: [`¿Seguro que deseas eliminar a ${hero.name}?`],
        okButton: 'Eliminar',
        okColor: 'warn',
        cancelButton: 'Cancelar'
      }
    });

    this.subscriptions$.add(
      dialogRef.afterClosed()
        .pipe(
          filter((modalClose: ConfirmationModalResult | undefined) => modalClose?.result === true),
          concatMap(() => {
            this.isLoading = true;
            return this.heroService.delete(hero.id);
          })
        )
        .subscribe(
          () => {
            this.applyFilter();
          })
    );
  }

  private initForm(): void {
    this.formGroup = new FormGroup({
      search: new FormControl(null)
    });

    this.subscriptions$.add(
      this.formGroup.get('search')?.valueChanges
        .pipe(
          /*
        The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator,
        we are limiting the amount of server requests emitted to a maximum of one every 150ms
        */
          debounceTime(CONSTANTS.DEBOUNCE_TIME),
          distinctUntilChanged()
        )
        .subscribe(() => this.applyFilter())
    );
  }

  private getHeroes(): void {
    this.isLoading = true;
    this.subscriptions$.add(
      this.heroService.getAll(this.filters)
        .pipe(
          finalize(() => this.isLoading = false)
        )
        .subscribe((response: Hero[]) => {
          this.heroes = response;
        })
    );
  }

  private applyFilter(): void {
    const search: string = this.formGroup.get('search')?.value;

    this.filters = [];

    if (search) {
      this.filters.push({ field: 'q', value: search });
    }

    this.isFiltering = this.filters.length > 0;

    this.getHeroes();
  }

}
