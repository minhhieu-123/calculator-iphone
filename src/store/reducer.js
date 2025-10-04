import { SET_SCREEN } from './constants';

const initState = {
    currInput: '',
    screenInput: [],
    prevInput: '',
    exportInput: [],
};
function reducer(state, action) {
    switch (action.type) {
        case SET_SCREEN:
            return {
                ...state,
                prevInput: state.currInput,
                currInput: action.payload.value,
                screenInput: [...state.screenInput, action.payload.value],
                exportInput: [...state.exportInput, action.payload.title],
            };
        default:
            throw new Error('Invalid action.');
    }
}
export { initState };
export default reducer;
