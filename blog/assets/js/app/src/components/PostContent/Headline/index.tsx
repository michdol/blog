import * as React from "react";
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AppState } from "store";
import { setPostContentHeadline } from 'store/posts/actions';
import { IPostContent } from 'store/posts/reducer';


type Props = {
	content: IPostContent;
	onSave: any;
};

const mapStateToProps = (state: AppState, ownProps: Props) => ({
	content: ownProps.content,
	onSave: ownProps.onSave
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
	bindActionCreators(
	{
		setPostContentHeadline
	},
	dispatch
);

type State = {
	headline: string;
}

type THeadlineProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export class Headline extends React.Component<THeadlineProps, State> {
	constructor(props: any) {
		super(props);
		this.state = {
			headline: props.content.headline
		}
		this.updateHeadline = this.updateHeadline.bind(this);
		this.saveChanges = this.saveChanges.bind(this);
	}

	updateHeadline(e: any) {
		this.setState({headline: e.target.value})
	}

	saveChanges() {
		let content = this.props.content;
		content.headline = this.state.headline;
		this.props.setPostContentHeadline(content);
		this.props.onSave();
	}

	render() {
		return (
			<React.Fragment>
				<div className="row">
					<input type="text" value={this.state.headline} onChange={this.updateHeadline} />
				</div>
				<div className="row">
					<button onClick={this.saveChanges}>Save</button>
				</div>
			</React.Fragment>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Headline);