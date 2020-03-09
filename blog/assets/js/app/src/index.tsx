import * as React from "react";
import { createStore } from "redux";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import './index.scss';
import rootReducer from './store';
import Hello from "./components/Hello";
import EditContents from "./components/EditContents";


const store = createStore(
	rootReducer
);

const EditContentsDOM = document.getElementById("edit-contents");

if (EditContentsDOM) {
	ReactDOM.render(
		<Provider store={store}>
			<EditContents />
		</Provider>,
		EditContentsDOM
	);
}
