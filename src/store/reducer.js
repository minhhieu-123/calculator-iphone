import { EXPORT_ACTION, INVERSE_ACTION, SET_SCREEN, DELETE_ACTION, RESET_ACTION } from './constants';

import {
    handleSetScreen,
    handleDeleteAction,
    handleResetAction,
    handleInverseAction,
    handleExportAction,
} from './ReducerBasic';

const initState = {
    currInput: '',
    prevInput: '',
    screenInput: [],
    exportInput: [],
};

function reducer(state, action) {
    switch (action.type) {
        case SET_SCREEN:
            return handleSetScreen(state, action);
        case DELETE_ACTION:
            return handleDeleteAction(state, action);
        case RESET_ACTION:
            return handleResetAction();
        case INVERSE_ACTION:
            return handleInverseAction(state);
        case EXPORT_ACTION:
            return handleExportAction(state, action);
        default:
            throw new Error('Invalid action.');
    }
}

export { initState };
export default reducer;
