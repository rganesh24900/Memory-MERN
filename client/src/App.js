import React from "react";
import { Container } from '@material-ui/core'
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from '@react-oauth/google'
import PostDetails from "./components/PostDetails/PostDetails";


const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'))
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <GoogleOAuthProvider clientId="272293547078-i40vakvnr1mlm6ic8p8e8mcmbb2qvina.apps.googleusercontent.com">
                    <Navbar />
                    <Switch>
                        <Route path="/" exact component={()=><Redirect to="/posts"/>}></Route>
                        <Route path="/posts" exact component={Home}></Route>
                        <Route path="/posts/search" exact component={Home}></Route>
                        <Route path="/posts/:id" exact component={PostDetails}></Route>
                        <Route path="/auth" exact component={()=>(!user ? <Auth/> : <Redirect to="/posts"/>)}></Route>
                    </Switch>
                </GoogleOAuthProvider>
            </Container>
        </BrowserRouter>
    )
}

export default App