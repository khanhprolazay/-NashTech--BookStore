/** @format */

import Image from 'next/image';
import AppContainer from './app-container';

export default function AppFooter() {
	return (
		<footer className="w-full bg-slate-200 p-8">
			<AppContainer>
				<div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between">
					<div className="w-10">
						<Image src="/bookworm.svg" alt="logo-ct" className="!static" fill />
					</div>
					<ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
						<li>
							<a
								href="#"
								className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500">
								About Us
							</a>
						</li>
						<li>
							<a
								href="#"
								color="blue-gray"
								className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500">
								License
							</a>
						</li>
						<li>
							<a
								href="#"
								color="blue-gray"
								className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500">
								Contribute
							</a>
						</li>
						<li>
							<a
								href="#"
								color="blue-gray"
								className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500">
								Contact Us
							</a>
						</li>
					</ul>
				</div>
				<hr className="my-8 border-blue-gray-50" />
				<p color="blue-gray" className="text-center font-normal">
					&copy; 2024 BookWorm
				</p>
			</AppContainer>
		</footer>
	);
}
