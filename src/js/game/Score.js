class Score {
    constructor(elScore) {
        this.elScore = elScore;
        this.score = 0;

        return this;
    }
    componentDidMount() {
        this.timer = setInterval( () => {
            this.tick()
        },1000)
    }
    componentDidClear() {
        clearInterval(this.timer);
    }

    tick() {
        this.score++;
        this.elScore.innerHTML = this.score;
    }
}

export default Score;