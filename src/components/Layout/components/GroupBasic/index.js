import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { actions, useStore } from '../../../../store';

import Button from '~/components/Buttons';
import { GROUPS_B_BUTTONS } from '../../../Datas';

function GroupBasic() {
    const [state, dispatch] = useStore();
    const { currInput, screenInput } = state;
    const [deleteMode, setDeleteMode] = useState(false);
    console.log('delete', deleteMode);
    useEffect(() => {
        if ((currInput != '' && screenInput.length >= 1) || (currInput === '' && screenInput.length >= 1)) {
            setDeleteMode(true);
        } else {
            setDeleteMode(false);
        }
    }, [currInput, screenInput]);
    return (
        <>
            {console.log('re - render')}
            {GROUPS_B_BUTTONS &&
                GROUPS_B_BUTTONS.map((btn) => {
                    const dynamicProps = { [btn.className]: true }; // { primary: true }
                    const handleDispatch = (payload) => (e) => {
                        e.preventDefault();
                        const opValue = ['+', '-', '*', '/', '.'];
                        if (payload.value === '-' && state.currInput === '*') dispatch(actions.setScreen(payload));
                        else if (opValue.includes(payload.value) && opValue.includes(state.currInput)) return;
                        else {
                            dispatch(actions.setScreen(payload));
                        }
                    };
                    const handleTitle = Array.isArray(btn.titles) ? btn.titles[deleteMode ? 1 : 0] : btn.title;
                    console.log(handleTitle);
                    const handleValue = Array.isArray(btn.values) ? btn.values[deleteMode ? 1 : 0] : btn.value;
                    console.log(handleValue);
                    return (
                        // <Grid container size={12} spacing={1}>

                        <Grid key={btn.id} item size={3}>
                            <Button
                                type="button"
                                onClick={handleDispatch({ value: handleValue, title: handleTitle })}
                                {...dynamicProps}
                            >
                                {handleTitle}
                            </Button>
                        </Grid>

                        // </Grid>
                    );
                })}
        </>
    );
}

export default GroupBasic;
