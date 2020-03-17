import * as React from "react";
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { EPostContentTypes } from "src/constants";
import { AppState } from "store";
import { addPostContent } from "store/posts/actions";
import { IPostContent, INewPostContentData } from "store/posts/reducer";


type TOwnProps = {
	idx: number;
}

type TOwnState = {
	hovering: boolean;
}

const mapStateToProps = (state: AppState, ownProps: TOwnProps) => ({
	post: state.posts.post,
	idx: ownProps.idx,
	editActive: state.ui.editActive
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
	bindActionCreators(
	{
		addPostContent
	},
	dispatch
);

type TAddNewPostContentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class AddNewPostContent extends React.Component<TAddNewPostContentProps, TOwnState> {
	constructor(props: TAddNewPostContentProps) {
		super(props);
		this.state = {
			hovering: false
		};
		this.addNewContent = this.addNewContent.bind(this);
		this.addHeadline = this.addHeadline.bind(this);
		this.addText = this.addText.bind(this);
	}

	addNewContent(data: any) {
		let newContentData: INewPostContentData = Object.assign({
			order: this.props.idx,
		}, data);
		if (!this.props.editActive) {
			this.props.addPostContent(newContentData);
		}
	}

	addHeadline() {
		let data = {
			headline: "Headline",
			type: EPostContentTypes.POST_CONTENT_TYPE_HEADLINE
		};
		this.addNewContent(data);
	}

	addText() {
		let data = {
			text: "Text",
			type: EPostContentTypes.POST_CONTENT_TYPE_TEXT
		};
		this.addNewContent(data);
	}

	render() {
		return (
			<div className="hover">
				<div className="hover__no-hover col-5 btn btn-light">
					Add content
				</div>
				<div className="hover__hover col-6">
					<a className="btn btn-light" onClick={this.addHeadline}>Headline</a>
					<a className="btn btn-light" onClick={this.addText}>Text</a>
					<a className="btn btn-light">Image</a>
					<a className="btn btn-light">Video</a>
					<a className="btn btn-light">Code</a>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPostContent);