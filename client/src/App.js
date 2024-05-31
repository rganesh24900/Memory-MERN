import React from "react";
import { Container } from '@material-ui/core'
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from '@react-oauth/google'


const App = () => {

    return (
        <BrowserRouter>
            <Container>
                <GoogleOAuthProvider clientId="272293547078-i40vakvnr1mlm6ic8p8e8mcmbb2qvina.apps.googleusercontent.com">
                    <Navbar />
                    <Switch>
                        <Route path="/" exact component={Home}></Route>
                        <Route path="/auth" exact component={Auth}></Route>
                    </Switch>
                </GoogleOAuthProvider>
            </Container>
        </BrowserRouter>
    )
}

export default App