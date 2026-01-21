import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { SetContextLink } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { createTheme, ThemeProvider } from "@mui/material";

const authLink = new SetContextLink(({ headers }) => {
  const token = localStorage.getItem("library-user-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const httpLink = new HttpLink({ uri: "http://localhost:4000" });

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000",
  }),
);

const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          h5: "h5",
          h6: "h6",
          subtitle1: "p",
          subtitle2: "p",
          body1: "p",
          body2: "p",
        },
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#8d6679ff",
    },
    secondary: {
      main: "#2a684fff",
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </StrictMode>,
);
