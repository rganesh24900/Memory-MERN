import React ,{useState,useEffect} from 'react'
import {AppBar,Avatar,Button,Toolbar,Typography} from '@material-ui/core'
import {Link,useHistory} from 'react-router-dom'
import memories from '../../images/memories.png'
import useStyles from './style'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import decode from 'jwt-decode'
import memoriesText from '../../images/memories-Text.png'
import memoriesLogo from '../../images/memories-Logo.png'

const Navbar = () => {

  let classes = useStyles();
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))?.result);
  const history = useHistory();
  const user = useSelector(state=>state?.auth.authData)?.result;
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    console.log(user)
  }, [])

  const logout = ()=>{
    dispatch({type:'LOGOUT'});
    history.push('/');
  }

  // useEffect(() => {
  //   if(user){
  //   }
  // }, [user])
  

  useEffect(() => {
    const token = user?.token;

    if( token){
      const decodedToken = decode(token);
      if (decodedToken?.exp * 1000 < new Date().getTime()) logout();
    }
  }, [location])
  
  
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <img src={memoriesText} alt='icon' height="45px" />
        <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user?
        (<div className={classes.profile}>
          <Avatar className={classes.purple} alt={user?.name} src={user?.picture}>{user?.name?.charAt(0)}</Avatar>
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