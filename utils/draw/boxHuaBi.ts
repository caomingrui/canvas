import {cleanCanvas} from "../render";

export default function boxHuaBi ({ canvas, stash }) {
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    let areas = stash?.areas || [], closeState = true;
    let isMouseDown = false, radius = 2;
    console.log(canvas)

    function init () {
        canvas.addEventListener('mousedown', canvasMousedown);
        canvas.addEventListener('mousemove', canvasMousemove);
        canvas.addEventListener('mouseup', canvasMouseup);
    }

    function clean () {
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
            item.dotList.forEach(({x, y, radius}, index) => {
                if (index === 0) {
                    ctx.moveTo(x, y);
                }
                else {
                    ctx.lineTo(x, y);
                }
            })
            ctx.setLineDash([]);
            ctx.stroke();
            ctx.closePath();
        })
    }

    function Dot () {
        this.dotList = [];
        this.add = (dot) => {
            this.dotList.push(dot)
        }
    }

    function render () {
        ctx.beginPath();
        drawAll({ ctx });
        ctx.closePath();
    }

    return {
        init,
        clean,
        render,
        areas
    };
}