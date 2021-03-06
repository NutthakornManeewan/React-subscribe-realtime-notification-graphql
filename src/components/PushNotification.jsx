import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const POST_MUTATION = gql`
    mutation pushNotification($label: String!, $id: String) {
        pushNotification(label: $label, id: $id) {
            label
        }
    }
`;

const PushNotification = props => {
    const [label, setLabel] = useState("");
    const [postNoti, { data }] = useMutation(POST_MUTATION);

    const _pushNotification = async () => {
        postNoti({ variables: { label, id: "aek" } });
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

export default PushNotification;
