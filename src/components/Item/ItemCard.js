import * as React from 'react';
import Card from '@mui/material/Card';
import { CardContent, Typography } from '@mui/material';

const ItemCard = (props) => {
  return (
    <Card
      elevation={12}
      sx={{
        background: 'none',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        color: '#DCD7C9',
        padding: '5px',
        backdropFilter: 'invert(10%)',
      }}
    >
      <CardContent>
        <Typography
          sx={{
            fontFamily: 'Quicksand',
            fontSize: '1.5em',
            fontWeight: '800',
            paddingY: '5px',
            borderBottom: 1,
            borderColor: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          {props.name}
        </Typography>

        <Typography
          sx={{ marginTop: '15px', fontSize: '0.8em', fontFamily: 'Quicksand' }}
        >
          Author:
        </Typography>
        <Typography
          sx={{ fontWeight: '600', fontFamily: 'Quicksand', fontSize: '1.5em' }}
        >
          {props.author}
        </Typography>

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
          }}
        >
          {props.collection}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
