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

type TState = {
	editActive: boolean;
}

type TPostContentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export class PostContent extends React.Component<TPostContentProps, TState> {
	constructor(props: any) {
		super(props);
		this.state = {
			editActive: false
		}
		this.moveContent = this.moveContent.bind(this);
		this.moveUp = this.moveUp.bind(this);
		this.moveDown = this.moveDown.bind(this);
		this.openEdit = this.openEdit.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
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

	openEdit() {
		this.setState({editActive: true});
	}

	toggleEdit() {
		this.setState({editActive: !this.state.editActive});
	}

	render() {
		let content = this.props.content;
		return (
			<div>
				{ this.state.editActive && <Headline content={content} onSave={this.toggleEdit} /> }
				{ !this.state.editActive && <span onClick={this.toggleEdit}>{ content.headline }</span> }
				<a onClick={this.moveUp}>Move Up</a>
				<span> 〰 </span>
				<a onClick={this.moveDown}>Move Down</a>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContent);