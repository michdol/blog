import * as React from "react";
import { applyMiddleware, createStore } from "redux";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import logger from 'redux-logger';

import './index.scss';
import rootReducer from './store';
import EditContents from "./components/EditContents";


const store = createStore(
	rootReducer,
	applyMiddleware(logger)
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
