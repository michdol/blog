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

type THeadlineEditProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export class HeadlineEdit extends React.Component<THeadlineEditProps, State> {
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
			<div className="content-headline text-center d-flex align-items-center">
				<div className="col-10">
					<input className="w-100" type="text" value={this.state.headline} onChange={this.updateHeadline} />
				</div>
				<div className="col-2">
					<button className="btn btn-primary w-100" onClick={this.saveChanges}>Save</button>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HeadlineEdit);
