import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightEighties } from 'react-syntax-highlighter/styles/hljs';

const Highlighter = ({ codeString }) => {
	return (
		<SyntaxHighlighter language="javascript" style={tomorrowNightEighties}>
			{codeString}
		</SyntaxHighlighter>
	);
};

export default Highlighter;
