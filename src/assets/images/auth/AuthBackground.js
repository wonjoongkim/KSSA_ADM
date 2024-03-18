// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Image } from 'antd';
import DefaultBackgroundImg from './bg.png';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
    const theme = useTheme();
    return (
        <>
            <Box
                style={{
                    width: '60%',
                    height: 'calc(110vh - 0px)',
                    backgroundImage: `url(${DefaultBackgroundImg})`,
                    backgroundPosition: 'left',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '90%',
                    opacity: '0.9'
                }}
                sx={{
                    margin: { xs: ' 0 0 170px 120px', lg: '0' },
                    position: 'absolute',
                    filter: 'blur(0px)',
                    zIndex: -1,
                    bottom: 0
                }}
            ></Box>
        </>
    );
};

export default AuthBackground;
