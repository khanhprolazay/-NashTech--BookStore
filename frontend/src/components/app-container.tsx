/** @format */

import { ReactNode } from 'react';
import { cn } from '../lib/utils';
import { ClassValue } from 'clsx';

interface ComponentProps {
	className?: ClassValue;
	children: ReactNode;
	containerProps?: {
		className: ClassValue;
	};
}

export default function AppContainer(props: ComponentProps) {
	return (
		<div
			className={cn(
				props.containerProps?.className,
				'container mx-auto xl:max-w-7xl h-full'
			)}>
			<div className={cn(props.className, 'mx-4 h-full')}>{props.children}</div>
		</div>
	);
}
