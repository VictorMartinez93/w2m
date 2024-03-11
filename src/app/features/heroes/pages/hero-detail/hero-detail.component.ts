import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hero } from '../../../../shared/interfaces/heroes/hero';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, finalize } from 'rxjs';
import { HeroService } from '../../../../shared/services/hero.service';
import { LayoutService } from '../../../../shared/services/layout.service';
import { EAlignment } from '../../../../shared/enums/e-alignment.enum';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  public hero!: Hero;
  public title!: string;
  public formGroup!: FormGroup;
  public alignments: EAlignment[] = [
    EAlignment.GOOD,
    EAlignment.EVIL
  ];

  private id!: number;
  private subscriptions$: Subscription = new Subscription();

  constructor(
    public readonly layoutService: LayoutService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly heroService: HeroService
  ) {
    layoutService.isLoading.set(true);
  }

  ngOnInit() {
    if (!isNaN(this.activatedRoute.snapshot.params['id']) && this.activatedRoute.snapshot.routeConfig?.path !== 'create') {
      this.id = this.activatedRoute.snapshot.params['id'] as number;
    }
    if (!this.id && this.activatedRoute.snapshot.routeConfig?.path !== 'create') {
      this.router.navigate(['/', 'heroes']);
    }

    if (this.id) {
      this.getHero();
    } else {
      this.title = 'Creando nuevo héroe';
      this.initForm();
    }

  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  public back(): void {
    this.router.navigate(['/', 'heroes']);
  }

  public save(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.layoutService.isLoading.set(true);
      this.hero = { ...this.hero, ...this.formGroup.getRawValue() };

      if (this.hero.id) {
        this.update();
      } else {
        this.create();
      }
    }
  }

  public get powers(): FormArray<FormControl<string | null>> {
    return this.formGroup.controls['powers'] as FormArray<FormControl<string | null>>;
  }

  public addPower(focus: boolean = true): void {
    const powerForm: FormControl = new FormControl(null, [Validators.required]);

    this.powers.push(powerForm);

    if (focus) {
      setTimeout(() => {
        const power = document.getElementById(`power-${this.powers.controls.length - 1}`);
        if (power) {
          power.focus();
        }
      }, 150);
    }
  }

  public deletePower(index: number): void {
    this.powers.removeAt(index);
  }

  private initForm(): void {
    const powersFormArray: FormArray<FormControl<string | null>> = new FormArray<FormControl<string | null>>([]);

    this.hero?.powers?.forEach((power: string) => powersFormArray.push(new FormControl<string | null>(power)));

    this.formGroup = new FormGroup({
      name: new FormControl(this.hero?.name, [Validators.required]),
      alignment: new FormControl(this.hero?.alignment, [Validators.required]),
      powers: powersFormArray
    });

    if (this.powers.controls.length === 0) {
      this.addPower(false);
    }

    this.layoutService.isLoading.set(false)
  }

  private getHero(): void {
    this.subscriptions$.add(
      this.heroService.getById(this.id)
        .pipe(
      ).subscribe((response: Hero) => {
        this.hero = response;
        this.title = `Editando ${response.name.toLocaleUpperCase()}`;
        this.initForm();
      })
    );
  }

  private create(): void {
    this.subscriptions$.add(
      this.heroService.create(this.hero)
        .pipe(finalize(() => this.layoutService.isLoading.set(false)))
        .subscribe(() => this.back())
    );
  }

  private update(): void {
    this.subscriptions$.add(
      this.heroService.update(this.hero)
        .pipe(finalize(() => this.layoutService.isLoading.set(false)))
        .subscribe(() => this.back())
    );
  }
}
