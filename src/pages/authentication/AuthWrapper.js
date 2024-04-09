/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';

// material-ui
import { Box, Grid } from '@mui/material';

// project import
import AuthCard from './AuthCard';
import Logo from 'components/Logo';
import AuthFooter from 'components/cards/AuthFooter';

// assets
import AuthBackground from 'assets/images/auth/AuthBackground';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => (
    <Box sx={{ minHeight: '80vh' }}>
        <AuthBackground />
        <Grid
            container
            direction="column"
            justifyContent="flex-end"
            sx={{
                minHeight: '80vh'
            }}
        >
            <Grid item xs={12} sx={{ ml: 3, mt: 5 }}>
                <Logo />
            </Grid>
            <Grid item xs={12}>
                <Grid
                    item
                    xs={{ order: 1 }}
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{ minHeight: { xs: 'calc(90vh - 134px)', md: 'calc(90vh - 112px)' } }}
                >
                    <Grid item xs={{ order: 2 }} alignItems="center" container justifyContent="center" sx={{ m: 3, mt: 5 }}>
                        <AuthCard>{children}</AuthCard>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={24} sx={{ m: 3, mt: 5 }}>
                <AuthFooter />
            </Grid>
        </Grid>
    </Box>
);

AuthWrapper.propTypes = {
    children: PropTypes.node
};

export default AuthWrapper;