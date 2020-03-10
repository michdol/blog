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

	render() {
		const { post, postLoaded } = this.props;
		if (!postLoaded) {
			return null
		}
		console.log(post.contents);
		return (
			<div>
				<ul>
					{ post.contents.map((content: IPostContent, idx: number) => <li key={idx}><PostContent content={content} /></li>)}
				</ul>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContents);