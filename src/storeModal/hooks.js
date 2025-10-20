import { useContext } from 'react';
import Context from './Context';
export const useModal = () => {
    return useContext(Context);
};
