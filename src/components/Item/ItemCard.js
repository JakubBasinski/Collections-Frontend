import * as React from 'react';
import Card from '@mui/material/Card';
import { CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';

const ItemCard = (props) => {
  const navigate = useNavigate();
  const gotoItemPage = (path) => {
    navigate(`/items/${path}`);
  };

  return (
    <Card
      onClick={(e) => {
        gotoItemPage(props._id);
      }}
      elevation={12}
      sx={props.cardClass}
    >
      <CardContent>
        <Typography
          sx={{
            fontFamily: 'Quicksand',
            fontSize: '1.5em',
            fontWeight: '800',
            borderBottom: 1,
            borderColor: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          {props.name}
        </Typography>
        {props.author ? (
          <Box>
            <Typography
              sx={{
                marginTop: '15px',
                fontSize: '0.8em',
                fontFamily: 'Quicksand',
              }}
            >
              Author:
            </Typography>
            <Typography
              sx={{
                fontWeight: '600',
                fontFamily: 'Quicksand',
                fontSize: '1.5em',
              }}
            >
              {props.author}
            </Typography>
          </Box>
        ) : null}

        <Typography
          sx={{ marginTop: '15px', fontSize: '0.8em', fontFamily: 'Quicksand' }}
        >
          Collection:
        </Typography>

        <Typography
          sx={{
            padding: 0,
            fontWeight: '600',
            fontFamily: 'Quicksand',
            fontSize: '1.5em',
            marginBottom: '1.2rem',
          }}
          gutterBottom
        >
          {props.collection}
        </Typography>
        {/* <Divider sx={{ marginBottom: '20px' }} /> */}
        <Box
          sx={{
            padding: 0,
            margin: 0,
            width: '100%',
            justifyContent: 'end',
            display: 'flex',
          }}
        >
          <Box
            sx={{
              width: '15%',
              borderRadius: '5px',
              border: 'solid 1px secondar.dark',
              background: '#1A373C',
              display: 'flex',
              justifyContent: 'center',
              letterSpacing: 1,
              paddingX: '10px',
              paddingY: '5px',
              textTransform: 'none',
              fontSize: '1em',
              '&:hover': {
                color: '#A2CDCB',
                background: '#1A373C',
                boxShadow: 5,
                transition: 'all 0.3s ease 0s',
                transform: 'translateY(-1px)',
              },
            }}
          >
            <FavoriteBorderIcon
              sx={{
                color: '#55a693',
                '&:hover': {
                  color: '#A2CDCB',
                },
              }}
            />
            {/* <Typography>(1)</Typography> */}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
