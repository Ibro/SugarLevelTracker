import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

import SugarLevelService from '../shared/api/sugar-level.service';
import SugarLevel from '../shared/model/SugarLevel';

@Component({
  selector: 'app-sugarlevel-edit',
  templateUrl: './sugar-level-edit.component.html',
  styleUrls: ['./sugar-level-edit.component.css']
})
export default class SugarLevelEditComponent implements OnInit, OnDestroy {
  sugarLevel: SugarLevel = new SugarLevel();

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private sugarLevelService: SugarLevelService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.sugarLevelService.get(id).subscribe((sugarLevel: any) => {
          if (sugarLevel) {
            this.sugarLevel = sugarLevel;
            this.sugarLevel.measuredAt = new Date(this.sugarLevel.measuredAt).toISOString();
          } else {
            console.log(`Sugar Level with id '${id}' not found, returning to list`);
            this.goToList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goToList() {
    this.router.navigate(['/sugarlevel-list']);
  }

  save(form: any) {
    this.sugarLevelService.save(form).subscribe(result => {
      this.goToList();
    }, error => console.error(error));
  }

  remove(id: number) {
    this.sugarLevelService.remove(id).subscribe(result => {
      this.goToList();
    }, error => console.error(error));
  }
}
