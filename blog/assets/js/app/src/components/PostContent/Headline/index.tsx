import * as React from "react";
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AppState } from "store";
import { setPostContentHeadline } from 'store/posts/actions';


type Props = {
	contentId: number;
	headline: string;
};

const mapStateToProps = (state: AppState, ownProps: Props) => ({
	contentId: ownProps.contentId
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
			headline: props.headline
		}
		this.updateHeadline = this.updateHeadline.bind(this);
		this.saveChanges = this.saveChanges.bind(this);
		this.openEdit = this.openEdit.bind(this);
	}

	updateHeadline(e: any) {
		this.setState({headline: e.target.value})
	}

	saveChanges() {
		this.props.setPostContentHeadline(this.props.contentId, this.state.headline);
		this.setState({editActive: false});
	}

	openEdit() {
		this.setState({editActive: true});
	}

	render() {
		const { headline } = this.state;
		if (this.state.editActive) {
			return (
				<div>
					<input type="text" value={this.state.headline} onChange={this.updateHeadline} />
					<button onClick={this.saveChanges}>Save</button>
				</div>
			)
		}
		return (
			<div onClick={this.openEdit}><pre>{ headline }</pre></div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Headline);