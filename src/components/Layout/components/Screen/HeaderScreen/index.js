import Grid from '@mui/material/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import './HeaderScrenn.moudule.scss';
function HeaderScreen() {
    return (
        <Grid
            item
            paddingTop={1}
            size={1}
            sx={{
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}
        >
            <aside>
                <FontAwesomeIcon icon={faBars} className={'iconHeader'} />
            </aside>
        </Grid>
    );
}

export default HeaderScreen;
