import React ,{useEffect} from 'react'
import { Grid,CircularProgress } from '@material-ui/core';
import Post from './Post/Post'
import useStyles from './style'
import { useSelector } from 'react-redux';

const Posts = ({setCurrentId}) => {
  const classes = useStyles();
  const posts = useSelector(state=>state.posts)

  useEffect(() => {
    console.log("POSTS :: "+JSON.stringify(posts));
  
  }, [posts])
  
  return (
    !posts.length?<CircularProgress/>:(
      <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
        {
          posts.map(post=>(
            <Grid item key={post._id} xs={12} sm={6}>
              <Post post={post} setCurrentId={setCurrentId}/>
            </Grid>
          )
          )
        }
      </Grid>
    )
    
  )
}

export default Posts