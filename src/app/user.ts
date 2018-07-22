export class User {
    name: string;
    token: string;

    constructor(token: string) {
        this.token = token;
    }
}
