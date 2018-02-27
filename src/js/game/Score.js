/**
 * Score Class
 * 점수 관리
 */
class Score {
    constructor() {
        this.fnIntervalScore = null;
        this.score = 0;
        this.elScore = null;
        this.init();
    }

    /**
     * canvas 초기화 및 이벤트 할당
     */
    init() {
        this.elScore = document.getElementById('score');
    }

    obtainCoin() {
        this.score++;
    }

    startGame() {
        this.fnIntervalScore = function () {
            setInterval(function () {
                this.score++;
            }, 1000)
        }.bind(this);
    }

    endGame() {
        /* later */
        clearInterval(this.fnIntervalScore);
    }
}

export default Score;