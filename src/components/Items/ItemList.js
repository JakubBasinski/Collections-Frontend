import { Typography, Box } from '@mui/material';

const ItemList = () => {
  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
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
          fontSize: 27,
          width: '40%',
          marginBottom: '40px',
        }}
      >
        List
      </Typography>

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
          width: '40%',
          fontSize: 27,

          marginBottom: '40px',
        }}
      >
        New Item
      </Typography>
    </Box>
  );
};

export default ItemList;
