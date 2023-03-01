import {cleanCanvas} from "../render";

export default function boxHuaBi ({ canvas, stash }) {
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    let areas = stash?.areas || [], closeState = true;
    let isMouseDown = false, radius = 2;

    function init () {
        canvas.addEventListener('mousedown', canvasMousedown);
        canvas.addEventListener('mousemove', canvasMousemove);
        canvas.addEventListener('mouseup', canvasMouseup);
    }

    function clean () {
        console.log('....')
        canvas.removeEventListener('mousedown', canvasMousedown);
        canvas.removeEventListener('mousemove', canvasMousemove);
        canvas.removeEventListener('mouseup', canvasMouseup);

    }

    function canvasMousedown (event) {
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        let area;
        if (closeState) {
            area = new Dot();
            areas.push(area);
            area.add({x,y,radius})
            closeState = false;
        }
        isMouseDown = true;
        cleanCanvas({ ctx, canvas });
        stash?.renderAll();
        drawAll({ ctx });

    }


    function canvasMousemove (event) {
        if (!isMouseDown) return;
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        areas[areas.length - 1].add({ x, y, radius });
        cleanCanvas({ ctx, canvas });
        stash?.renderAll();
        drawAll({ ctx });
    }


    function canvasMouseup () {
        if (!isMouseDown) return;
        closeState = true;
        isMouseDown = false;
    }

    function drawAll ({ ctx }) {
        // stash?.renderAll();
        areas.forEach(item => {
            ctx.beginPath();
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 5;
            let stashDel = false;
            item.drawList.forEach(({x, y, radius, del}, index) => {
                if (del) {
                    stashDel = true;
                }
                else {
                    if (index === 0) {
                        ctx.moveTo(x, y);
                    }
                    else if (stashDel) {
                        ctx.moveTo(x, y);
                        stashDel = false;
                    }
                    else {
                        ctx.lineTo(x, y);
                    }
                }
            })
            ctx.setLineDash([]);
            ctx.stroke();
            ctx.closePath();
        })
    }

    function Dot () {
        this.drawList = [];
        this.add = (dot) => {
            this.drawList.push(dot)
        }
    }

    function render (cb = null) {
        ctx.beginPath();
        areas.forEach((item, ind) => {
            ctx.beginPath();
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 5;
            let stashX, stashY;
            item.drawList.forEach(({x, y, radius, del}, index) => {
                if (del) {
                    stashX = x;
                    stashY = y;
                }
                else {
                    if (index === 0) {
                        ctx.moveTo(x, y);
                    }
                    else if (stashX || stashY) {
                        ctx.moveTo(x, y);
                        stashX = null;
                        stashY = null;
                    }
                    else {
                        ctx.lineTo(x, y);
                    }
                }

            })
            cb && cb(areas, ind)
            ctx.setLineDash([]);
            ctx.stroke();
            ctx.closePath();
        })
        ctx.closePath();
    }

    return {
        init,
        clean,
        render,
        areas
    };
}