import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return(
        <Route
            {...rest}
            render = {props => {
                if (localStorage.getItem("token")){
                    return <Component {...props} />;
                } else {
                    console.log("redirecting!");
                    return <Redirect to = "/login" />;
                }
            }}
        > 
            <div>You are in Private Route</div>
        </Route>
    )
}

export default PrivateRoute;