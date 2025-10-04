import { CalIcon } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
export const GROUPS_A_BUTTONS = [
    { id: 1, title: '(', className: 'four' },
    { id: 2, title: ')', className: 'four' },
    { id: 3, title: 'mc', className: 'four' },
    { id: 4, title: 'm+', className: 'four' },
    { id: 5, title: 'm-', className: 'four' },
    { id: 6, title: 'mr', className: 'four' },

    { id: 7, title: '2nd', className: 'four' },
    { id: 8, title: 'x²', className: 'four' },
    { id: 9, title: 'x³', className: 'four' },
    { id: 10, title: 'xʸ', className: 'four' },
    { id: 11, title: 'eˣ', className: 'four' },
    { id: 12, title: '10ˣ', className: 'four' },

    { id: 13, title: '⅟x', className: 'four' },
    { id: 14, title: '²√x', className: 'four' },
    { id: 15, title: '³√x', className: 'four' },
    { id: 16, title: 'ʸ√x', className: 'four' },
    { id: 17, title: 'ln', className: 'four' },
    { id: 18, title: 'log₁₀', className: 'four' },

    { id: 19, title: 'x!', className: 'four' },
    { id: 20, title: 'sin', className: 'four' },
    { id: 21, title: 'cos', className: 'four' },
    { id: 22, title: 'tan', className: 'four' },
    { id: 23, title: 'e', className: 'four' },
    { id: 24, title: 'EE', className: 'four' },

    { id: 25, title: 'Rand', className: 'four' },
    { id: 26, title: 'sinh', className: 'four' },
    { id: 27, title: 'cosh', className: 'four' },
    { id: 28, title: 'tanh', className: 'four' },
    { id: 29, title: 'π', className: 'four' },
    { id: 30, title: 'Rad', className: 'four' },
];
export const GROUPS_B_BUTTONS = [
    {
        id: 31,
        values: ['reset', 'clear'],
        titles: ['AC', <FontAwesomeIcon icon={faDeleteLeft} className={'iconDelete'} />],
        className: 'second',
    },
    { id: 32, value: 'handle', title: '+/-', className: 'second' },
    { id: 33, value: '*0.01', title: '%', className: 'second' },
    { id: 34, value: '/', title: '÷', className: 'primary' },

    { id: 35, value: '7', title: '7', className: 'third' },
    { id: 36, value: '8', title: '8', className: 'third' },
    { id: 37, value: '9', title: '9', className: 'third' },
    { id: 38, value: '*', title: 'x', className: 'primary' },

    { id: 39, value: '4', title: '4', className: 'third' },
    { id: 40, value: '5', title: '5', className: 'third' },
    { id: 41, value: '6', title: '6', className: 'third' },
    { id: 42, value: '-', title: '-', className: 'primary' },

    { id: 43, value: '1', title: '1', className: 'third' },
    { id: 44, value: '2', title: '2', className: 'third' },
    { id: 45, value: '3', title: '3', className: 'third' },
    { id: 46, value: '+', title: '+', className: 'primary' },

    { id: 47, value: null, title: <CalIcon className={'CalIcon'} />, className: 'third' }, // nút hình máy tính (icon), bạn có thể thay bằng svg/img
    { id: 48, value: '0', title: '0', className: 'third' },
    { id: 49, value: '.', title: ',', className: 'third' },
    { id: 50, value: '=', title: '=', className: 'primary' },
];
