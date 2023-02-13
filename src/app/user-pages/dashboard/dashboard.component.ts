import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecordResp } from 'src/app/models/record-resp.model';
import { RecordItem, ToDoRecord } from 'src/app/models/record.model';
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
  hasItemErrors: boolean = false;
  selectionMode: boolean = false;
  selectedKeys: Map<string, HTMLElement> = new Map();

  constructor(private todoService: TodoService,
    private messageService: MessagingService,
    private router: Router) {}

  ngOnInit(): void {
    this.getAllRecords();
  }

  getAllRecords(): void {
    this.todoService.getAllRecords().subscribe({
      next: (data) => {
        if(data instanceof RecordResp) {
          this.records = data.records;
          this.records.forEach((record) => {
            record.items.sort((a, b) => {
              if(a.isComplete) {
                return 1;
              }
              if(b.isComplete) {
                return -1;
              }
              return a.order - b.order;
            })
          })
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
    let itemsValid = true;
    this.newRecord.items.forEach((item) => {
      if(item.name == null || item.name == '') {        
        itemsValid = false;
      }
    });

    if(!itemsValid) {
      const msg = new MessageModel(messageCodes.WARN, 'List item cannot be empty');
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

  deleteSelectedRecords(): void {
    if(this.selectionMode && this.selectedKeys.size > 0) {
      const keys: string[] = Array.from(this.selectedKeys.keys());
      this.todoService.deleteMany(keys.filter((key) => {return key != 'null'}))
      .then((resp) => {
        console.log(resp);
        this.getAllRecords();
        this.selectedKeys.clear();
        if(resp.fail.length > 0) {
          const msg: MessageModel = new MessageModel(messageCodes.WARN, "Some records were not deleted");
          this.messageService.setMessage(msg);
        }
        else {
          const msg: MessageModel = new MessageModel(messageCodes.SUCCESS,  `${resp.success.length} records deleted successfully`);
          this.messageService.setMessage(msg);
        }
        
      })
      .catch((err) => {
        console.log(err);        
        const msg: MessageModel = new MessageModel(messageCodes.ERROR, "Something happened while trying to delete");
        this.messageService.setMessage(msg);       
      })
    }
  }

  openNewRecordModal(): void {
    this.newRecordModalActive = true;
  }

  closeNewRecordModal(): void {
    this.newRecordModalActive = false;
    this.newRecord = new ToDoRecord();
  }

  addItem(name: string):void {
    if(name != null && name != '' && name.length != 0) {
      const order = this.newRecord.items.length + 1;
      const item = new RecordItem(name, null, false, order);
      this.newRecord.items.push(item)
    }    
    console.log(this.newRecord);
    
  }

  deleteItem(ind: number) {
    this.newRecord.items.splice(ind, 1);
    this.newRecord.items.forEach((item, ind) => {
      item.order = ind + 1;
    })
  }

  validateTextInput(value: string|null) {
    if(value == null || value == '') {
      this.hasItemErrors = true;
    }
    else {
      this.hasItemErrors = false;
    }
  }

  listClick(elem: HTMLElement, key: string|null) {
    if(!this.selectionMode) {
      this.router.navigate(['todo', key])
    }
    else {
      if(elem.classList.toggle('selected')) {
        let k = key? key : 'null';
        this.selectedKeys.set(k, elem);
      }
      else {
        this.selectedKeys.delete(key? key:'null');
      }      
    }
  }

  selectionClick() {
    this.selectionMode = !this.selectionMode;
    if(!this.selectionMode) {
      this.selectedKeys.forEach((el, k) => {
        el.classList.remove('selected');
        this.selectedKeys.delete(k);
      })
    }
  }

}
