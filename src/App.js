import React, { useEffect } from "react";
import PushNotification from "./components/PushNotification";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
    useEffect(data => {
        // * Incoming data ==> { data: { newNotification: { label } } }
        toast(data.newNotification["label"]);
        console.log("data in useEffect >>>", data);
        return () => {};
    }, []);

    return (
        <div className="App">
            <PushNotification />
            <ToastContainer />
        </div>
    );
};

const subNewNotification = gql`
    subscription {
        newNotification {
            label
        }
    }
`;

export default graphql(subNewNotification)(App);
