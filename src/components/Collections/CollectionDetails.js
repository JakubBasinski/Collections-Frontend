import React, { useEffect } from 'react';
import { CardActionArea } from '@material-ui/core/';
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import useGetSingleCollection from '../Hooks/useGetSingleCollection';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import ItemForm from '../Items/ItemForm';
import ReactMarkdown from 'react-markdown';

const CollectionDetails = () => {
  const {
    mutate: getCollection,
    fetchedCollection,
    fetchedUrl,
    isLoading: uploading,
    error: uploadError,
  } = useGetSingleCollection();

  useEffect(() => {
    getCollection();
  }, []);

  let additionalInformations = [
    fetchedCollection.string1name,
    fetchedCollection.string2name,
    fetchedCollection.string3name,
    fetchedCollection.data1name,
    fetchedCollection.data2name,
    fetchedCollection.data3name,
  ];

  return (
    <Grid item md={8}>
      <Box sx={{ marginTop: '75px' }}>
        <Grid container gap={4}>
          <Grid item md={4}>
            <Card
              sx={{
                height: '100%',
                width: '90%',
                backgroundColor: 'transparent',
                backdropFilter: 'invert(10%)',
                color: '#A2CDCB',
                flexWrap: 'wrap',
              }}
            >
              <CardActionArea
                sx={{
                  width: '100%',
                  height: '55%',
                }}
              >
                {fetchedCollection.image ? (
                  <CardMedia
                    sx={{
                      maxHeight: 250,
                      height: '100%',
                      objectFit: 'cover',
                      width: '100%',
                    }}
                    component="img"
                    title=""
                    image={fetchedUrl}
                  />
                ) : (
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      height: 200,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      borderColor: '#A2CDCB',
                      borderBottom: 1,
                      borderTop: 0,
                      borderLeft: 0,
                      borderRight: 0,
                      borderStyle: 'solid',
                    }}
                  >
                    <ImageNotSupportedIcon fontSize="large" />
                  </Box>
                )}
              </CardActionArea>

              <CardActionArea
                sx={{
                  width: '100%',
                  height: '45%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'start',
                  backdropFilter: 'invert(10%)',
                  background: 'none',
                  '&:hover': {
                    cursor: 'default',
                  },
                }}
              >
                <CardContent
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    gap: 0,
                    padding: '15px',
                  }}
                >
                  <Typography
                    sx={{
                      width: '100%',
                      flex: 1,
                      padding: 0,
                      margin: 0,
                      color: '#A2CDCB',
                      fontFamily: 'Source Sans Pro',
                      textShadow: '2px 2px 4px rgb(0,0,0)',
                      wordWrap: 'break-word',
                    }}
                    variant="h4"
                  >
                    {fetchedCollection.name}
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: 'Source Sans Pro',
                      wordWrap: 'break-word',
                    }}
                    variant="body1"
                    color="textSecondary"
                    component="p"
                  >
                    Topic
                  </Typography>

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
                      texTransform: 'capitalize',
                    }}
                    component="p"
                    gutterBottom
                  >
                    {fetchedCollection.topic}
                  </Typography>

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
                  <ReactMarkdown children={fetchedCollection.description} />
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

                  {additionalInformations.map((info, index) => {
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
                  })}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item md={7}>
            {/* <ItemList /> */}
            <ItemForm collection={fetchedCollection} />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default CollectionDetails;
