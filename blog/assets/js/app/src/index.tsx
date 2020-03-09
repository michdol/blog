import * as React from "react";
import { createStore } from "redux";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import './index.scss';
import rootReducer from './store';
import Hello from "./components/Hello";


const store = createStore(
	rootReducer
);

const EditContentsDOM = document.getElementById("edit-contents");

if (EditContentsDOM) {
	ReactDOM.render(
		<Provider store={store}>
			<Hello />
		</Provider>,
		EditContentsDOM
	);
}
