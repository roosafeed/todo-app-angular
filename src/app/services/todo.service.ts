import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, throwError } from 'rxjs';
import { HttpError } from '../models/http-error.model';
import { RecordResp } from '../models/record-resp.model';
import { ToDoRecord } from '../models/record.model';

const BASE_URL = "https://bishopsagenda-1-g6967629.deta.app/todo";

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
      map((data: any) => {
        const r = data.resp.records[0];
        const rec = new ToDoRecord(r.key, r.title, r.color, r.items, new Date(r.createdOn));
        return rec;
      }),
      catchError(this.handleError)
    )
  }

  createRecord(record: ToDoRecord): Observable<any | HttpError> {
    record.key = null;
    return this.http.post<any>(BASE_URL + '/create', record).pipe(
      catchError(this.handleError)
    )
  }

  deleteMany(keys: string[]): Promise<any> {
    return new Promise((resolve, reject) => {
      let result: {
        success: string[],
        fail: string[]
      } = {success: [], fail: []};

      let requests: Observable<any>[] = [];
      keys.forEach((key) => {
        requests.push(this.http.delete(BASE_URL + `/delete/${key}`));
      })

      forkJoin(requests).subscribe({
        next: (data) => {
          data.forEach((d, ind) => {
            if(d) {
              result.success.push(keys[ind]);
            }
            else {
              result.fail.push(keys[ind]);
            }
          });
          resolve(result);
        },
        error: (err) => {
          reject(err);
        }
      })
    });
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

