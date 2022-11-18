import React from 'react';
import * as classes from './styles/CommentSection.js';
import { Box, Typography, Divider } from '@mui/material';
import CommentForm from './CommentForm.js';

const Comment = ({
  comment,
  replies,
  currentUserId,
  deleteComment,
  activeComment,
  setActiveComment,
  parentId = null,
  addComment,
  updateComment
}) => {
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  console.log(timePassed);
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !timePassed;
  const cadDelete = currentUserId === comment.userId && !timePassed;
  const createdAt = new Date(comment.createdAt).toLocaleDateString('en-GB', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  const isReplying =
    activeComment &&
    activeComment.type === 'replying' &&
    activeComment.id === comment.id;

  const isEditing =
    activeComment &&
    activeComment.type === 'editing' &&
    activeComment.id === comment.id;

  const replyId = parentId ? parentId : comment.id;

  return (
    <Box sx={classes.comment}>
      <Box sx={classes.commentContent}>
        <Box sx={classes.commentRightPart}>
          <Box sx={classes.commentAuthor}>{comment.username}</Box>
          <Box sx={classes.createdAt}>{createdAt}</Box>

          <Box sx={classes.commentText}>
            {!isEditing && (
              <Typography
                //   noWrap
                sx={{
                  width: '90%',
                  color: 'primary.light',
                  borderColor: 'primary.dark',
                  fontSize: '1.2em',
                  overflowWrap: 'break-word',
                  paddingX: '5px',
                  marginTop: '5px',
                }}
              >
                {comment.body}
              </Typography>
            )}
            {isEditing && (
              <CommentForm
                submitLabel="Update"
                hasCancelButton
                initialText={comment.body}
                handleSubmit={(text) => updateComment(text, comment.id)}
                handleCancel={() => setActiveComment(null)}
              />
            )}
            <Divider sx={{ marginTop: '20px' }} />
            
            <Box sx={classes.commentActions}>
              {canReply && (
                <Box
                  sx={classes.commentAction}
                  onClick={() =>
                    setActiveComment({ id: comment.id, type: 'replying' })
                  }
                >
                  Reply
                </Box>
              )}
              {canEdit && (
                <Box
                  sx={classes.commentAction}
                  onClick={() => {
                    setActiveComment({ id: comment.id, type: 'editing' });
                  }}
                >
                  Edit
                </Box>
              )}
              {cadDelete && (
                <Box
                  sx={classes.commentAction}
                  onClick={() => {
                    deleteComment(comment.id);
                  }}
                >
                  Delete
                </Box>
              )}
            </Box>
            <Box>
              {isReplying && (
                <CommentForm
                  submitLabel="Reply"
                  handleSubmit={(text) => addComment(text, replyId)}
                />
              )}
            </Box>
          </Box>

          {replies.length > 0 && (
            <Box sx={classes.replies}>
              {replies.map((reply) => (
                <Comment
                  comment={reply}
                  key={reply.id}
                  replies={[]}
                  currentUserId={currentUserId}
                  parentId={comment.id}
                  deleteComment={deleteComment}
                  updateComment={updateComment}
                  addComment={addComment}
                  activeComment={activeComment}
                  setActiveComment={setActiveComment}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Comment;
