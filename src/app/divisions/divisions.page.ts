import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Division } from '../models/division';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-divisions',
  templateUrl: './divisions.page.html',
  styleUrls: ['./divisions.page.scss'],
})
export class DivisionsPage implements OnInit {
  divisionList = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private dbService: DatabaseService
  ) { }

  ngOnInit() {
    let subID = this.activatedRoute.snapshot.params['subID'];
    let prID = this.activatedRoute.snapshot.params['prID']
    console.log('Sub priority ID', subID);
    console.log(' priority ID', prID);

    // get sub priorities 
    this.dbService.getDivisionWithPriorityIDAndSubIS(prID, subID).then((divs: Division[]) => {
      this.divisionList = divs;
    }) 
  }

}
