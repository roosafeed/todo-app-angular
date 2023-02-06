import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpError } from '../models/http-error.model';
import { RecordResp } from '../models/record-resp.model';
import { ToDoRecord } from '../models/record.model';

const BASE_URL = "https://todo-server.deta.dev/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient
  ) { }

  getAllRecords(): Observable<RecordResp | HttpError> {
    return this.http.get<any>(BASE_URL + '/list').pipe(
      map((data: any): RecordResp => {
        return new RecordResp(data.resp.records, data.resp.count);
      }),
      catchError(this.handleError)
    )
  }

  getRecordDetails(recordId: string): Observable<ToDoRecord | HttpError> {
    return this.http.get<ToDoRecord>(BASE_URL + `/${recordId}`).pipe(
      catchError(this.handleError)
    )
  }


  private handleError(error: HttpErrorResponse) {
    let errorMsg: HttpError = new HttpError();
    if(error instanceof ErrorEvent) {
      console.error(`Error: ${error}`);
      errorMsg.code = 0;
      errorMsg.message = "Something happened and could not process the request. Try again later";
    }
    else {
      errorMsg.code = error.error.code;
      errorMsg.message = error.error.msg;
    }

    return throwError(() => { return errorMsg});
  }
}

