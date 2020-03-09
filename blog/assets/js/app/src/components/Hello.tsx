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
		const contents = posts.length ? posts[0].contents : [];
		return (
			<div>
				<h1>Hello!</h1>
				<ul>
					{ contents.map(content => <li key={content.id}>{content.headline}</li>) }
				</ul>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);