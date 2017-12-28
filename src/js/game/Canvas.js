import Charecter from './Character';

class Canvas {
    constructor(id) {
        this.canvas = null;
        this.context = null;
        this.charecter = null;

        this.id = id;

        this.init();
        this.drawCharecter();
    }

    init() {
        let elMain = document.getElementById('main');
        this.canvas = document.createElement('canvas');
        this.canvas.width = 480; //px
        this.canvas.height = 270; //px
        this.context = this.canvas.getContext('2d');
        elMain.appendChild(this.canvas);
    }

    drawCharecter() {
        let charImage = new Image();
        charImage.src = "./images/coin.png";

        this.charecter = new Charecter({
            context: this.context,
            width: 45,
            height: 45,
            image: charImage
        });
        setTimeout(function (){
            this.charecter.render();
        }.bind(this), 100);
    }
}

export default Canvas;