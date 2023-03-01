import {useEffect, useReducer, useRef} from "react";
import type { UseCanvasDrawInitData, CanvasSelectOption, LegalDrawType, UseCanvasDrawReducer } from './type/index';
import boxHuaBi from "../../utils/draw/boxHuaBi";
import useCanvasDrawReducer from "./reducer";
import boxRubber from "../../utils/draw/boxXiangPi";
import boxSelection from "../../utils/draw/boxSelection";

let SELECT_TYPE_HUABI = 0;
let SELECT_TYPE_XIANGPI = 4;
let SELECT_TYPE_SELECTION = 5;


export default function useCanvasDraw (initData: Partial<UseCanvasDrawInitData>, reducer = useCanvasDrawReducer) {
    const [state, dispatch] = useReducer<UseCanvasDrawReducer>(reducer, {
        // 不同类型工具
        type: 0,
        // 不同类型画布实例
        diffTypeAreas: [],
        // 点击类型先后 缓存
        stashTypeList: [],
        ...initData
    });

    const canvasRef = useRef<HTMLCanvasElement>();

    const updateState = (selectState: LegalDrawType) => {
        if (state.type === selectState && !selectState) return;
        statusSlot(selectState, state.type);
        dispatch({ type: 'UPDATE_SELECT_STATE', value: selectState });
        dispatch({ type: 'STASH_TYPE_INDEX', value: selectState })
    }

    const updateDiffTypeAreas = <A extends CanvasSelectOption, V = UseCanvasDrawInitData['type']>(diffTypeAreas: A, selectState: V) => {
        dispatch({ type: 'UPDATE_DIFF_TYPE_AREAS', value: diffTypeAreas, state: selectState });
    }

    function statusSlot (newType: LegalDrawType, oldType: UseCanvasDrawInitData['type']) {
        // 同类型画板缓存 面板数据
        const oldOption = state.diffTypeAreas[newType] || {}, canvas = canvasRef.current;

        if (!canvas) return;

        // 操作前清空上一个代理事件
        oldType !=null && state.diffTypeAreas[oldType]?.clean();

        // 所有类型画板渲染
        function render (this: { newType: LegalDrawType }, cb = null) {
            state.diffTypeAreas.forEach((rl, ind: number) => {
                if (ind != this.newType) {
                    rl && rl.render(cb)
                }
            });
        }
        let option;
        delete oldOption.renderAll;
        oldOption && (oldOption.renderAll = render.bind({ newType }));

        switch (newType) {
            case SELECT_TYPE_SELECTION: {
                option = boxSelection({ canvas, stash: oldOption });
                break;
            }
            case SELECT_TYPE_HUABI: {
                option = boxHuaBi({ canvas, stash: oldOption });
                break;
            }
            case SELECT_TYPE_XIANGPI: {
                option = boxRubber({ canvas, stash: oldOption });
                break;
            }
        }
        if (option) {
            updateDiffTypeAreas(option, newType);
            option.init();
        }
    }

    const backDraw = () => {
        // let stashTypeList = state.stashTypeList;
        // let ind = stashTypeList.pop();
        //
        // // if (ind == undefined) return;
        // const option = state.diffTypeAreas[ind] || {};
        // console.log('///', ind)
        // option.areas.pop()

    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const parentElement = canvas.parentElement || { offsetWidth: 300, offsetHeight: 400 }
            canvas.width = parentElement.offsetWidth;
            canvas.height = parentElement.offsetHeight;


        }
    }, []);

    return {
        updateState,
        canvasState: state,
        canvasRef,
        backDraw
    };
}

useCanvasDraw.defaultReducer = useCanvasDrawReducer;