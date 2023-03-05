import * as Mvvm from '../plugins/mvvm/bundle.js'
import {isTextChild} from "../utils/typeDecide";

const canvasElement = ['text'];
let clickEvent = null;

const createRoot = (dom: HTMLCanvasElement | null, data) => {
    if (dom === null) {
        console.error('dom is null');
        return ;
    }
    dom.width = dom.parentElement.offsetWidth
    dom.height = dom.parentElement.offsetHeight
    const ctx = dom.getContext('2d');
    let dpr = window.devicePixelRatio;
    // 避免模糊
    dom.style.imageRendering = 'pixelated';

    let { width: cssWidth, height: cssHeight } = dom.getBoundingClientRect();
    dom.style.width = dom.width + "px";
    dom.style.height = dom.height + "px";

    dom.width = dpr * cssWidth;
    dom.height = dpr * cssHeight;
    ctx.scale(dpr, dpr);

    const rect = dom.getBoundingClientRect();


    dom.addEventListener('click', (event) => {
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        clickEvent = {
            ...event,
            clickX: x,
            clickY: y
        };
        cleanCanvas({ ctx, canvas: dom })
        let vnode = dom._vnode;
        delete dom._vnode;
        render.call(canvasUtils, vnode)
        clickEvent = null;
    })

    const canvasUtils = {
        canvas: dom,
        ctx,
        data
    }
    return {
        canvasUtils,
        render: render.bind(canvasUtils)
    };
}

function render (vnode: any) {
    const { ctx, canvas, data } = this;

    if (vnode === null) {
        if (canvas._vnode) {

        }
    }
    else {
        patch(canvas._vnode, vnode, canvas, ctx, data);
    }
    canvas._vnode = vnode;

}


export const CreateJsx = (type: string, props: Record<string, any> | null, ...child: any[]) => {

    return {
        type,
        props,
        key: props?.key,
        children: child,
        el: null,
        canvasElement: canvasElement.includes(type)
    }
}


function patch (oldVnode, newVnode, canvas, ctx, poxyData, state = true) {
    if (oldVnode === newVnode) return;

    // 同类型
    // if () {}

    const { type, props, canvasElement } = newVnode;

    if (canvasElement) {

    }
    else {
        if (!oldVnode) {
            mountElement(newVnode, canvas, ctx, poxyData, state);
        }
        else {
            patchElement(oldVnode, newVnode, canvas)
        }
    }
}


function mountElement (vnode, canvas, ctx, poxyData, state) {
    const {type, props, children} = vnode;

    createCanvasElement(vnode, canvas, ctx, poxyData, state);

    // mountChildren();
}


function createCanvasElement (vnode, canvas, ctx, poxyData, state) {
    const { type, props, children } = vnode;
    const { width, height, background } = props.style || { width: 30, height: 30 }

    switch (type) {
        case 'div': {
            ctx.beginPath()
            ctx.lineWidth = 1
            ctx.rect(0, 0, width, height);
            ctx.fillStyle = background;
            ctx.fill()
            ctx.stroke();
            ctx.closePath()
            break
        }
        case 'text': {
            ctx.beginPath()
            ctx.fillStyle = '#000';
            ctx.textAlign = 'left'
            ctx.textBaseline = "top"
            ctx.font = `${props.fontSize || '16px'} sans-serif`;
            const textMetrics = ctx.measureText(vnode.content);
            vnode.width = textMetrics.width;
            ctx.fillText(vnode.content, 10, 10);
            ctx.closePath()
            break;
        }
    }

    if (clickEvent && state) {
        // console.log('......................')
        let isInPath = ctx.isPointInPath(clickEvent.clickX, clickEvent.clickY)
        // console.log(isInPath, type, 'jjjjjjjjjjjjjjjjjjjj', clickEvent.clickX, clickEvent.clickY)
        if (isInPath) {
            props.onClick && props.onClick();
            console.log('......................')
        }
    }


    if (children) {
        mountChildren(children, canvas, ctx, poxyData)
    }
}


function patchElement (oldVnode, newVnode, canvas) {

}


function mountChildren (vnode, canvas, ctx, poxyData) {
    for (let i = 0; i < vnode.length; i++) {
        let child = vnode[i];
        if (isTextChild(child)) {
            const regex = /\[(.*?)\]/g;
            let match;
            while ((match = regex.exec(child)) !== null) {
                // console.log(Mvvm, match[1]);
                let key = match[1];

                let textVnode = {
                    type: 'text',
                    props: {},
                    content: poxyData[key]
                }
                console.log('mmmmm')
                // Mvvm.watch(window.data.count, (newVal) => {
                //     console.log(newVal)
                //     // cleanCanvas({ ctx, canvas: { width: textVnode.width, height: 16 }, x: 10, y:10 })
                //     // patch(null, {
                //     //     type: 'text',
                //     //     props: {},
                //     //     content: '????'
                //     // }, canvas, ctx, poxyData, false);
                // });
                patch(null, textVnode, canvas, ctx, poxyData);
            }
        }
        else {
            patch(null, child, canvas, ctx, poxyData);
        }
    }
}


function cleanCanvas ({ ctx, canvas, x = 0, y = 0 }) {
    ctx.clearRect(x, y, canvas.width, canvas.height);
}

export default createRoot;