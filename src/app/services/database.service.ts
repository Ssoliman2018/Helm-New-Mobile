import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Division } from '../models/division';
import { Priority } from '../models/priority';
import { Question } from '../models/question';
import { Subpriority } from '../models/Subpriority';
import { Task } from '../models/task';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  database = this.db.database.app.database('https://helm-8734b-4d96d.firebaseio.com/');  

  constructor(
    private db: AngularFireDatabase,
    private dbStore: AngularFirestore
    ) { }


  getNewTasks(userID): Observable<any> {
    return this.dbStore.collection('tasks').valueChanges().pipe(
      map(data => data.filter((task: Task) => task.completed == false && task.selectedUser == userID ))
    )
  }

  getSavedTasks(userID): Observable<any> {
    return this.dbStore.collection('tasks').valueChanges().pipe(
      map(data => data.filter((task: Task) => task.completed == true && task.selectedUser == userID ))
    )
  }

  getTasks(): Observable<any> {
    return this.dbStore.collection('tasks').valueChanges();
  }

  getTaskDetails(taskID): Observable<any> {
    return this.dbStore.collection(`tasks`).valueChanges().pipe(
      map(data => data.filter((task: Task) => task.tid == taskID))
    )
  }

  getPriorities(): Promise <Priority[]> {
    return new Promise((resolve, reject)=> {
      this.database.ref('/Priorities/').on('value', val => {
        let res = val.val();
       let prioritiesList = Object.keys(res).map(k => res[k]);
        resolve(prioritiesList)
      }, reject)
    })
  }

  getPriority(key): Promise <Priority> {
    return new Promise((resolve, reject)=> {
      this.database.ref(`/Priorities/${key}/`).on('value', val => {
        let res = val.val();
        resolve(res)
      }, reject)
    })
  }

  getSubPriorityWithPriorityID(priorityID): Promise <Subpriority[]> {
    let subPriorities = [];
    return new Promise((resolve, reject)=> {
      this.database.ref('/SubPriorities/').on('value', val => {
        let res = val.val();
       let subPrioritiesList = Object.keys(res).map(k => res[k]);
       subPrioritiesList.forEach((subElm: Subpriority) => {
         if(subElm.priority_ID == priorityID) {
         // console.log('getSubPriorityWithPriorityID', subElm)
          subPriorities.push(subElm);
         }
        
       });
       resolve(subPriorities)

      }, reject)
    })
  }

  getDivisionWithPriorityIDAndSubIS(priorityID,subID): Promise <Division[]> {
    let divisions = [];
    return new Promise((resolve, reject)=> {
      this.database.ref('/Divisions/').on('value', val => {
        let res = val.val();
       let divisionList = Object.keys(res).map(k => res[k]);
       divisionList.forEach((divElm: Division) => {
         if(divElm.priority_ID == priorityID && divElm.sub_ID == subID) {
         // console.log('getSubPriorityWithPriorityID', subElm)
          divisions.push(divElm);
         }
        
       });
       resolve(divisions)

      }, reject)
    })
  }

  getQuestionByPr_Sub_Division(priorityID, subID, divisionID): Promise <Question[]>{
    let filteredQuestion = [];
    return new Promise((resolve, reject)=> {
      this.database.ref(`/Questions/`).on('value', val => {
        let res = val.val();
       let questionList = Object.keys(res).map(k => res[k]);
        questionList.forEach(q => {
          if(q.priority_ID == priorityID && q.sub_ID == subID && q.division_ID == divisionID){
            filteredQuestion.push(q);
          }
        })        
        resolve(filteredQuestion)
        
      }, reject)
    })
  }

}
