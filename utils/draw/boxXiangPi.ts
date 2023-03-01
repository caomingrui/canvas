import {cleanCanvas} from "../render";

type BoxRubberProps = {
    canvas: HTMLCanvasElement,
    stash: any,
    renderAll?: () => void
}

/**
 * 橡皮功能
 * @param canvas
 * @param stash
 */
export default function boxRubber ({ canvas, stash }: BoxRubberProps) {
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    let areas = stash.stash || [];

    let configure = {
        rubberSize: 20
    }

    let isMouseDown = false, closeState = true;

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

    function canvasMousedown (event: MouseEvent) {
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (closeState) {
            const rubber = new Rubber();
            rubber.add({ x, y });
            areas.push(rubber);
            closeState = false;
        }

        isMouseDown = true;
        cleanCanvas({ ctx, canvas });
        // 其他模块渲染
        stash?.renderAll((item, index) => {
            let isInPath = ctx.isPointInPath(x, y)
            if (isInPath) {
                item[index].drawList.forEach((el, ind) => {
                    if (el.x >= x - (configure.rubberSize/2) && el.x <= x + (configure.rubberSize/2)) {
                        if (el.y >= y - (configure.rubberSize/2) && el.y <= y + (configure.rubberSize/2)) {
                            el.del = true;
                        }
                    }
                })
            }

        });
        drawAll({ ctx });
    }

    function canvasMousemove (event: MouseEvent) {
        if (!isMouseDown) return;
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        areas[areas.length - 1].add({ x, y });
        cleanCanvas({ ctx, canvas });
        // 其他模块渲染
        stash?.renderAll((item, index) => {
            let isInPath = ctx.isPointInPath(x, y)
            if (isInPath) {
                item[index].drawList.forEach((el, ind) => {
                    if (el.x >= x - (configure.rubberSize/2) && el.x <= x + (configure.rubberSize/2)) {
                        if (el.y >= y - (configure.rubberSize/2) && el.y <= y + (configure.rubberSize/2)) {
                            el.del = true;
                        }
                    }
                })
            }

        });
        drawAll({ ctx });
    }

    function canvasMouseup () {
        if (!isMouseDown) return;
        closeState = true;
        isMouseDown = false;
    }

    function Rubber () {
        this.drawList = [];
        this.add = (record) => {
            this.drawList.push(record);
        }
    }

    function drawAll ({ ctx }) {
        areas.forEach(area => {
            ctx.beginPath();
            area.drawList.forEach(({ x, y }) => {
                ctx.clearRect(x, y, configure.rubberSize, configure.rubberSize);
            })
            ctx.closePath();
        })
    }

    function render () {

    }

    return {
        init,
        render,
        clean,
        areas
    };
}