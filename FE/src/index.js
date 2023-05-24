import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(reducer, composeWithDevTools());

root.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>
);
