// import {  } from '@material-ui/core/';
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
} from '@mui/material';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import ReactMarkdown from 'react-markdown';
import * as cls from './CollectionCardSX';

const CollectionCard = (props) => {
  return (
    <Card
      onClick={(e) => {
        props.onClick();
      }}
      sx={props.card}
    >
      <CardActionArea sx={props.cardActionImage}>
        {props.url ? (
          <CardMedia
            sx={cls.cardMediaBox}
            component="img"
            image={props.url}
            title=""
            alt={props.name}
          />
        ) : (
          <Box sx={cls.noImageBox}>
            <ImageNotSupportedIcon fontSize="large" />
          </Box>
        )}
      </CardActionArea>

      <CardActionArea sx={props.cardActionDetails}>
        <CardContent sx={props.cardContent}>
          <Typography
            sx={{
              padding: 0,
              margin: 0,
              color: '#A2CDCB',
              fontFamily: 'Source Sans Pro',
              textShadow: '1px 1px 2px rgb(0,0,0)',
            }}
            variant="h4"
          >
            {props.name}
          </Typography>

          <Typography
            sx={{
              fontFamily: 'Source Sans Pro',
              fontSize: '1.2em'
            }}
            gutterBottom
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {props.topic}
          </Typography>

          {props.description ? (
            <Typography
              sx={{
                fontFamily: 'Source Sans Pro',
                wordWrap: 'break-word',
              }}
              variant="body1"
              color="textSecondary"
              component="p"
            >
              Description
            </Typography>
          ) : null}

          {props.description ? (
            <ReactMarkdown
              sx={{ textShadow: '2px 2px 4px rgb(0,0,0)' }}
              children={props.description}
            />
          ) : null}

          {props.informations ? (
            <Typography
              sx={{
                fontFamily: 'Source Sans Pro',
                wordWrap: 'break-word',
              }}
              gutterBottom
              variant="body1"
              color="textSecondary"
              component="p"
            >
              Additional informations
            </Typography>
          ) : null}

          {props.informations
            ? props.informations.map((info, index) => {
                return (
                  <Typography
                    sx={{
                      width: '100%',
                      flex: 1,
                      padding: 0,
                      margin: 0,
                      color: '#A2CDCB',
                      fontSize: '1.3em',
                      fontFamily: 'Source Sans Pro',
                      textShadow: '2px 2px 4px rgb(0,0,0)',
                      wordWrap: 'break-word',
                    }}
                    key={'info' + index}
                  >
                    {info}
                  </Typography>
                );
              })
            : null}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CollectionCard;

{
  /* <CardActions
sx={{
  width: '100%',
  height: '10%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
}}
>
<Button
  onClick={(e) => {
    e.stopPropagation();
    props.collContext.setMode('edit');
    props.navigate() 
  }}
  sx={{
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Source Sans Pro',
    fontSize: '1em',
    color: '#A2CDCB',
    '&:hover': {
      color: '#f8e112',
      background: 'rgb(3, 60, 65)',
    },
  }}
  type="button"
>
  Edit
  <EditIcon sx={{ marginLeft: '5px' }} fontSize="small" />
</Button>
<Button
  onClick={(e) => {
    e.stopPropagation();
    setBindId(collection._id);
    setOpen(true);
  }}
  sx={{
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Source Sans Pro',
    fontSize: '1em',
    color: '#A2CDCB',
    '&:hover': {
      color: '#cb8777',
      background: 'rgb(3, 60, 65)',
    },
  }}
  type="button"
>
  Delete
  <DeleteIcon sx={{ marginLeft: '5px' }} fontSize="small" />
</Button>
</CardActions> */
}
