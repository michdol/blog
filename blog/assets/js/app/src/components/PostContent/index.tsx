import * as React from "react";
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AppState } from "store";
import { IPostContent } from "store/posts/reducer";
import Headline from "./Headline";
import { reorderPostContents } from 'store/posts/actions';


type TOwnProps = {
	idx: number;
};

const mapStateToProps = (state: AppState, ownProps: TOwnProps) => ({
	content: state.posts.post.contents[ownProps.idx],
	idx: ownProps.idx,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
	bindActionCreators(
	{
		reorderPostContents
	},
	dispatch
);

type TPostContentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export class PostContent extends React.Component<TPostContentProps, {}> {
	constructor(props: any) {
		super(props);
		this.moveContent = this.moveContent.bind(this);
		this.moveUp = this.moveUp.bind(this);
		this.moveDown = this.moveDown.bind(this);
	}

	moveContent(moveUp: boolean) {
		this.props.reorderPostContents(this.props.content.id, moveUp);
	}

	moveUp() {
		this.moveContent(true);
	}

	moveDown() {
		this.moveContent(false);
	}

	render() {
		let content = this.props.content;
		return (
			<div>
				<Headline content={content} />
				<a onClick={this.moveUp}>Move Up</a>
				<span> 〰 </span>
				<a onClick={this.moveDown}>Move Down</a>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContent);