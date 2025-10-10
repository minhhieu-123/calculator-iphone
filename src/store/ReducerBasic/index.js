import { initState } from '../reducer';

const opFull = ['+', '-', '*', '/'];
const operator = ['+', '*', '/'];

export function handleSetScreen(state, action) {
    const { value, title } = action.payload;
    const { currInput, prevInput, screenInput, exportInput } = state;
    const lenArrInput = screenInput.length;
    let numberArr = [];
    let countPeriod = 0;
    for (let i = lenArrInput - 1; i >= 0; i--) {
        let n = screenInput[i];
        if (!isNaN(n) || n === '.') {
            if (n === '.') ++countPeriod;
            numberArr.unshift(n);
        } else {
            break;
        }
    }
    if (numberArr.length == '1' && numberArr[0] == '0' && value == '0') return state;
    if (countPeriod == 1 && value == '.') return state;
    if (screenInput.at(-1) == '.' && value == '.') return state;
    if (!screenInput.length && value === '0') {
        return initState;
    }
    if (!screenInput.length && (opFull.includes(value) || value == '.')) {
        return {
            ...state,
            prevInput: '0',
            currInput: value,
            screenInput: ['0', value],
            exportInput: ['0', title],
        };
    }
    const last = screenInput.at(-1);
    const beforeLast = screenInput.at(-2);
    if (opFull.includes(last) && opFull.includes(value)) {
        if ((last === '*' || last === '/') && value === '-') {
            return {
                ...state,
                prevInput: currInput,
                currInput: value,
                screenInput: [...screenInput, value],
                exportInput: [...exportInput, title],
            };
        }
        if (last === '-' && value === '-') {
            return state;
        }
        if ((last === '-' && beforeLast === '*') || (last === '-' && beforeLast === '/' && value != '-')) {
            return {
                ...state,
                prevInput: currInput,
                currInput: value,
                screenInput: [...screenInput.slice(0, -2), value],
                exportInput: [...exportInput.slice(0, -2), title],
            };
        }
        const newScreen = [...screenInput];
        newScreen[newScreen.length - 1] = value;
        const newExport = [...exportInput];
        newExport[newExport.length - 1] = title;
        return {
            ...state,
            prevInput: currInput,
            currInput: value,
            screenInput: newScreen,
            exportInput: newExport,
        };
    }
    return {
        ...state,
        prevInput: currInput,
        currInput: value,
        screenInput: [...screenInput, value],
        exportInput: [...exportInput, title],
    };
}

export function handleDeleteAction(state, action) {
    const { value } = action.payload;
    const { currInput, screenInput, exportInput } = state;
    const lenArrInput = screenInput.length;
    if (lenArrInput === 2 && screenInput.at(0) === '0' && opFull.includes(screenInput.at(1))) {
        return initState;
    }
    const newScreenInput = screenInput.slice(0, -1);
    const newExportInput = exportInput.slice(0, -1);
    return {
        ...state,
        prevInput: currInput,
        currInput: value,
        screenInput: newScreenInput,
        exportInput: newExportInput,
    };
}

export function handleResetAction() {
    return initState;
}

export function handleInverseAction(state) {
    const { screenInput } = state;
    const lenArrInput = screenInput.length;
    let temp = [];
    let stack = [];
    for (let i = lenArrInput - 1; i >= 0; i--) {
        let n = screenInput[i];
        let nNext = screenInput[i - 1];
        if (operator.includes(n)) break;
        if (n === ')') {
            stack.push(n);
        }
        if (n.includes('(')) {
            if (!stack.length) {
                break;
            }
            stack.pop();
        }
        temp.unshift(n);
        if (i > 0 && n === '-' && nNext !== '-' && nNext !== '(') break;
    }
    const arrTheRest = screenInput.slice(0, lenArrInput - temp.length);
    if (temp.at(0) === '-') {
        temp.shift();
        temp.unshift('+');
    } else if (temp.at(0) == '(' && temp.indexOf('-') != 1) {
        temp.shift();
        temp.unshift('-');
        temp.pop();
    } else if (temp.at(0) == '(' && temp.indexOf('-') == 1) {
        temp.splice(0, 2);
        temp.pop();
    } else {
        temp.unshift('(', '-');
        temp.push(')');
    }
    return {
        ...state,
        screenInput: [...arrTheRest, ...temp],
    };
}
