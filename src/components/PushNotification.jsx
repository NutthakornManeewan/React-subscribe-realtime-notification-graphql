import React, { useState } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const PushNotification = props => {
    const [label, setLabel] = useState("");
    const _pushNotification = async () => {
        await props.pushNotificationMutation({
            variables: { label },
        });
        setLabel("");
    };

    return (
        <div>
            <input
                value={label}
                onChange={event => setLabel(event.target.value)}
                type="text"
                placeholder="A Label"
            />
            <button onClick={() => _pushNotification()}>Submit</button>
        </div>
    );
};

const POST_MUTATION = gql`
    mutation PushNotificationMutation($label: String!) {
        pushNotification(label: $label)
    }
`;

export default graphql(POST_MUTATION, { name: "pushNotificationMutation" })(
    PushNotification
);
