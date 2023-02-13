export class ToDoRecord {
    public key: string|null;
    public title: string;
    public color: string;
    public items: RecordItem[];
    public createdOn: Date;

    constructor(
        key: string|null = null,
        title: string = '',
        color: string = '#005fae',
        items: RecordItem[] = [],
        createdOn: Date = new Date(Date.now())
    ) {
        this.key = key;
        this.color = color;
        this.items = items;
        this.title = title;
        this.createdOn = createdOn;
    }
}

export class RecordItem {
    public name: string|null;
    public completeBy: string | null;
    public isComplete: boolean;
    public order: number;

    constructor(        
        name: string|null = null,
        completeBy: string|null = null,
        isComplete: boolean = false,
        order: number = 1
    ) {
        this.completeBy = completeBy;
        this.isComplete = isComplete;
        this.name = name;
        this.order = order;
    }
}
