import * as React from "react";

import { IPostContent } from "store/posts/reducer";
import Headline from "./Headline";


type Props = {
	content: IPostContent
};


export default class PostContent extends React.Component<Props, {}> {
	render() {
		let content = this.props.content;
		return (
			<div>
				<Headline contentId={content.id} headline={content.headline} />
			</div>
		)
	}
}
