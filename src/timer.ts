export class Timer {
    sumTime: number;
    elapsedTime: number = 0;
    isPause = false;

    el: HTMLDivElement;
    //@ts-ignore
    timeText: HTMLDivElement;
    //@ts-ignore
    btn_start: HTMLButtonElement; btn_pause: HTMLButtonElement;
    /**时间戳 */

    private lastTime: number = 0;
    private intervalId: number = 0;


    constructor(second: number = 60) {
        this.el = document.createElement("div");
        this.initEl();
        this.sumTime = second;
    }

    initEl = () => {
        this.el = document.createElement("div");
        this.timeText = document.createElement("div");
        this.btn_start = document.createElement("button");
        this.btn_pause = document.createElement("button");

        this.btn_pause.addEventListener("click", this.pause);

        this.el.append(this.timeText, this.btn_start, this.btn_pause);
    }

    start = () => {
        this.lastTime = Date.now();
    }

    end = () => {
        this.timeText.innerText = "时间到";
    }

    pause = () => {
        if (this.isPause) {
            this.lastTime = Date.now();
            this.updateSelf();
            this.btn_pause.innerText = "暂停";
        } else {
            clearInterval(this.intervalId);
            this.btn_pause.innerText = "恢复";
        }
        this.isPause = !this.isPause;
    }

    private update = () => {
        let now = Date.now()
        let delta = (now - this.lastTime) / 1000;
        this.lastTime = now;
        this.elapsedTime += delta;
        if (this.elapsedTime > this.sumTime)
            this.end();
        else
            this.timeText.innerText = (Math.ceil((this.sumTime - this.elapsedTime)*10)/10).toFixed(1);
    }

    updateSelf = () => {
        this.intervalId = setInterval(this.update, 100);
    }
}