/** @format */

import Image from 'next/image';
import AppContainer from './app-container';

export default function AppFooter() {
	return (
		<footer className="h-24 bg-slate-200 relative">
			<AppContainer>
				<div className="flex gap-2 h-full items-center">
					<div className="h-16">
						<Image className="!static" src="/bookworm.svg" alt="Logo" fill />
					</div>
          <div>
            <h3 className='text-sm font-medium uppercase'>BookWorm</h3>
            <p className='text-xs font-normal'>Adress: 364 Cộng Hòa, Etown Tân Bình, HCM</p>
            <p className='text-xs font-normal'>Phone: 09999999</p>
          </div>
				</div>
			</AppContainer>
		</footer>
	);
}
