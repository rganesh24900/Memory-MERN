import React from "react";
import { Container } from '@material-ui/core'
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from '@react-oauth/google'
import PostDetails from "./components/PostDetails/PostDetails";
import { useSelector } from "react-redux";


const App = () => {
    const user = useSelector(state=>state?.auth.authData);
    console.log({user})
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <GoogleOAuthProvider clientId="272293547078-i40vakvnr1mlm6ic8p8e8mcmbb2qvina.apps.googleusercontent.com">
                    <Navbar />
                    <Switch>
                        <Route path="/posts/search" exact component={Home}></Route>
                        <Route path="/posts" exact component={Home}></Route>
                        <Route path="/auth" exact component={()=>(!user ? <Auth/> : <Redirect to="/posts"/>)}></Route>
                        <Route path="/" exact component={()=><Redirect to="/posts"/>}></Route>
                        <Route path="/posts/:id" exact component={PostDetails}></Route>
                    </Switch>
                </GoogleOAuthProvider>
            </Container>
        </BrowserRouter>
    )
}

export default App