import { initState } from '../reducer';

const opFull = ['+', '-', '*', '/'];
const operator = ['+', '*', '/'];

export function handleSetScreen(state, action) {
    const { value, title } = action.payload;
    const { currInput, prevInput, screenInput } = state;
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
            };
        }
        const newScreen = [...screenInput];
        newScreen[newScreen.length - 1] = value;
        return {
            ...state,
            prevInput: currInput,
            currInput: value,
            screenInput: newScreen,
        };
    }
    return {
        ...state,
        prevInput: currInput,
        currInput: value,
        screenInput: [...screenInput, value],
    };
}

export function handleDeleteAction(state, action) {
    const { value } = action.payload;
    const { currInput, screenInput } = state;
    const lenArrInput = screenInput.length;
    if (lenArrInput === 2 && screenInput.at(0) === '0' && opFull.includes(screenInput.at(1))) {
        return initState;
    }
    const newScreenInput = screenInput.slice(0, -1);
    return {
        ...state,
        prevInput: currInput,
        currInput: value,
        screenInput: newScreenInput,
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

export function handleExportAction(state, action) {
    const { value } = action.payload;
    const { screenInput } = state;
    // khai báo các hàm toán học
    const operators = {
        '+': { precedence: 2, associativity: 'L' },
        '-': { precedence: 2, associativity: 'L' },
        '*': { precedence: 3, associativity: 'L' },
        '/': { precedence: 3, associativity: 'L' },
        '^': { precedence: 4, associativity: 'R' },
        sin: { precedence: 5, associativity: 'R', func: Math.sin },
        cos: { precedence: 5, associativity: 'R', func: Math.cos },
        tan: { precedence: 5, associativity: 'R', func: Math.tan },
        sqrt: { precedence: 5, associativity: 'R', func: Math.sqrt },
        log: { precedence: 5, associativity: 'R', func: Math.log10 },
        abs: { precedence: 5, associativity: 'R', func: Math.abs },
        ln: { precedence: 5, associativity: 'R', func: Math.log },
        exp: { precedence: 5, associativity: 'R', func: Math.exp },
    };

    // merge các phần tử thành mảng token
    function mergeTokens(screenInput) {
        let newArr = [];
        let numBuffer = '';
        const funcRegex = /^(sin|cos|tan|sqrt|log|abs|ln|exp)$/i;
        const operatorRegex = /^[+\-*/^()]$/;
        for (let i = 0; i < screenInput.length; i++) {
            let n = screenInput[i];
            let nPrev = screenInput[i - 1];
            if (screenInput.length && ((n == '-' && screenInput.at(0) == '-') || (nPrev && nPrev == '(' && n == '-'))) {
                numBuffer += n;
                continue;
            }
            if (/[0-9.]/.test(n) && !operatorRegex.test(n)) {
                numBuffer += n;
                continue;
            }
            if (funcRegex.test(n)) {
                if (numBuffer) {
                    newArr.push(numBuffer);
                    numBuffer = '';
                }
                newArr.push(n);
                continue;
            }
            if (/^[+\-*/^()eE%]$/.test(n)) {
                if (numBuffer) newArr.push(numBuffer);
                numBuffer = '';
                if (n === 'e' || n === 'E') {
                    newArr.push('*');
                }
                if (n === '%') {
                    newArr.push('*', '0.01');
                }
                if (n !== '%') {
                    newArr.push(n);
                }
            }
        }
        if (numBuffer) newArr.push(numBuffer);

        return newArr;
    }

    // chuyển từ infix sang RPN
    function infixToRPN(tokens) {
        let outputQueue = [];
        let operatorQueue = [];
        for (let token of tokens) {
            if (!isNaN(token)) {
                outputQueue.push(token);
            } else if (token in operators && !['+', '-', '*', '/', '^'].includes(token)) {
                operatorQueue.push(token);
            } else if (token in operators) {
                while (
                    operatorQueue.length &&
                    operatorQueue[operatorQueue.length - 1] in operators &&
                    ((operators[token].associativity === 'L' &&
                        operators[token].precedence <= operators[operatorQueue[operatorQueue.length - 1]].precedence) ||
                        (operators[token].associativity === 'R' &&
                            operators[token].precedence <
                                operators[operatorQueue[operatorQueue.length - 1]].precedence))
                ) {
                    outputQueue.push(operatorQueue.pop());
                }
                operatorQueue.push(token);
            } else if (token === '(') {
                operatorQueue.push(token);
            } else if (token === ')') {
                while (operatorQueue.length && operatorQueue[operatorQueue.length - 1] !== '(') {
                    outputQueue.push(operatorQueue.pop());
                }
                operatorQueue.pop();
                if (
                    operatorQueue.length &&
                    operatorQueue[operatorQueue.length - 1] in operators &&
                    !['+', '-', '*', '/', '^'].includes(operatorQueue[operatorQueue.length - 1])
                ) {
                    outputQueue.push(operatorQueue.pop());
                }
            }
        }
        while (operatorQueue.length) {
            outputQueue.push(operatorQueue.pop());
        }
        return outputQueue;
    }

    // tính toán kết quả từ RPN
    function evaluateRPN(rpnTokens) {
        let stack = [];
        for (let token of rpnTokens) {
            if (!isNaN(token)) {
                stack.push(parseFloat(token));
            } else if (token in operators) {
                if (['+', '-', '*', '/', '^'].includes(token)) {
                    const b = stack.pop();
                    const a = stack.pop();
                    switch (token) {
                        case '+':
                            stack.push(a + b);
                            break;
                        case '-':
                            stack.push(a - b);
                            break;
                        case '*':
                            stack.push(a * b);
                            break;
                        case '/':
                            stack.push(a / b);
                            break;
                        case '^':
                            stack.push(Math.pow(a, b));
                            break;
                    }
                } else {
                    // hàm toán học
                    const a = stack.pop();
                    stack.push(operators[token].func(a));
                }
            }
        }
        return stack[0];
    }

    // thực thi các bước
    const tokens = mergeTokens(screenInput);
    console.log(tokens);
    const rpn = infixToRPN(tokens);
    console.log(rpn);

    const result = evaluateRPN(rpn);
    console.log(result);

    return {
        ...state,
        currInput: value,
        exportInput: [...state.screenInput],
        screenInput: String(result).split(''),
    };
}
