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
	text: string;
}

type TTextProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export class Text extends React.Component<TTextProps, State> {
	constructor(props: any) {
		super(props);
		this.state = {
			text: props.content.text
		}
		this.updateText = this.updateText.bind(this);
		this.saveChanges = this.saveChanges.bind(this);
	}

	updateText(e: any) {
		this.setState({text: e.target.value})
	}

	saveChanges() {
		let content = this.props.content;
		content.text = this.state.text;
		this.props.setPostContentHeadline(content);
		this.props.onSave();
	}

	render() {
		return (
			<div>
				<textarea value={this.state.text} onChange={this.updateText} />
				<button onClick={this.saveChanges}>Save</button>
			</div>
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Text);