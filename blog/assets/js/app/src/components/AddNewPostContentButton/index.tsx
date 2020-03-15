import * as React from "react";
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AppState } from "store";
import { addPostContent } from "store/posts/actions";
import { IPostContent } from "store/posts/reducer";


type TOwnProps = {
	idx: number;
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

type TAddNewPostContentButtonProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class AddNewPostContentButton extends React.Component<TAddNewPostContentButtonProps, {}> {
	constructor(props: TAddNewPostContentButtonProps) {
		super(props);
		this.addNewContent = this.addNewContent.bind(this);
	}

	addNewContent() {
		if (!this.props.editActive) {
			this.props.addPostContent(this.props.idx);
		}
	}

	render() {
		return (
			<div>
				<a onClick={this.addNewContent}>Add new contents</a>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPostContentButton);