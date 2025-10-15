import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { actions, useStore } from '../../../../store';

import Button from '~/components/Buttons';
import { GROUPS_B_BUTTONS } from '../../../Datas';

function GroupBasic() {
    const [state, dispatch] = useStore();
    const { currInput, screenInput } = state;
    //Handle swap button
    const [deleteMode, setDeleteMode] = useState(false);
    useEffect(() => {
        if (currInput === '=') {
            setDeleteMode(false);
        } else if ((currInput !== '' && screenInput.length >= 1) || (currInput === '' && screenInput.length >= 1)) {
            setDeleteMode(true);
        } else {
            setDeleteMode(false);
        }
    }, [currInput, screenInput]);

    return (
        <>
            {GROUPS_B_BUTTONS &&
                GROUPS_B_BUTTONS.map((btn) => {
                    const dynamicProps = { [btn.className]: true };
                    //Check condition dispatch
                    const handleDispatch = (payload, action) => (e) => {
                        e.preventDefault();
                        switch (action) {
                            case 'deleteAction':
                                dispatch(actions.deleteAction(payload));
                                break;
                            case 'setScreen':
                                dispatch(actions.setScreen(payload));
                                break;
                            case 'resetAction':
                                dispatch(actions.resetAction(payload));
                                break;
                            case 'inverseAction':
                                const operator = ['+', '-', '*', '/', '.'];
                                if (operator.includes(payload.value) && operator.includes(state.currInput)) return;
                                dispatch(actions.inverseAction(payload));
                                break;
                            case 'exportAction':
                                dispatch(actions.exportAction(payload));
                                break;
                            default:
                                console.warn('Unknown action');
                        }
                    };
                    //Swap button AC to Delete
                    const handleTitle = Array.isArray(btn.titles) ? btn.titles[deleteMode ? 1 : 0] : btn.title;
                    const handleValue = Array.isArray(btn.values) ? btn.values[deleteMode ? 1 : 0] : btn.value;
                    const handleAction = Array.isArray(btn.actions) ? btn.actions[deleteMode ? 1 : 0] : btn.action;

                    return (
                        <Grid key={btn.id} item size={3}>
                            <Button
                                type="button"
                                onClick={handleDispatch(
                                    { value: handleValue, title: handleTitle, kind: btn.kind },
                                    handleAction,
                                )}
                                {...dynamicProps}
                            >
                                {handleTitle}
                            </Button>
                        </Grid>
                    );
                })}
        </>
    );
}

export default GroupBasic;
