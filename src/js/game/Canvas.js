class Canvas {
    constructor() {
        this.canvas = null;
        this.context = null;

        this.init();
    }

    init() {
        let elMain = document.getElementById('main');
        this.canvas = document.createElement('canvas');
        this.canvas.width = 480; //px
        this.canvas.height = 270; //px
        this.context = this.canvas.getContext('2d');
        elMain.appendChild(this.canvas);
    }
}

export default Canvas;