import * as React from 'react';


type THeadlineDisplayProps = {
	headline: string;
	openEdit: any;
};

const HeadlineDisplay = ({ headline, openEdit }: THeadlineDisplayProps) => {
	return (
		<div className="content-headline text-center d-flex align-items-center">
			<h3 className="font-weight-bold ml-3" onClick={openEdit}>
				{ headline }
			</h3>
		</div>
	)
}

export default HeadlineDisplay;
