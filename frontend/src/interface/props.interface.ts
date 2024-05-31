/** @format */

import { PropsWithChildren } from 'react';

export type PropsWithClassname = {
	className?: string;
};

export type PropsWithChildrenAndClassname = PropsWithChildren &
	PropsWithClassname;
