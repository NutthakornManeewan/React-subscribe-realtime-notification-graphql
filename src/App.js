import React, { useEffect } from "react";
import gql from "graphql-tag";
import PushNotification from "./components/PushNotification";
import { useSubscription } from "@apollo/react-hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const subNewNotification = gql`
    subscription newNotification($id: String) {
        newNotification(id: $id) {
            label
            from
        }
    }
`;

const App = props => {
    const { data, loading } = useSubscription(subNewNotification, {
        variables: { id: "aek" },
    });
    useEffect(() => {
        console.log("data useSubscription >>>", data, loading);
        if (!loading)
            if (!!data.newNotification.from.find(u_id => u_id === "aek"))
                toast(data.newNotification.label);
        return () => {};
    });

    return (
        <div className="App">
            <PushNotification />
            <ToastContainer />
        </div>
    );
};

export default App;
