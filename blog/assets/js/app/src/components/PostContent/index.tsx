import * as React from "react";
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { EPostContentTypes, POST_CONTENT_TYPE_CHOICES } from "src/config";
import { AppState } from "store";
import { toggleEditActive } from 'store/ui/actions';
import { reorderPostContents, deletePostContent } from 'store/posts/actions';
import { IPostContent } from "store/posts/reducer";
import Headline from "./Headline";
import Text from "./Text";


type TOwnProps = {
	idx: number;
};

const mapStateToProps = (state: AppState, ownProps: TOwnProps) => ({
	content: state.posts.post.contents[ownProps.idx],
	idx: ownProps.idx,
	editActive: state.ui.editActive
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
	bindActionCreators(
	{
		reorderPostContents,
		deletePostContent,
		toggleEditActive
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
		this.closeEdit = this.closeEdit.bind(this);
		this.deleteContent = this.deleteContent.bind(this);
	}

	moveContent(moveUp: boolean) {
		if (!this.props.editActive) {
			this.props.reorderPostContents(this.props.content.id, moveUp);
		}
	}

	moveUp() {
		this.moveContent(true);
	}

	moveDown() {
		this.moveContent(false);
	}

	openEdit() {
		if (!this.props.editActive) {
			this.setState({editActive: true});
			this.props.toggleEditActive();
		}
	}

	closeEdit() {
		this.setState({editActive: false});
		this.props.toggleEditActive();
	}

	deleteContent() {
		if (!this.props.editActive) {
			this.props.deletePostContent(this.props.content);
		}
	}

	renderHeadline() {
		const content = this.props.content;
		return (
			<React.Fragment>
				{ this.state.editActive && <Headline content={content} onSave={this.closeEdit} /> }
				{ !this.state.editActive && <span onClick={this.openEdit}>{ content.headline }</span> }
			</React.Fragment>
		)
	}

	renderText() {
		const content = this.props.content;
		return (
			<React.Fragment>
				{ this.state.editActive && <Text content={content} onSave={this.closeEdit} /> }
				{ !this.state.editActive && <span onClick={this.openEdit}>{ content.text }</span> }
			</React.Fragment>
		)	
	}

	renderPostContentByType() {
		switch(this.props.content.type) {
			case EPostContentTypes.POST_CONTENT_TYPE_HEADLINE:
				return this.renderHeadline();
			case EPostContentTypes.POST_CONTENT_TYPE_TEXT:
				return this.renderText();
			default:
				return <div className="unknown-content-type">UNKOWN_CONTENT_TYPE</div>
		}
	}

	render() {
		return (
			<div>
				<div>
					<label>{ POST_CONTENT_TYPE_CHOICES[this.props.content.type] }</label>
				</div>
				<div>
					{ this.renderPostContentByType() }
				</div>
				<a onClick={this.moveUp}>Move Up</a>
				<span> 〰 </span>
				<a onClick={this.moveDown}>Move Down</a>
				<a onClick={this.deleteContent}>X</a>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContent);