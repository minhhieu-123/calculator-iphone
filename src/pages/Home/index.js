import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import './Home.moudule.scss';
import Screen from '../../components/Layout/components/Screen';
import GroupBasic from '../../components/Layout/components/GroupBasic';
import GroupPre from '../../components/Layout/components/GroupPre';

function Home() {
    return (
        <>
            <div id="Group_Modal"></div>

            <Box className="myBox" justifyContent="center" alignItems="center">
                <Grid container spacing={1}>
                    <Screen />

                    <GroupPre />

                    <GroupBasic />
                </Grid>
            </Box>
        </>
    );
}

export default Home;
