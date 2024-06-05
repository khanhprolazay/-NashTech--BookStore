/** @format */

import AppContainer from '@/components/app-container';
import { useEffect, useState } from 'react';

function decodedHtml(html: string) {
	const txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
}

export default function About() {
	const [content, setContent] = useState('');

	useEffect(() => {
		fetch('http://obis-local.bagiit.vn:5000/admin/about/content', {
			cache: 'no-cache',
		})
			.then((response) => response.text())
			.then((data) => {
				const decoded = decodedHtml(data);
				setContent(decoded);
			});
	}, []);

	return (
		<AppContainer>
			<div className="flex justify-around">
				<div
					className="w-2/3"
					dangerouslySetInnerHTML={{ __html: content }}></div>
			</div>
		</AppContainer>
	);
}
