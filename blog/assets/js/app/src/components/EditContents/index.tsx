import * as React from "react";
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AppState } from "store";
import { IPostContent } from "store/posts/reducer";
import { getPost } from 'store/posts/actions';
import PostContent from "components/PostContent";


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
	componentDidMount() {
		this.props.getPost();
	}

	renderPostContents(contents: any[]) {
		return contents.map((content, idx) => {
			return <li key={idx}>
				<PostContent content={content} />
			</li>
		})
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
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContents);