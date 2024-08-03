import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import React, { useState} from 'react'
import useStyles from './style'
import Input from './Input';
import Icon from './Icon'
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {signin,signup} from '../../actions/auth';


const Auth = () => {
    const initialState = {firstName:'',lastName:'',email:'',password:'',conformPasword:''}
    const classes = useStyles();
    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch();
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("insideform",formData)
        if(isSignUp){
            dispatch(signup(formData,history))
        }
        else{
            dispatch(signin(formData,history))
        }

    }

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => { setShowPassword(!prevShowPassword) })
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => { setIsSignUp(!prevIsSignUp) })
    }

    const googleSuccess = async (res) => {
        try {
            console.log(res)
            if (res.credential) {
                const decoded = jwt_decode(res.credential);
                const { name, picture, sub } = decoded;  
                dispatch({ type: 'AUTH', data: { name, picture, sub } });
                history.push('/');
            }
        } catch (error) {
            console.log(error);
        }

    }

    const googleFailure = async (error) => {
        console.log(error)
        console.log("Google sign was failed")
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name='firstName' label='First Name' handleChange={handleChange} half></Input>
                                    <Input name='firstName' label='First Name' handleChange={handleChange} half></Input>
                                </>
                            )
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange} type="email"></Input>
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}></Input>
                        {isSignUp && <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type="password"></Input>}
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        onSuccess={googleSuccess}
                        onError={googleFailure}
                    />
                </form>
            </Paper>
            <Grid container justifyContent='flex-end'>
                <Grid item>
                    <Button onClick={switchMode}>
                        {isSignUp ? "Already have an account? SignIn" : "Don't have an account? Sign up"}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Auth