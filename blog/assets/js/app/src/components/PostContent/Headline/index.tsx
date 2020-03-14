import * as React from "react";
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AppState } from "store";
import { setPostContentHeadline } from 'store/posts/actions';

import { IPostContent } from 'store/posts/reducer';


type Props = {
	content: IPostContent;
};

const mapStateToProps = (state: AppState, ownProps: Props) => ({
	content: ownProps.content
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
	bindActionCreators(
	{
		setPostContentHeadline
	},
	dispatch
);

type State = {
	editActive: boolean;
	headline: string;
}

type THeadlineProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export class Headline extends React.Component<THeadlineProps, State> {
	constructor(props: any) {
		super(props);
		this.state = {
			editActive: false,
			headline: props.content.headline
		}
		this.updateHeadline = this.updateHeadline.bind(this);
		this.saveChanges = this.saveChanges.bind(this);
		this.openEdit = this.openEdit.bind(this);
	}

	updateHeadline(e: any) {
		this.setState({headline: e.target.value})
	}

	saveChanges() {
		let content = this.props.content;
		content.headline = this.state.headline;
		this.props.setPostContentHeadline(content);
		this.setState({editActive: false});
	}

	openEdit() {
		this.setState({editActive: true});
	}

	render() {
		if (this.state.editActive) {
			return (
				<div>
					<input type="text" value={this.state.headline} onChange={this.updateHeadline} />
					<button onClick={this.saveChanges}>Save</button>
				</div>
			)
		}
		return (
			<div onClick={this.openEdit}><pre>{ this.props.content.headline }</pre></div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Headline);