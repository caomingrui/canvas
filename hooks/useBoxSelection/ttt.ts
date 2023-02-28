import {useEffect, useReducer} from "react";
import boxSelection from "./index";
import {cleanCanvas} from "../../utils/render";

let SELECT_TYPE_HUABI = 0;
let SELECT_TYPE_XIANGPI = 4;
let SELECT_TYPE_SELECTION = 5;

const useTestReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_SELECT_STATE': {
            return {...state, type: action.value};
        }
        case 'UPDATE_DIFF_TYPE_AREAS': {
            const typeIndex = action.state;
            let diffTypeAreas = state.diffTypeAreas.slice();
            diffTypeAreas[typeIndex] = {
                type: typeIndex,
                ...action.value
            }
            return {...state, diffTypeAreas};
        }
    }
}

export default function useTest (initData, reducer = useTestReducer) {
    const [state, dispatch] = useReducer(reducer, {
        type: 0,
        // 不同类型画布实例
        diffTypeAreas: [],
        ...initData
    });


    const updateState = (selectState: string) => {
        if (state.type === selectState) return;
        statusSlot(selectState, state.type);
        dispatch({ type: 'UPDATE_SELECT_STATE', value: selectState });
    }

    const updateDiffTypeAreas = (diffTypeAreas, selectState) => {
        dispatch({ type: 'UPDATE_DIFF_TYPE_AREAS', value: diffTypeAreas, state: selectState });
    }

    function statusSlot (newType, oldType) {
        state.diffTypeAreas[oldType]?.clean();
        const oldOption = state.diffTypeAreas[newType] || {}, canvas = state.canvas.current;
        let option;
        function render () {
            state.diffTypeAreas.forEach((rl, ind) => {
                if (ind != this.newType) {
                    rl && rl.render(this)
                }
            });
        }
        delete oldOption.renderAll;
        oldOption && (oldOption.renderAll = render.bind({newType}));

        switch (newType) {
            case SELECT_TYPE_SELECTION: {
                option = boxSelection({canvas, stash: oldOption});
                break;
            }
            case SELECT_TYPE_HUABI: {
                option = boxHuaBi({canvas, stash: oldOption});
                break;
            }
            case SELECT_TYPE_XIANGPI: {
                option = boxXiangPi({canvas, stash: oldOption});
                break;
            }
        }
        updateDiffTypeAreas(option, newType);
        option.init();
    }

    useEffect(() => {
        const canvas = state.canvas.current;
        canvas.width = state.mainRef.current.offsetWidth;
        canvas.height = state.mainRef.current.offsetHeight;
    }, []);

    return {
        updateState,
        canvasState: state
    };
}


function boxXiangPi ({ canvas, stash }) {
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');

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

    function canvasMousedown () {}

    function canvasMousemove () {}

    function canvasMouseup () {}

    function render () {

    }

    return {
        init,
        render,
        clean,

    };
}


function boxHuaBi ({ canvas, stash }) {
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