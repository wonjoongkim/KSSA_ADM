/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';

// material-ui
import { Box } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

import DefaultBackgroundImg from '../../assets/images/auth/bg.png';
// ==============================|| AUTHENTICATION - CARD WRAPPER ||============================== //

const AuthCard = ({ children, ...other }) => {
    return (
        <MainCard
            sx={{
                maxWidth: { xs: 500, lg: 575 },
                margin: { xs: '80px 0 0 0', md: 3, lg: '0 0 0 940px' },
                '& > *': {
                    flexGrow: 1,
                    flexBasis: '50%'
                }
            }}
            content={false}
            {...other}
            border={false}
            boxShadow
            shadow={(theme) => theme.customShadows.z1}
        >
            <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>{children}</Box>
        </MainCard>
    );
};

AuthCard.propTypes = {
    children: PropTypes.node
};

export default AuthCard;
