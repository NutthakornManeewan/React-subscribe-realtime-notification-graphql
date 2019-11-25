import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const ENDPOINT = "172.30.53.42:5000";

const httpLink = new HttpLink({ uri: `http://${ENDPOINT}/graphql` });
const wsLink = new WebSocketLink({
    uri: `ws://${ENDPOINT}/graphql`,
    options: { reconnect: true },
});
const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);

serviceWorker.unregister();
