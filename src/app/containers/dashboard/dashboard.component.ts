import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Hero } from '@appModels/hero';

import * as fromSelectors from '@appStore/selectors';
import * as fromReducers from '@appStore/reducers';
import { EntityCollectionService, EntityServices } from 'ngrx-data';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  heroesService: EntityCollectionService<Hero>;

  constructor(entityServices: EntityServices) {
    this.heroesService = entityServices.getEntityCollectionService('Hero');
  }
  
  ngOnInit() {
    this.heroes$ = this.heroesService.entities$.pipe(map(e => e.slice(0, 4)));
    this.heroesService.getAll();
  }
}