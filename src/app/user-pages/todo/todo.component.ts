import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ActivatedRoute, CanDeactivate } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { ToDoRecord } from 'src/app/models/record.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [DatePipe]
})
export class TodoComponent implements OnInit {
  title: string = "";
  record: ToDoRecord = new ToDoRecord();

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.todoService.getRecordDetails(id).subscribe({
        next: (data) => {
          if(data instanceof ToDoRecord) {
            this.record = data;
            this.sortItems();
          }         
        },
        error: (err) => {
          console.log(err);
          
        }
      })
    })       
  }

  drop(event: CdkDragDrop<string[]>) {
    // moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  sortItems(): void {
    if(this.record?.items?.length > 1) {
      this.record.items.sort((a, b) => {
        if(a.isComplete) {
          return 1;
        }
        if(b.isComplete) {
          return -1;
        }
        return a.order - b.order;
      });
    }
  }

  setOrder(): void {
    this.sortItems();
    this.record.items.forEach((item, ind) => {
      if(item.isComplete) {
        item.order = -1;
      }
      else {
        item.order = ind + 1;
      }
    })
  }

  setComplete(ind: number):void {
    this.record.items[ind].isComplete = !this.record.items[ind].isComplete;
    this.record.items[ind].order = this.record.items.length; //put the item at the end if it is re-enabled
    this.setOrder();
  }

  deleteItem(ind: number): void {
    this.record.items.splice(ind, 1);
    this.setOrder();
  }
}
