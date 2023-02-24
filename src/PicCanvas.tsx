import ColorThief from 'colorthief';
import {changePic, hslToRgb, processPicWorker, rgbToHsl} from "../utils";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {createWork} from "../utils/work";


const image = new Image()
const worker = processPicWorker()
const PicCanvas = () => {
    const imgDomRef = useRef<HTMLImageElement | null>(null);
    const [colorList, updateColorList] = useState([]);

    const [canvasRect, updateCanvasRect] = useState([]);


    // useEffect(() => {
    //     const colorThief = new ColorThief();
    //
    //     let record = 1, color = 2;
    //     let img = imgDomRef.current;
    //     // console.log(colorThief.getPalette(img))
    //     setTimeout(() => {
    //         if (img) {
    //             color = colorThief.getColor(img, 1);
    //             record = colorThief.getPalette(img);
    //
    //
    //         } else {
    //             image.addEventListener('load', function () {
    //                 color = colorThief.getColor(img, 1)
    //                 record = colorThief.getPalette(img, 5)
    //
    //             });
    //         }
    //         console.log(record, color)
    //         updateColorList(record)
    //     }, 400)
    //
    //     return () => {
    //         worker.terminate();
    //     }
    // }, [])

    useEffect(() => {
        const canvas = imgDomRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d')

            let canvasRect = [], list = [], animationDuration = 2000, state = null;
            canvas?.addEventListener('click', (event) => {
                const rect = canvas.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                ctx.fillStyle = '#ff0051';
                // ctx.arc(x, y, 50, 0, 2 * Math.PI);
                // ctx.stroke();
                ctx.fillRect(x, y, 3, 3);
                if (canvasRect.length) {
                    const lastRect = canvasRect.slice().pop();
                    ctx.beginPath();
                    ctx.setLineDash([3, 5])
                    ctx.lineTo(lastRect.x,lastRect.y);
                    ctx.lineTo(x, y);
                    ctx.stroke();
                }
                const canvasRects = canvasRect.slice(0, canvasRect.length - 1) || [];
                canvasRect.push({x, y, w: 3, h: 3})
                // for (let i = 0; i < canvasRects.length; i++) {
                //     const { x: x2, y: y2, w, h } = canvasRects[i];
                //     if ((x >= x2) && (x <= (x2 + w))) {
                //         if ((y >= y2) && y <= (y2 + h)) {
                //             list.push(canvasRect);
                //             canvasRect = [];
                //         }
                //     }
                // }


                // updateCanvasRect([...canvasRect, {x, y}]);
            })


            // 定义框选框的初始位置和大小
            var startX, startY, endX, endY;
            var isDragging = false;
//
// // 添加mousedown事件监听器
            canvas.addEventListener("mousedown", function(e) {
                startX = e.pageX - canvas.offsetLeft;
                startY = e.pageY - canvas.offsetTop;
                isDragging = true;
            });
//
// // 添加mousemove事件监听器
            canvas.addEventListener("mousemove", function(event) {
                if (isDragging) {

                    const rect = canvas.getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const y = event.clientY - rect.top;
                    const lastRect = canvasRect.slice().pop();
                    console.log('....', lastRect)
                    ctx.setLineDash([3, 5])
                    ctx.lineTo(lastRect.x,lastRect.y);
                    ctx.lineTo(x, y);
                    ctx.stroke();
                }
            });
//
// // 添加mouseup事件监听器
//             canvas.addEventListener("mouseup", function(e) {
//                 isDragging = false;
//
//                 // 确定选择的内容
//                 var selectedContent = ctx.getImageData(startX, startY, endX - startX, endY - startY);
//                 console.log(selectedContent);
//             });
//
// // 添加一个变量来存储鼠标的当前位置
//             var mouseX, mouseY;
//
// // 添加mousemove事件监听器
//             canvas.addEventListener("mousemove", function(e) {
//                 mouseX = e.pageX - canvas.offsetLeft;
//                 mouseY = e.pageY - canvas.offsetTop;
//             });


            // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            // const pixels = imageData.data;
            //
            // const pathPixels = [];
            // for (let x = 0; x < canvas.width; x++) {
            //     for (let y = 0; y < canvas.height; y++) {
            //         if (ctx.isPointInPath(x, y)) {
            //             const index = (y * canvas.width + x) * 4;
            //             pathPixels.push({
            //                 x: x,
            //                 y: y,
            //                 r: pixels[index],
            //                 g: pixels[index + 1],
            //                 b: pixels[index + 2],
            //                 a: pixels[index + 3]
            //             });
            //         }
            //     }
            // }
            // console.log(pathPixels)
            // const startTime = Date.now();
            // canvas?.addEventListener('mousemove', (event) => {
            //     const rect = canvas.getBoundingClientRect();
            //     const x1 = event.clientX - rect.left;
            //     const y1 = event.clientY - rect.top;
            //     const canvasRects = canvasRect.slice(0, canvasRect.length - 1) || [];
            //
            //     for (let i = 0; i < canvasRects.length; i++) {
            //         const { x, y, w, h } = canvasRects[i];
            //         if ((x1 >= x) && (x1 <= (x + w))) {
            //             if ((y1 >= y) && y1 <= (y + h)) {
            //                 if (state === null) {
            //                     animationRect({
            //                         x, y, w, h, ctx, canvas, startTime: Date.now() + 1000, duration: animationDuration
            //                     });
            //                 }
            //                 state = setTimeout(() => {
            //                     state = null;
            //                 }, animationDuration)
            //             }
            //         }
            //     }
            // },false);

        }
    }, [])


    function animationRect (data) {

        const { ctx, startTime = Date.now(), w, h, x, y, duration = 1000, targetWidth = w * 2, targetHeight = h * 2, canvas} = data;
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1); // 计算过渡进度
        const rect = {width: w, height: h, x, y}
        const currentWidth = rect.width + (targetWidth - rect.width) * progress;
        const currentHeight = rect.height + (targetHeight - rect.height) * progress;

        // 更新矩形元素的位置和大小
        rect.width = currentWidth;
        rect.height = currentHeight;
        rect.x = canvas.width / 2 - rect.width / 2;
        rect.y = canvas.height / 2 - rect.height / 2;

        // 在 Canvas 上重新绘制矩形元素
        ctx.clearRect(x, y, w, h);
        ctx.fillStyle = 'red';
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        console.log('????', progress, startTime, elapsed, progress, currentWidth)
        if (progress < 1) {
            // 如果过渡尚未完成，则继续动画循环
            requestAnimationFrame(animationRect.bind(null, {
                ...data,
            }));
        }
    }

    return (
        <div className="m-canvas-component">
            <header>

            </header>

            <main>
                {/*<canvas className="m-line_canvas" ref={imgDomRef} width='700' height='1000'></canvas>*/}
            </main>
        </div>
    );
}


export default PicCanvas;


// {/*<header>*/}
// {/*    /!*<img src="/test.jpg" className="m-canvas-img" alt="" ref={imgDomRef}/>*!/*/}
// {/*    /!*<img src="/test.jpg" className='m-canvas-copy_img' alt=""/>*!/*/}
// {/*    /!*<canvas id="m-canvas"></canvas>*!/*/}
// {/*</header>*/}
//
// {/*<main>*/}
// {/*    <div>*/}
// {/*        {*/}
// {/*            colorList.map(res => (*/}
// {/*                <p style={{background: `rgb(${res})`, height: '2em'}} key={res} onClick={() => {*/}
// {/*                    console.log('....')*/}
// {/*                    let da = rgbToHsl(res[0], res[1], res[2])[0];*/}
// {/*                    let arr1 = da.toFixed(2) - 0.02;*/}
// {/*                    let arr2 = Number(da.toFixed(2)) + 0.02;*/}
//
// {/*                    let [hslR, hslG, hslB] = rgbToHsl(47, 44, 245)*/}
//
// {/*                    changePic({*/}
// {/*                        imgDom: imgDomRef.current,*/}
// {/*                        canvasId: 'm-canvas',*/}
// {/*                        scope: [arr1, arr2],*/}
// {/*                        color: hslToRgb(hslR, hslG, hslB),*/}
// {/*                        worker*/}
// {/*                    })*/}
// {/*                }}></p>*/}
// {/*            ))*/}
// {/*        }*/}
// {/*    </div>*/}
// {/*</main>*/}
//
// {/*<footer>*/}
//
// {/*</footer>*/}