export class ToDoRecord {
    public key: string;
    public title: string;
    public color: string;
    public items: RecordItem[];

    constructor(
        key: string,
        title: string = '',
        color: string = '#005fae',
        items: RecordItem[] = []
    ) {
        this.key = key;
        this.color = color;
        this.items = items;
        this.title = title;
    }
}

export class RecordItem {
    public name: string;
    public completeBy: string | null;
    public isComplete: boolean;
    public order: number;

    constructor(        
        name: string = '',
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
