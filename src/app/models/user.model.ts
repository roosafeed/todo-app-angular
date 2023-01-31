export class User {
    public fname: string|null;
    public lname: string|null;
    public email: string|null;
    public username: string|null;
    public password: string|null;

    constructor(
        fname: string|null = null,
        lname: string|null = null,
        email: string|null = null,
        username: string|null = null,
        password: string|null = null) {
            this.fname = fname;
            this.lname = lname;
            this.email = email;
            this.username = username;
            this.password = password;
    }
}
