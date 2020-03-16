import * as React from "react";
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { EPostContentTypes, POST_CONTENT_TYPE_CHOICES } from "src/constants";
import { AppState } from "store";
import { toggleEditActive } from 'store/ui/actions';
import { reorderPostContents, deletePostContent } from 'store/posts/actions';
import { IPostContent } from "store/posts/reducer";
import HeadlineDisplay from "./HeadlineDisplay";
import HeadlineEdit from "./HeadlineEdit";
import Text from "./Text";


type TOwnProps = {
	idx: number;
};

type TOwnState = {
	editActive: boolean;
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

type TPostContentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export class PostContent extends React.Component<TPostContentProps, TOwnState> {
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
		if (this.state.editActive) {
			return <HeadlineEdit content={content} onSave={this.closeEdit} /> 
		}
		return <HeadlineDisplay headline={content.headline} openEdit={this.openEdit} />
	}

	renderText() {
		const content = this.props.content;
		return (
			<div className="container content-text">
				{ this.state.editActive && <Text content={content} onSave={this.closeEdit} /> }
				{ !this.state.editActive && <span onClick={this.openEdit}>{ content.text }</span> }
			</div>
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
		const content = this.props.content;
		return (
			<div className="container post-content">
				<div className="col-10">
					<div className="row rendered-content">
						{ this.renderPostContentByType() }
					</div>
					<div className="row content-buttons pt-3 pb-3">
						<div className="col-8">
							<div className="row">
								<a className="btn btn-outline-primary mr-2" onClick={this.moveUp}>Move Up</a>
								<a className="btn btn-outline-primary" onClick={this.moveDown}>Move Down</a>
							</div>
						</div>
						<div className="col-4">
							<a className="btn btn-danger text-white float-right" onClick={this.deleteContent}>DELETE</a>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContent);