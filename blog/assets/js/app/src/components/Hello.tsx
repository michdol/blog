import * as React from "react";
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AppState } from "store";
import { getPosts } from 'store/posts/actions';


const mapStateToProps = (state: AppState) => ({
	posts: state.posts.posts,
	postsLoaded: state.posts.postsLoaded,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
	bindActionCreators(
	{
		getPosts
	},
	dispatch
);

type THelloProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;


export class Hello extends React.PureComponent<THelloProps, {}> {
	componentDidMount() {
		this.props.getPosts();
	}

	render() {
		const { posts, postsLoaded } = this.props;
		return (
			<div>
				<h1>Hello!</h1>
				<ul>
					{ posts.map(post => <li key={post.id}>{post.title}</li>) }
				</ul>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);