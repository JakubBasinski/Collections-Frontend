import React, { useState } from 'react';
import { Button, Box, TextField, Typography } from '@mui/material';
import * as classes from './styles/CommentSection';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  initialText = '',
  handleCancel,
}) => {
  const [text, setText] = useState(initialText);
  const isTextDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText('');
  };

  return (
    <form onSubmit={onSubmit}>
      <Box
        sx={{
          width: '90%',
          gap: 2,
          display: 'flex',
          flexDirection: 'column',
          marginTop: '15px',
        }}
      >
        <TextField
          label="Name"
          name="name"
          variant="filled"
          value={text}
          multiline
          rows="4"
          sx={{
            width: '90%',
          }}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            sx={classes.commentFormButton}
            type="submit"
            disabled={isTextDisabled}
          >
            {isTextDisabled && <DoDisturbAltIcon />}
            {!isTextDisabled && <Box> {submitLabel}</Box>}
          </Button>

          {hasCancelButton && (
            <Button
              sx={classes.commentFormButtonCancel}
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          )}
        </Box>
      </Box>
    </form>
  );
};

export default CommentForm;
