import React ,{useState,useEffect} from 'react'
import {AppBar,Avatar,Button,Toolbar,Typography} from '@material-ui/core'
import {Link,useHistory} from 'react-router-dom'
import memories from '../../images/memories.png'
import useStyles from './style'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
const Navbar = () => {

  let classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('google-profile')));
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    console.log(user)
    setUser(JSON.parse(localStorage.getItem('google-profile')));
  }, [])

  const logout = ()=>{
    dispatch({type:'LOGOUT'});
    history.push('/');
    setUser(null);

  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('google-profile'))); 
  }, [location])
  
  
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="centre">Memories</Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user?
        (<div className={classes.profile}>
          <Avatar className={classes.purple} alt={user.name} src={user.picture}>{user.name.charAt(0)}</Avatar>
          <Typography className={classes.userName} variant='h6'>{user.name}</Typography>
          <Button onClick={logout} variant='contained' className={classes.logout} color="secondary" >Logout</Button>
        </div>):
        <Button component={Link} to="/auth" variant='contained' color='primary'>Sign In</Button>
      }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar