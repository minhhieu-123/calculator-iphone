import Grid from '@mui/material/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import './HeaderScrenn.moudule.scss';

import ModalContainer from '../../../../Modal/ModalContainer';
import { useModal } from '../../../../../storeModal';
import TaskBar from '../TaskBar';
function HeaderScreen() {
    const { openModal } = useModal();
    const openModalMedium = () => {
        openModal(
            <ModalContainer medium>
                <TaskBar></TaskBar>
            </ModalContainer>,
        );
        // logic small
    };

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
                <button className={'buttonHeader'} onClick={openModalMedium}>
                    <FontAwesomeIcon icon={faBars} className={'iconHeader'} />
                </button>
            </aside>
        </Grid>
    );
}

export default HeaderScreen;
