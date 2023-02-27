import {jSXElement} from "@babel/types";
import {isTextChild} from "../utils/typeDecide";

const pictureEle = [];

const createRoot = (dom: HTMLCanvasElement | null) => {
    if (dom === null) {
        console.error('dom is null');
        return ;
    }
    const ctx = dom.getContext('2d');
    // 避免模糊
    dom.style.imageRendering = 'pixelated';

    const canvasUtils = {
        canvas: dom,
        ctx
    }
    return {
        canvasUtils,
        render: render.bind(canvasUtils)
    };
}

function render (vnode: any) {
    console.log(vnode, this);
    const { ctx, canvas } = this;
    if (vnode.children) {

        // if (vnode.children.length === 1 && isTextChild(vnode.children[0])) {
        //
        //     switch (vnode.type) {
        //         case 'div': {
        //
        //             break;
        //         }
        //     }
        // }
        const list = []
        for (let i = 0; i < vnode.children.length; i++) {

        }
    }
    else {

    }
}


export const CreateJsx = (type: string, props: Record<string, any> | null, ...child: any[]) => {
    const { style } = props;
    // if (type) {}

    return {
        type,
        props,
        key: props?.key,
        children: child,
        el: null,
    }
}


function Rect (ctx, canvas, props = {}) {
    const { width, height, background } = props.style;
    //
    // const create = () => {
    //     ctx.rect(0, 0, width || 10, height || 10);
    //     ctx.fillStyle = background;
    //     ctx.fill();
    //     return {
    //         type:
    //     }
    // }
    //
    // const onClick = () => {
    //     cleanCanvas({ ctx, canvas });
    //
    //
    // }
    return {
        width, height, background
    }
}

function cleanCanvas ({ ctx, canvas }) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function Text () {

}

export default createRoot;