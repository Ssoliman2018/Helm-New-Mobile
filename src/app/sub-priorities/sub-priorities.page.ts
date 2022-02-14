import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subpriority } from '../models/Subpriority';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-sub-priorities',
  templateUrl: './sub-priorities.page.html',
  styleUrls: ['./sub-priorities.page.scss'],
})
export class SubPrioritiesPage implements OnInit {
subPrioritiesList = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private dbService: DatabaseService
  ) { }

  ngOnInit() {
    let prID = this.activatedRoute.snapshot.params['id'];
    
    console.log('priority ID', prID);
    // get sub priorities 
    this.dbService.getSubPriorityWithPriorityID(prID).then((subs: Subpriority[]) => {
      this.subPrioritiesList = subs;
    })

  }

}
