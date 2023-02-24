import connectWorker, {createWork} from "./work";

/**
 * rgb 转 hsl
 * */
export function rgbToHsl (r: number, g: number, b: number) {
    // eslint-disable-next-line no-unused-expressions
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min){
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h, s, l];
}


/**
 * hsl 转 rgb
 * */
export const hslToRgb = (h: number, s: number, l: number) => {
    let r, g, b;
    if(s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = function hue2rgb(p, q, t) {
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [Math.round(r * 255),Math.round(g * 255),Math.round(b * 255)];
}


/**
 * 颜色转换 - 16进制转换成rgb
 * @param { string } h -> '#cccccc'
 * */
export const HexToRgb = (h, rgb = false) => {
    const dd = Number(h.replace('#', '0x'));
    const r = dd >> 16;
    const g = dd >> 8 & 0xff;
    const b = dd & 0xff;
    if (rgb) {
        return [r, g, b]
    }
    else {
        return `rgb(${r}, ${g}, ${b})`;
    }
}

type ChangePicProps = {
    imgDom: HTMLImageElement | null,
    opacity?: number,
    // 调整数值
    accumulationData?: number,
    canvasId: string,
    pic?: string,
    scope: [number, number]
}


export const processPicWorker = createWork.bind(null,(record) => {
    const { color, scope } = record;
    let data = record.imageData.data;
    let count = 0;
    const copydata = data.slice();
    let arr = Array(3000 * 4 * 3360), r = [];
    console.log('.....')
    for (let i = 0, l = arr.length; i < l; i += 4) {

        if (count === 0) {
            let dd = 2240 * 4, ff = 760 * 4;
            if ((i + 4) > dd) {
                data.splice(dd, ff, data.slice(0, ff));
                i += ff;
            }
        }

        if ((i + 4) % (3000 * 4) === 0) {
            count += 1;

        }
    }
    console.log(arr)

    // for (let i = 0; i < arr.flat(2).length; i++) {
    //     // if (data[i]) {
    //         data[i] = arr[i]
    //     // }
    //     // else {
    //     //     da
    //     // }
    // }
    // for (let i = 0, l = 3000 * 3360 * 4; i < l; i += (3000 * 4)) {
    //     if ((i + 4) % (2240 * 4 )=== 0) {
    //         count += 1;
    //     }
    //     if (count * 2240) {}
    //     // else {
    //     //     let hsl = rgbToHsl(data[i], data[i + 1], data[i + 2]);
    //     //     if (hsl[0] > scope[0] && hsl[0] < scope[1]) { // .41 .45
    //     //         hsl[0] += 0.44
    //     //         hsl[1] += 0.1 //调整亮度
    //     //         hsl[2] += 0.4
    //     //         let rgb = color!= null? color: hslToRgb.apply(this, hsl);
    //     //         data[i] = rgb[0] + 10;
    //     //         data[i + 1] = rgb[1] + 10;
    //     //         data[i + 2] = rgb[2] + 10;
    //     //         // if (opacity == 0) {
    //     //         //     data[i + 3] = opacity;
    //     //         // }
    //     //     }
    //     // }
    // }
    // console.log(count, data.length, '...............')
    return record.imageData;
}, { hslToRgb, rgbToHsl })


export const changePic = ({imgDom, pic, scope, color = null, opacity = 1, accumulationData = 10, canvasId, worker}: ChangePicProps) => {
    if (!imgDom) return;

    const canvas: HTMLCanvasElement = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d')
    // imgDom.onload = function () {
        let original: HTMLHtmlElement = document.querySelector('.m-canvas-copy_img');
        let w = original.width;
        let h = original.height;

        canvas.width = w;
        canvas.height = h ;
        ctx.drawImage(imgDom, 0, 0, w/2, h/2);
        const imageData = ctx.getImageData(0, 0, w/2, h/2);
        const newImageData = ctx.createImageData(3000, h/2);
        const data = imageData.data;
        // delete worker.cleanup;
        // let ww = connectWorker(worker, { imageData, color,scope });
        //
        // ww.then(data => {
        //     console.log(data, ctx,'end--------------------')
        //     ctx.putImageData(data, 0, 0, 0, 0, 3000, h/2)
        // })

    let isDrawing = false;
    let startCoord, endCoord;

    canvas.addEventListener('mousedown', function(e) {
        isDrawing = true;
        startCoord = getMousePos(canvas, e);
    });

    canvas.addEventListener('mousemove', function(e) {
        if (!isDrawing) return;
        endCoord = getMousePos(canvas, e);
        drawSelectionRect(startCoord, endCoord);
    });

    canvas.addEventListener('mouseup', function(e) {
        isDrawing = false;
        endCoord = getMousePos(canvas, e);
        let x = Math.min(startCoord.x, endCoord.x);
        let y = Math.min(startCoord.y, endCoord.y);
        let width = Math.abs(startCoord.x - endCoord.x);
        let height = Math.abs(startCoord.y - endCoord.y);
        let imageData = ctx.getImageData(x, y, width, height);
        // 处理获取到的像素数据
    });

    function getMousePos(canvas, e) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    function drawSelectionRect(start, end) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(start.x, start.y, end.x - start.x, end.y - start.y);
    }


        for (let y = 0; y < 3360; y++) {
            for (let x = 0; x < 3000; x++) {

                if (x < 2240) {
                    // 复制多余的部分
                    const sourceIndex = ((y * 2240) + x) * 4;
                    const targetIndex = (y * 3000 + x) * 4;
                    newImageData.data[targetIndex] = imageData.data[sourceIndex];
                    newImageData.data[targetIndex + 1] = imageData.data[sourceIndex + 1];
                    newImageData.data[targetIndex + 2] = imageData.data[sourceIndex + 2];
                    newImageData.data[targetIndex + 3] = imageData.data[sourceIndex + 3];
                } else {
                    // 将原始图像的像素复制到新图像中
                    const sourceIndex = ((y * 2240) + (3000 - x)) * 4;
                    const targetIndex = (y * 3000 + x) * 4;
                    newImageData.data[targetIndex] = imageData.data[sourceIndex];
                    newImageData.data[targetIndex + 1] = imageData.data[sourceIndex + 1];
                    newImageData.data[targetIndex + 2] = imageData.data[sourceIndex + 2];
                    newImageData.data[targetIndex + 3] = imageData.data[sourceIndex + 3];
                }
            }
        }

    ctx.putImageData(newImageData, 0, 0);
}
