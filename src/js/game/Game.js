import Canvas from './Canvas';
import Controller from './Controller';
import Score from './Score';

class Game {
    constructor() {
        this.canvas = null;
        this.controller = null;
        this.score = null;

        this.initController();
        this.initCanvas();
        this.initScore();
    }

    initController() {
        this.controller = new Controller(this);
    }

    initCanvas() {
        let id = 1;
        this.canvas = new Canvas(id, this.controller);
    }

    initScore() {
        this.elScore = document.getElementById('eScoreBoard');
        this.score = new Score(this.elScore);
        this.score.componentDidMount();
    }

    /**
     * 게임종료시 실행되던 animationFrame을 정지, 점수 정보를 DB에 요청합니다.
     */
    gameOver() {
        window.cancelAnimationFrame(this.canvas.charFrameId);
        window.cancelAnimationFrame(this.canvas.blockFrameId);
        window.cancelAnimationFrame(this.canvas.coinFrameId);
        this.score.componentDidClear();
        this.saveScore('Je', this.score.score);
        this.getScoreList();
    }

    saveScore(id, score) {
        $.ajax({
            url : 'http://localhost:8080/saveScore',
            method : 'post',
            data : {
                id : id,
                score : score
            },
            success : function (data) {
                console.log(data);
            },
            error : function (err) {
                console.log(err.toString());
            }
        });
    }

    getScoreList() {
        $.ajax({
            url : 'http://localhost:8080/getScoreList',
            method : 'get',
            success : function (data) {
                let elScoreList = document.getElementById('eScoreList');
                let str = '';
                for (var i=0; i<data.scores.length; i++) {
                    if(i > 10) {
                        return;
                    }
                    str += `<tr style="border: solid 1px"><td id="id">${data.scores[i].id}</td><td id="id">${data.scores[i].score}</td></tr>`;
                }
                elScoreList.innerHTML = `<table style="border: solid 1px"> ${str} </table>`;
            },
            error : function (err) {
                console.log(err.toString());
            }
        });
    }
}

export default Game;