import { Component, OnInit } from '@angular/core';
import SugarLevelService from '../shared/api/sugar-level.service';
import SugarLevel from '../shared/model/SugarLevel';

@Component({
  selector: 'app-sugarlevel-list',
  templateUrl: './sugarlevel-list.component.html',
  styleUrls: ['./sugarlevel-list.component.css']
})
export default class SugarLevelListComponent implements OnInit {
  sugarLevels: Array<SugarLevel>;

  constructor(private sugarLevelService: SugarLevelService) {
  }

  ngOnInit() {
    this.sugarLevelService.getAll().subscribe(data => {
      this.sugarLevels = data;
    });
  }
}
