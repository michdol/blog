import * as React from "react";
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AppState } from "store";
import { IPostContent } from "store/posts/reducer";
import { getPost } from 'store/posts/actions';
import PostContent from "components/PostContent";
import PostsService from 'src/services/posts';


const mapStateToProps = (state: AppState) => ({
	post: state.posts.post,
	postLoaded: state.posts.postLoaded,
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
		// TODO: search if there is better way to find that element
		this.submitButton = document.getElementsByName('_save')[0];
	}

	componentDidMount() {
		this.props.getPost();
		this.submitButton.addEventListener("click", this.djangoSubmitButtonListener);
	}

	componentWillUnmount() {
		this.submitButton.removeEventListener("click", this.djangoSubmitButtonListener);
	}

	djangoSubmitButtonListener(e: any) {
		console.log('tutej', e);
		this.handleClick();
	}

	handleClick() {
	}

	renderPostContents(contents: any[]) {
		return contents.map((content, idx) => {
			return <li key={idx}>
				<PostContent idx={idx} />
			</li>
		})
	}

	updatePostContents() {
		this.postsService.updatePostContents(this.props.post);
	}

	render() {
		const { post, postLoaded } = this.props;
		if (!postLoaded) {
			return null
		}
		return (
			<div>
				<ul>
					{ this.renderPostContents(post.contents) }
				</ul>
				<a onClick={this.updatePostContents}>Post</a>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContents);