import {Reducer} from "react";

export type CanvasSelectOption = {
    init: () => void,
    clean: () => void,
    render: () => void,
    areas: [],
    // 所有渲染函数
    renderAll?: <T extends { newType: UseCanvasDrawInitData['type'] }>(this: T) => void
}

// 合法类型
export type LegalDrawType = Exclude<UseCanvasDrawInitData['type'], null>;

export type UseCanvasDrawInitData = {
    type: 0 | 1 | 2 | 3 | 4 | 5 | null,
    // 不同类型画布实例
    diffTypeAreas: CanvasSelectOption[],

}


export type UseCanvasDrawReducer = Reducer<UseCanvasDrawInitData | any, { value: any, type: string } & Record<string, any>>

