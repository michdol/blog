import * as React from "react";
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AppState } from "store";
import { setPostContentHeadline } from 'store/posts/actions';
import { IPostContent } from 'store/posts/reducer';


type TOwnProps = {
	content: IPostContent;
	propertyName: string;
	onSave: any;
};

const mapStateToProps = (state: AppState, ownProps: TOwnProps) => ({
	content: ownProps.content,
	onSave: ownProps.onSave,
	propertyName: ownProps.propertyName
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
	bindActionCreators(
	{
		setPostContentHeadline
	},
	dispatch
);

type State = {
	value: string;
}

type TProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export class EditPostContentProperty extends React.Component<TProps, State> {
	constructor(props: any) {
		super(props);
		this.state = {
			value: props.content[props.propertyName]
		}
		this.updateValue = this.updateValue.bind(this);
		this.saveChanges = this.saveChanges.bind(this);
		this.cancelChanges = this.cancelChanges.bind(this);
	}

	updateValue(e: any) {
		this.setState({value: e.target.value})
	}

	saveChanges() {
		let content = this.props.content;
		//content[this.props.propertyName] = this.state.value;
		this.props.setPostContentHeadline(content);
		this.props.onSave();
	}

	cancelChanges() {
		this.props.onSave();
	}

	render() {
		return (
			<div>
				{/* parametized element type, css classes */}
				<textarea className="w-100 form-control" value={this.state.value} onChange={this.updateValue} />
				<button onClick={this.saveChanges}>Save</button>
				<button onClick={this.cancelChanges}>Cancel</button>
			</div>
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(EditPostContentProperty);