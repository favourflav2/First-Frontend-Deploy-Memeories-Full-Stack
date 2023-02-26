import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
const devEnv = process.env.NODE_ENV !== "production"
    const clientId = devEnv ? "405015865455-lvouovfp2e4tcqcqifqhoehegkga9184.apps.googleusercontent.com" : "405015865455-j0h8vc73hl9chpghi8h5dfo6lvm854ig.apps.googleusercontent.com"
    
    //production client id>    405015865455-j0h8vc73hl9chpghi8h5dfo6lvm854ig.apps.googleusercontent.com
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
