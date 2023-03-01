import {UseCanvasDrawReducer} from "./type";


const useCanvasDrawReducer: UseCanvasDrawReducer = (state, action) => {
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

export default useCanvasDrawReducer;