import { SET_SCREEN } from './constants';
import { DELETE_ACTION } from './constants';
import { RESET_ACTION } from './constants';
import { INVERSE_ACTION } from './constants';
export const setScreen = (payload) => ({
    type: SET_SCREEN,
    payload,
});
export const deleteAction = (payload) => ({
    type: DELETE_ACTION,
    payload,
});
export const resetAction = (payload) => ({
    type: RESET_ACTION,
    payload,
});
export const inverseAction = (payload) => ({
    type: INVERSE_ACTION,
    payload,
});
