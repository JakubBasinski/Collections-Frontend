import React, { useEffect, useState } from 'react';
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  deleteComment as deleteCommentApi,
  updateComment as updateCommentApi,
} from './DummyApi';

import * as classes from './styles/CommentSection.js';
import Comment from './Comment';
import { Typography, Box } from '@mui/material';
import CommentForm from './CommentForm';

const CommentList = ({ currentUserId }) => {
  const [backendComments, setComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );
  const getReplies = (commentId) => {
    return backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };

  const addComment = (text, parentId) => {
    console.log('addcomment', text, parentId);
    createCommentApi(text, parentId).then((comment) => {
      console.log(comment);
      setComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };

  const deleteComment = (commentId) => {
    if (window.confirm('Are you sure you want to remove comment? ')) {
      deleteCommentApi(commentId).then(() => {
        const updatedComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setComments(updatedComments);
      });
    }
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text, commentId).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setComments(updatedBackendComments);
      setActiveComment(null);
    });
  };

  useEffect(() => {
    getCommentsApi().then((fetchedComments) => {
      setComments(fetchedComments);
    });
  }, []);

  return (
    <Box sx={classes.comments}>
      <Typography variant="h3" sx={classes.commentsTitle}>
        Comments
      </Typography>
      <Box sx={classes.commentFormTitle}>Write comment</Box>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <Box sx={classes.commentsContainer}>
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            currentUserId={currentUserId}
            deleteComment={deleteComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            updateComment={updateComment}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CommentList;
