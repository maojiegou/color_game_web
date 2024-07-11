import { Color } from "./my_type"

export class History {
    data: { player: Color, target: Color }[] = [];
    el = document.createElement("table");
    colorScore = (player: Color, target: Color) => { return { r: -666, g: 0, b: 0 } }

    setColorScoreFun = (fun: (player: Color, target: Color) => Color) => {
        this.colorScore = fun;
    }

    add = (player: Color, target: Color) => {
        this.data.push({
            player: { r: player.r, g: player.g, b: player.b },
            target: { r: target.r, g: target.g, b: target.b },
        });
    }

    clear = () => {
        this.data.splice(0, this.data.length);
    }

    displayBianselong = (player: Color, target: Color) => {
        let background = document.createElement("div");
        let bian_se_long = document.createElement("div");

        background.classList.add("history_bian_se_long_background")
        bian_se_long.classList.add("history_bian_se_long")

        console.log(`background.style.backgroundColor = rgb(${target.r}, ${target.g}, ${target.b})`);

        background.style.backgroundColor = `rgb(${target.r}, ${target.g}, ${target.b})`;
        bian_se_long.style.backgroundColor = `rgb(${player.r}, ${player.g}, ${player.b})`;
        background.appendChild(bian_se_long);

        return background;
    }

    updateHistory = () => {
        while (this.el.children.length) {
            this.el.removeChild(this.el.children[0]);
        }

        if (1) {
            // 变色龙
            let tr = document.createElement("tr");
            tr.innerHTML = "<td>图像</td><td>色值</td><td>得分</td>"
            this.el.appendChild(tr);

            for (let i = this.data.length - 1; i >= 0; i--) {
                let tc = this.data[i].target;
                let pc = this.data[i].player;

                let oneHistory = document.createElement("tr");
                let pic = this.displayBianselong(pc, tc);
                let pic_td = document.createElement("td");
                let val_td = document.createElement("td");
                let score_td = document.createElement("td");

                val_td.innerHTML = `目标 <span class="history_color_span" style="background:rgb(${tc.r}, ${tc.g}, ${tc.b})"></span> rgb(${tc.r}, ${tc.g}, ${tc.b}) <br/> 
                玩家 <span class="history_color_span" style="background:rgb(${pc.r}, ${pc.g}, ${pc.b})"></span> rgb(${pc.r}, ${pc.g}, ${pc.b})`;

                let score = this.colorScore(pc, tc);
                score_td.innerHTML = `${score.r + score.g + score.b}<br/> ( ${score.r} , ${score.g} , ${score.b})`;

                pic_td.append(pic);

                oneHistory.append(pic_td, val_td, score_td);
                this.el.appendChild(oneHistory)
            }
        } else {
            // 两图片
            let tr = document.createElement("tr");
            tr.innerHTML = "<td>目标</td><td>玩家</td><td>得分</td>"
            this.el.appendChild(tr);

            for (let i = this.data.length - 1; i >= 0; i--) {
                let tc = this.data[i].target;
                let pc = this.data[i].player;

                let oneHistory = document.createElement("tr");
                let color_display_target = document.createElement("div");
                let color_display_ctrl = document.createElement("div");
                let target = document.createElement("td");
                let ctrl_td = document.createElement("td");
                let score_td = document.createElement("td");

                color_display_target.classList.add("color_display");
                color_display_ctrl.classList.add("color_display");

                color_display_target.style.backgroundColor = `rgb(${tc.r}, ${tc.g}, ${tc.b})`;
                color_display_ctrl.style.backgroundColor = `rgb(${pc.r}, ${pc.g}, ${pc.b})`;

                target.innerText = `rgb(${tc.r}, ${tc.g}, ${tc.b})`;
                ctrl_td.innerText = `rgb(${pc.r}, ${pc.g}, ${pc.b})`;
                let score = this.colorScore(pc, tc);


                score_td.innerHTML = `${score.r + score.g + score.b}<br/> ( ${score.r} , ${score.g} , ${score.b})`;

                target.append(color_display_target);
                ctrl_td.append(color_display_ctrl);

                oneHistory.append(target, ctrl_td, score_td);
                this.el.appendChild(oneHistory)
            }
        }
    }
}