import { ToDoRecord } from "./record.model";

export class RecordResp {
    public records: ToDoRecord[];
    public count: number;

    constructor(records: ToDoRecord[] = [],
        count: number = 0) {
            this.records = records;
            this.count = count;
        }
}
