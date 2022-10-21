import * as React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import classes from './UserMenu.module.css';

const UserMenu = (props) => {
  console.log(props);
  const onClickHandlerAdd = () => {
    props.handleAction('add');
  };
  const onClickHandlerEdit = () => {
    props.handleAction('edit');
  };

  return (
    <React.Fragment>
      <Grid
        item
        md={2}
        marginX="50px"
        sx={{
          borderRight: 0.5,
          borderColor: 'rgba(255, 255, 255, 0.2)',
        }}
      >
        <Box
          sx={{
            marginTop: '150px',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <motion.div className={classes.cloudTagButton}>
            <Typography
              variant="h5"
              fontWeight={600}
              fontFamily={'Quicksand'}
              sx={{
                paddingBottom: 1,
                paddingLeft: 1.1,
                borderBottom: 0.5,
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: '#DCD7C9',
                letterSpacing: 2,
                fontSize: '1.6em',
              }}
            >
              Collections
            </Typography>

            <Typography
              onClick={onClickHandlerAdd}
              fontFamily={'Quicksand'}
              component={motion.li}
              value={'add'}
              sx={{
                borderLeft: 0.5,
                borderBottom: 0.5,
                borderColor: 'rgba(255, 255, 255, 0.2)',
                letterSpacing: 1.5,
                listStyleType: 'none',
                textDecoration: 'none',
                paddingTop: '8px',
                paddingRight: '8px',
                paddingBottom: '10px',
                paddingLeft: '15px',
                cursor: 'pointer',
                fontSize: '1.4em',
                marginTop: '17px',
                width: '70%',
                color: '#DCD7C9',
              }}
              whileHover={{
                scale: 1.15,
                originX: 0,
                color: '#f8e112',
                textShadow: '0px 0px 8px rgb(255,255,255)',
              }}
            >
              Add new Collection
            </Typography>

            <Typography
              fontFamily={'Quicksand'}
              onClick={onClickHandlerEdit}
              component={motion.li}
              sx={{
                borderLeft: 0.5,
                borderBottom: 0.5,
                borderColor: 'rgba(255, 255, 255, 0.2)',
                letterSpacing: 1.5,
                listStyleType: 'none',
                textDecoration: 'none',
                paddingTop: '8px',
                paddingRight: '8px',
                paddingBottom: '10px',
                paddingLeft: '15px',
                cursor: 'pointer',
                fontSize: '1.4em',
                marginTop: '17px',
                width: '70%',
                color: '#DCD7C9',
              }}
              whileHover={{
                scale: 1.15,
                originX: 0,
                color: '#f8e112',
                textShadow: '0px 0px 8px rgb(255,255,255)',
              }}
            >
              Edit Collections
            </Typography>
          </motion.div>
        </Box>
      </Grid>
    </React.Fragment>
  );
};

export default UserMenu;
