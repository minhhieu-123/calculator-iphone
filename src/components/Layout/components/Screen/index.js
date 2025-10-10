import { useStore } from '../../../../store';
import { Fragment } from 'react/jsx-runtime';

import './Screen.scss';
import Grid from '@mui/material/Grid';
import HeaderScreen from './HeaderScreen';
function Screen() {
    const [state, dispatch] = useStore();
    const { currInput, screenInput, exportInput } = state;
    function handleExport(value) {
        return value.join('');
    }
    return (
        <Fragment>
            <Grid item size={12}>
                <div className={'headerScreen'}>
                    <HeaderScreen />
                </div>
                <div className={'screen'}>
                    <div className="groupValue">
                        <span className="oldValue">0</span>

                        <span className="newValue">
                            {/* {handleExport(state.exportInput) === '' ? 0 : handleExport(state.exportInput)} */}
                            {handleExport(state.screenInput) === '' ? 0 : handleExport(state.screenInput)}
                        </span>
                    </div>
                    {/* <div className="groupValue_Pre">
                        <span className="oldValue_Pre">0,00</span>
                        <span className="newValue_Pre">0,00</span>
                    </div> */}
                </div>
            </Grid>
        </Fragment>
    );
}

export default Screen;
