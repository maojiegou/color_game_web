import { Color } from "./my_type"
import { Timer } from "./timer";
let t = 0;

let ctrlColor: Color = {
    r: 0, g: 0, b: 0
}
let targetColor: Color = {
    r: 0, g: 0, b: 0
}
let score_sum: Color = { r: 0, g: 0, b: 0 };

let history_list: { ctrlColor: Color, targetColor: Color }[] = [];


let range_red = document.getElementById("range_red") as HTMLInputElement;
let range_green = document.getElementById("range_green") as HTMLInputElement;
let range_blue = document.getElementById("range_blue") as HTMLInputElement;

let number_red = document.getElementById("number_red") as HTMLInputElement;
let number_green = document.getElementById("number_green") as HTMLInputElement;
let number_blue = document.getElementById("number_blue") as HTMLInputElement;

let color_display_ctrl = document.getElementById("bian_se_long") as HTMLInputElement;
// let color_display_ctrl = document.getElementById("color_display_ctrl") as HTMLInputElement;
let color_display_target = document.getElementById("color_display_target") as HTMLInputElement;
let random_btn = document.getElementById("random_btn") as HTMLInputElement;
let commit_btn = document.getElementById("commit_btn") as HTMLInputElement;

let score_el = document.getElementById("scores") as HTMLInputElement;
let scores_sum_el = document.getElementById("scores_sum") as HTMLInputElement;
let history_el = document.getElementById("history") as HTMLInputElement;


let changeColor = (r: number, g: number, b: number) => {
    ctrlColor.r = r == undefined ? ctrlColor.r : r;
    ctrlColor.g = g == undefined ? ctrlColor.g : g;
    ctrlColor.b = b == undefined ? ctrlColor.b : b;

    updateColor();
}

let updateColor = () => {
    range_red.value = ctrlColor.r.toString();
    range_green.value = ctrlColor.g.toString();
    range_blue.value = ctrlColor.b.toString();

    number_red.value = ctrlColor.r.toString();
    number_green.value = ctrlColor.g.toString();
    number_blue.value = ctrlColor.b.toString();

    color_display_ctrl.style.backgroundColor = `rgba(${ctrlColor.r},${ctrlColor.g},${ctrlColor.b})`

}

let randomColor = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    targetColor = { r, g, b };
    color_display_target.style.backgroundColor = `rgba(${targetColor.r},${targetColor.g},${targetColor.b})`
}

let colorScore = (color: Color, color2: Color) => {
    // 以D为基准, 色差d为1分 2d为 2**2=4分...
    let d = 5;
    let rDiff = Math.min(Math.floor(((color.r - color2.r) / d) ** 2), 200);
    let gDiff = Math.min(Math.floor(((color.g - color2.g) / d) ** 2), 200);
    let bDiff = Math.min(Math.floor(((color.b - color2.b) / d) ** 2), 200);

    return { r: 100 - rDiff, g: 100 - gDiff, b: 100 - bDiff };
}

let updateScore = () => {
    let score = colorScore(ctrlColor, targetColor);
    score_sum.r += score.r;
    score_sum.g += score.g;
    score_sum.b += score.b;
    score_el.innerText = `${score.r + score.g + score.b} ( ${score.r} , ${score.g} , ${score.b})`;
    scores_sum_el.innerText = `${score_sum.r + score_sum.g + score_sum.b}, ( ${score_sum.r} , ${score_sum.g} , ${score_sum.b})`;
}

let commit = () => {
    console.log(`commit`, t++)
    updateScore();
    addHistory();
    updateHistory();
    randomColor();
}

let init = () => {
    //@ts-ignore
    range_red.addEventListener("mousemove", (a) => { changeColor(parseInt(a?.target?.value), undefined, undefined) })
    //@ts-ignore
    range_green.addEventListener("mousemove", (a) => { changeColor(undefined, parseInt(a?.target?.value), undefined) })
    //@ts-ignore
    range_blue.addEventListener("mousemove", (a) => { changeColor(undefined, undefined, parseInt(a?.target?.value)) })
    //@ts-ignore
    range_red.addEventListener("change", (a) => { changeColor(parseInt(a?.target?.value), undefined, undefined) })
    //@ts-ignore
    range_green.addEventListener("change", (a) => { changeColor(undefined, parseInt(a?.target?.value), undefined) })
    //@ts-ignore
    range_blue.addEventListener("change", (a) => { changeColor(undefined, undefined, parseInt(a?.target?.value)) })

    //@ts-ignore
    number_red.addEventListener("change", (a) => { changeColor(parseInt(a?.target?.value), undefined, undefined) })
    //@ts-ignore
    number_green.addEventListener("change", (a) => { changeColor(undefined, parseInt(a?.target?.value), undefined) })
    //@ts-ignore
    number_blue.addEventListener("change", (a) => { changeColor(undefined, undefined, parseInt(a?.target?.value)) })


    randomColor();
    updateColor();

    // random_btn.addEventListener("click", randomColor)
    commit_btn.addEventListener("click", commit)
}

let addHistory = () => {
    history_list.push({
        ctrlColor: { r: ctrlColor.r, g: ctrlColor.g, b: ctrlColor.b },
        targetColor: { r: targetColor.r, g: targetColor.g, b: targetColor.b },
    });
}

let clearHistory = () => {

}

let updateHistory = () => {
    console.log(`updateHistory`, history_list)
    // console.log(`updateHistory`)

    while (history_el.children.length) {
        history_el.removeChild(history_el.children[0]);
    }

    // history_el.childNodes.forEach(element => {
    //     history_el.removeChild(element);
    // })

    let tr = document.createElement("tr");
    tr.innerHTML = "<td>目标</td><td>玩家</td><td>得分</td>"
    history_el.appendChild(tr);

    for (let i = history_list.length - 1; i >= 0; i--) {
        let tc = history_list[i].targetColor;
        let cc = history_list[i].ctrlColor;

        let oneHistory = document.createElement("tr");
        let color_display_target = document.createElement("div");
        let color_display_ctrl = document.createElement("div");
        let target = document.createElement("td");
        let ctrl_td = document.createElement("td");
        let score_td = document.createElement("td");

        color_display_target.classList.add("color_display");
        color_display_ctrl.classList.add("color_display");

        color_display_target.style.backgroundColor = `rgb(${tc.r}, ${tc.g}, ${tc.b})`;
        color_display_ctrl.style.backgroundColor = `rgb(${cc.r}, ${cc.g}, ${cc.b})`;

        target.innerText = `rgb(${tc.r}, ${tc.g}, ${tc.b})`;
        ctrl_td.innerText = `rgb(${cc.r}, ${cc.g}, ${cc.b})`;
        let score = colorScore(cc, tc);


        score_td.innerHTML = `${score.r + score.g + score.b}<br/> ( ${score.r} , ${score.g} , ${score.b})`;

        target.append(color_display_target);
        ctrl_td.append(color_display_ctrl);

        oneHistory.append(target, ctrl_td, score_td);
        history_el.appendChild(oneHistory)
    }

}

let timer = new Timer(10);
document.body.append(timer.el);
timer.start();
timer.updateSelf();

init();