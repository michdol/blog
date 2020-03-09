import * as React from "react";

import { IPostContent } from "store/posts/reducer";
import Headline from "./Headline";


type Props = {
	content: IPostContent
};


export default class PostContent extends React.Component<Props, {}> {
	render() {
		return (
			<div>
				<Headline headline={this.props.content.headline} />
			</div>
		)
	}
}
