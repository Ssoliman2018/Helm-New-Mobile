import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../models/question';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {
  questionList = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private dbService: DatabaseService
  ) { }

  ngOnInit() {
    let divID = this.activatedRoute.snapshot.params['divId'];
    let subId = this.activatedRoute.snapshot.params['subId'];
    let prId = this.activatedRoute.snapshot.params['prId'];

    // console.log('division id:', divID, subId, prId);
    //get question list buy division id
     this.dbService.getQuestionByPr_Sub_Division(prId, subId, divID).then((questions: Question[]) => {
      this.questionList = questions ;
      console.log('question list', this.questionList)
    })

  }

}
