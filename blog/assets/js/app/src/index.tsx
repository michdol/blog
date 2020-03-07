import * as React from "react";
import * as ReactDOM from "react-dom";

import './index.scss';
import { Hello } from "./components/Hello";


const EditContentsDOM = document.getElementById("edit-contents");

if (EditContentsDOM) {
	ReactDOM.render(
		<Hello compiler="TypeScript" framework="React" />,
		EditContentsDOM
	);
}