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
  colors: string[] = ['#005fae', '#426A5A', '#F2C57C', '#EF6F6C', '#29335C', '#F092DD', '#F5853F', '#FFCDBC', '#542344', '#DE6C83'];
  records: ToDoRecord[] = [];
  newRecord: ToDoRecord = new ToDoRecord();
  newRecordModalActive: boolean = false;

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

  createRecord(): void {
    if(this.newRecord.title == null || this.newRecord.title == '') {
      const msg = new MessageModel(messageCodes.WARN, 'Name cannot be empty');
        this.messageService.setMessage(msg);
        return;
    }
    
    this.todoService.createRecord(this.newRecord).subscribe({
      next: (resp) => {
        console.log(resp);
        const msg = new MessageModel(messageCodes.SUCCESS, "Created successfully");
        this.messageService.setMessage(msg);
        this.closeNewRecordModal();
        this.getAllRecords();
      },
      error: (err) => {
        const msg = new MessageModel(messageCodes.ERROR, err.message);
        this.messageService.setMessage(msg);
        this.closeNewRecordModal();
      }
    })    
  }

  openNewRecordModal(): void {
    this.newRecordModalActive = true;
  }

  closeNewRecordModal(): void {
    this.newRecordModalActive = false;
    this.newRecord = new ToDoRecord();
  }
}
