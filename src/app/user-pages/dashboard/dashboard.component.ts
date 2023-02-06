import { Component, OnInit } from '@angular/core';
import { RecordResp } from 'src/app/models/record-resp.model';
import { ToDoRecord } from 'src/app/models/record.model';
import { messageCodes, MessageModel, MessagingService } from 'src/app/services/messaging.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  records: ToDoRecord[] = [];

  constructor(private todoService: TodoService,
    private messageService: MessagingService) {}

  ngOnInit(): void {
    this.getAllRecords();
  }

  getAllRecords(): void {
    this.todoService.getAllRecords().subscribe({
      next: (data) => {
        if(data instanceof RecordResp) {
          this.records = data.records;
        }                      
      },
      error: (err) => {
        console.log(JSON.stringify(err));    
        const msg: MessageModel = new MessageModel(messageCodes.ERROR, err.message);   
        this.messageService.setMessage(msg);
      }
    })
  }
}
