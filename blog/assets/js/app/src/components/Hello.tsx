/*
import * as React from "react";
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AppState } from "store";
import { getPost } from 'store/posts/actions';


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

type THelloProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;


export class Hello extends React.PureComponent<THelloProps, {}> {
	componentDidMount() {
		this.props.getPost();
	}

	render() {
		const { post, postLoaded } = this.props;
		const contents = postLoaded ? post.contents : [];
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

export default connect(mapStateToProps, mapDispatchToProps)(Hello);*/