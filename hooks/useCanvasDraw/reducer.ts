import {UseCanvasDrawReducer} from "./type";


const useCanvasDrawReducer: UseCanvasDrawReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_SELECT_STATE': {
            return {...state, type: action.value};
        }
        case 'UPDATE_DIFF_TYPE_AREAS': {
            const typeIndex = action.state;
            let diffTypeAreas = state.diffTypeAreas.slice();
            diffTypeAreas[typeIndex] = action.value
            return {...state, diffTypeAreas};
        }
        case 'STASH_TYPE_INDEX': {
            const stashTypeList = state.stashTypeList;
            const ind = stashTypeList.findIndex(res => res === action.value);
            if (ind != -1) {
                stashTypeList.splice(ind, 1);
            }
            stashTypeList.push(action.value);
            return {...state, stashTypeList}
        }
    }
}

export default useCanvasDrawReducer;