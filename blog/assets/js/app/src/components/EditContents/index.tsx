import * as React from "react";
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AppState } from "store";
import { IPostContent } from "store/posts/reducer";
import { getPost } from 'store/posts/actions';
import PostContent from "components/PostContent";
import AddNewPostContent from "components/AddNewPostContent";
import PostsService from 'src/services/posts';


const mapStateToProps = (state: AppState) => ({
	post: state.posts.post,
	postLoaded: state.posts.postLoaded,
	deletedContents: state.posts.deletedContents,
	isContentSaved: state.posts.isContentSaved,
	editActive: state.ui.editActive
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
	bindActionCreators(
	{
		getPost
	},
	dispatch
);

type TEditContentsProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class EditContents extends React.Component<TEditContentsProps, {}> {
	private submitButton: any;
	private postsService: any;

	constructor(props: TEditContentsProps) {
		super(props);
		this.postsService = new PostsService();
		this.djangoSubmitButtonListener = this.djangoSubmitButtonListener.bind(this);
		this.updatePostContents = this.updatePostContents.bind(this);
		this.onSuccess = this.onSuccess.bind(this);
		this.submitButton = document.getElementsByName('_save')[0];
	}

	componentDidMount() {
		this.props.getPost();
		if (this.submitButton !== undefined) {
			this.submitButton.addEventListener("click", this.djangoSubmitButtonListener);
		}
		window.onbeforeunload = function() {
			if (!this.props.isContentSaved) {
				return "";
			}
		}.bind(this);
	}

	componentWillUnmount() {
		if (this.submitButton !== undefined) {
			this.submitButton.removeEventListener("click", this.djangoSubmitButtonListener);
		}
	}

	djangoSubmitButtonListener(e: any) {
		this.handleClick();
	}

	handleClick() {
	}

	renderPostContents(contents: any[]) {
		return contents.map((content, idx) => {
			return <li className="mb-5" key={idx}>
				<PostContent idx={idx} />
				<AddNewPostContent idx={idx + 1} />
			</li>
		})
	}

	updatePostContents() {
		if (!this.props.editActive) {
			this.postsService.updatePostContents(this.props.post, this.props.deletedContents, this.onSuccess);
		}
	}

	onSuccess(response: any) {
		// Syncronize data
		this.props.getPost(response.data);
	}

	render() {
		const { post, postLoaded } = this.props;
		if (!postLoaded) {
			return null
		}
		return (
			<div className="container">
				<div className="row mb-5 post-button">
					<a className="btn btn btn-primary btn-lg text-white w-20" onClick={this.updatePostContents}>Post</a>
				</div>
				<div className="row">
					<ul className="w-100">
						{ this.renderPostContents(post.contents) }
					</ul>
				</div>
				<div className="row pb-5">
					<AddNewPostContent idx={-1} />
				</div>
				<div className="row mb-5 post-button">
					<a className="btn btn btn-primary btn-lg text-white w-20" onClick={this.updatePostContents}>Post</a>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContents);