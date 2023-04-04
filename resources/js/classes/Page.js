export class Page {
    constructor() {
        this.container = null;
        this.skeleton = null;
        this.html = null;
    }

    get html() {
        return this.html;
    }

    set html(value) {
        this.html = value;
    }

    get skeleton() {
        return this.skeleton;
    }

    set skeleton(value) {
        this.skeleton = value;
    }
}