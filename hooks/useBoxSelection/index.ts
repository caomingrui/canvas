

const boxSelection = (props) => {
    const canvas = props.canvas;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d')
    let selectAreaIndex = -1, selectPointIndex = -1, areas = props?.stash?.areas || [];
    let lineStatus = false;
    let downx = 0, downy = 0, isMouseDown = false,
    // 选中移动
    pointMouseMoveState = false,
    // 是否按下 防止生成多个点
    isPointMouseDownState = false;
    let oldDownX = 0, oldDownY = 0;


    function init () {
        canvas.addEventListener('mousedown', canvasMousedown);
        canvas.addEventListener('mousemove', canvasMousemove);
        canvas.addEventListener('mouseup', canvasMouseup);
        return areas;
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
        downx = x;
        downy = y;
        // 闭合后 选取areas移动
        if (!lineStatus) {
            // 是否是路径上的节点
            const { areaIndex, pointIndex } = findPointIndex(ctx, areas, x, y);
            if (areaIndex != -1) {
                isMouseDown = true;
                selectAreaIndex = areaIndex;
                selectPointIndex = pointIndex;
                pointMouseMoveState = true;
                props?.stash?.renderAll();
                return;
            }
            else {
                // 是否选中图层
                cleanCanvas({ ctx, canvas });
                const index = isInConstituency(ctx, areas, x, y);
                props?.stash?.renderAll();
                if (index != -1) {
                    isMouseDown = true;
                    selectAreaIndex = index;
                    const pointIndex = clickPointIndex(x, y, areas[index]);
                    if (pointIndex != -1) {
                        selectPointIndex = pointIndex;
                        pointMouseMoveState = true;
                    }
                    return;
                }
            }
        }

        // 闭合新建 area 内容
        if (!lineStatus) {
            area = new Area();
            areas.push(area);
            lineStatus = true;
        }
        else {
            area = areas.slice().pop();
        }

        // 选中是否为路径上的节点
        const index = clickPointIndex(x, y, area);
        if (index === -1) {
            area.add({ x, y, w: 3, h: 3 });
            isMouseDown = true;
        }
        else {
            area.isCloseState = true;
            area.closePointIndex = index;
            isMouseDown = false;
            lineStatus = false;
        }
        cleanCanvas({ ctx, canvas });
        drawAll(ctx, areas);

    }

    function canvasMousemove (event: Event) {
        if (!isMouseDown) return;
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const disx = x - downx;
        const disy = y - downy;
        cleanCanvas({ ctx, canvas });

        // 拖动点
        if (pointMouseMoveState) {
            const { points } = areas[selectAreaIndex];
            const oldPointsItem = areas[selectAreaIndex].points[selectPointIndex]
            points[selectPointIndex].x = oldPointsItem.x + disx - oldDownX;
            points[selectPointIndex].y = oldPointsItem.y + disy - oldDownY;
            oldDownX = disx;
            oldDownY = disy;
            drawAll(ctx, areas);
        }
        // 拖动
        else if (!lineStatus) {
            const { points, closeCoordinate } = areas[selectAreaIndex];
            points.forEach((p) => {
                p.x += disx - oldDownX;
                p.y += disy - oldDownY;
            })

            // 像素图层拖拽
            // let imageDataX = closeCoordinate[0] + disx, imageDataY = closeCoordinate[1] + disy;
            // ctx.putImageData(closeImageData, imageDataX, imageDataY)
            // copyAreas[selectAreaIndex].closeCoordinate = [imageDataX, imageDataY];
            oldDownX = disx;
            oldDownY = disy;
            drawAll(ctx, areas);
        }
        // 绘制路径
        else {
            isPointMouseDownState = true;
            drawAll(ctx, areas.map((res, ind) => {
                if (ind === areas.length - 1) {
                    return { ...res, points: res.points.concat({x,y,w: 3, h: 3}) }
                }
                return res;
            }));
        }
    }

    function canvasMouseup () {
        if (!isMouseDown) return;
        // 拖动
        if (!lineStatus) {
            oldDownX = 0
            oldDownY = 0;
            isMouseDown = false;
            lineStatus = false;
            pointMouseMoveState = false;
            selectAreaIndex = -1;
            selectPointIndex = -1;
            return;
        }

        cleanCanvas({ ctx, canvas });
        drawAll(ctx, areas);
    }


    function drawAll (ctx, areas, movePoint = null) {
        // 其他模块渲染
        props?.stash?.renderAll();
        areas.forEach(item => {
            drawPoint(ctx, item);
            ctx.beginPath();
            drawLine(ctx, item, movePoint);
            ctx.closePath();
            ctx.fillStyle = "rgba(107, 250, 255, .4)";
            ctx.fill();
        });
    }

    function drawPoint (ctx, { points, add }) {
        if (!points.length) return;
        ctx.save();
        points.forEach(({ x, y, w, h }) => {
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = "#3e25cc";
            ctx.fill();
        });
        ctx.restore();
    }

    function drawLine (ctx, { points, add, isCloseState, closePointIndex }, movePoint = null) {
        if (!points.length) return;
        points.forEach(({ x, y, w, h }, index) => {
            if (index === 0) {
                ctx.moveTo(x, y);
            }
            else {
                ctx.lineTo(x, y);
            }
        });
        if (movePoint) {
            ctx.lineTo(movePoint.x, movePoint.y);
        }
        if (isCloseState) {
            ctx.lineTo(points[closePointIndex].x, points[closePointIndex].y);
        }
        ctx.lineWidth = 3
        const num = Math.random() * 5
        ctx.strokeStyle = 'red';
        ctx.setLineDash([num%2 ? 3: 5, 10]);
        ctx.stroke();
    }


    function Area () {
        this.points = [];
        // 是否闭合状态
        this.isCloseState = false;
        // 闭合X | y
        this.closeCoordinate = [0, 0];
        // 闭合节点索引
        this.closePointIndex = -1;
        // 闭合图像
        this.closeImageData = null;
        this.add = (point) => {
            this.points.push(point);
            return this.points;
        }
    }


    function isInConstituency (ctx, areas, x, y) {
        let index = -1;
        areas.forEach((item, ind) => {
            drawPoint(ctx, item);
            ctx.beginPath();
            drawLine(ctx, item);
            ctx.fillStyle = "rgba(107, 250, 255, .4)";
            ctx.fill();

            const isInPath = ctx.isPointInPath(x, y);
            if (isInPath) {
                index = ind;
            }
        });
        return index;
    }

    function render () {
        ctx.beginPath();
        areas.forEach(item => {
            drawPoint(ctx, item);
            ctx.beginPath();
            drawLine(ctx, item);
            ctx.closePath();
            ctx.fillStyle = "rgba(107, 250, 255, .4)";
            ctx.fill();
        });
        // drawAll(ctx, areas)
        ctx.closePath();
    }

    return {
        init,
        clean,
        render,
        areas
    }
}



export default boxSelection;


function cleanCanvas ({ ctx, canvas, x = 0, y = 0 }) {
    ctx.clearRect(x, y, canvas.width, canvas.height);
}


function findPointIndex(ctx, areas, x, y) { // 找到当前坐标在哪个区域的哪个坐标点上，并将两个下标返回
    let areaIndex = -1;
    let pointIndex = -1;
    areas.forEach((a, i) => {
        if (areaIndex >= 0) return;
        const index = clickPointIndex(x, y, a);
        if (index >= 0) {
            areaIndex = i;
            pointIndex = index;
        }
    })
    return {
        areaIndex,
        pointIndex
    }
}


function clickPointIndex (x, y, area) {
    const { points } = area;
    for(let i = 0; i < points.length; i++) {
        const p = points[i];
        //使用勾股定理计算这个点与圆心之间的距离
        const distanceFromCenter = Math.sqrt(Math.pow(p.x - x, 2) + Math.pow(p.y - y, 2));
        if (distanceFromCenter <= 4) {
            return i;
        }
    }
    return -1;
}

