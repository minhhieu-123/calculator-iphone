import Grid from '@mui/material/Grid';

import Button from '~/components/Buttons';
import { GROUPS_A_BUTTONS } from '../../../Datas';

function GroupPre() {
    return (
        <>
            {GROUPS_A_BUTTONS &&
                GROUPS_A_BUTTONS.map((btn) => {
                    const dynamicProps = { [btn.className]: true }; // { primary: true }
                    return (
                        // <Grid container size={12} spacing={1}>
                        <Grid key={btn.id} item size={2}>
                            <Button {...dynamicProps}>{btn.title}</Button>
                        </Grid>
                        // </Grid>
                    );
                })}
        </>
    );
}

export default GroupPre;
