import * as React from "react";


type Props = {
	headline: string;
};

export default class Headline extends React.Component<Props, {}> {
	render() {
		const { headline } = this.props;
		return (
			<div>{ headline }</div>
		)
	}
}
