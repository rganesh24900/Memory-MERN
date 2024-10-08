import React from 'react'
import useStyles from './style'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment'
import { deletePost, likePost } from '../../../actions/posts';
import { useDispatch } from 'react-redux'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAlt';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory()
  const Likes =()=>{
    if(post?.likes?.length){
      return postMessage?.likes?.find((like)=> like == (user?.result?.googleId || user?.result?._id))
          ?(
            <><ThumbUpAltIcon fontSize='small'/>&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length-1} others liked this post`:`${post?.likes?.length} like${post?.likes?.length>1?'s':''}`}</>
          ):
          (
            <><ThumbUpAltOutlined fontSize='small'/>&nbsp;{post.likes.length} {post.likes.length == 1 ? 'Like':'Likes'}</>
          );
    }
    return <><ThumbUpAltOutlined fontSize='small'/>&nbsp;Like</>
  }

  const openPost = ()=>history.push(`/posts/${post._id}`)

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId || user?.result?._id) ===  post?.creator &&( <div className={classes.overlay2}>
        <Button style={{ color: "white" }} size='small' onClick={(e) => {
          setCurrentId(post._id)
        }}>
          <MoreHorizIcon fontSize='default' />
        </Button>
      </div>)}
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <CardContent>
        <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
        <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
      </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary' disabled={!user?.result} onClick={() => { dispatch(likePost(post._id, post)) }}>
          <Likes/>
        </Button>
        {(user?.result?.googleId || user?.result?._id) ===  post?.creator &&( 
        <Button size='small' color='primary' onClick={() => { dispatch(deletePost(post._id)) }}>
          <DeleteIcon fontSize='small' />
          Delete
        </Button>
)}
      </CardActions>
    </Card>
  )
}

export default Post