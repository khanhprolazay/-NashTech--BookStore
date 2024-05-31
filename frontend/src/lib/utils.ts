/** @format */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function transformQueryValueToArray(
	value: string | string[] | undefined,
	seperator = ','
) {
	if (!value) return [];

	if (typeof value === 'string') {
		return value.toLowerCase().split(seperator);
	}

	let result: string[] = [];
	value.forEach((v) => {
		result = result.concat(v.toLowerCase().split(seperator));
	});
	return result;
}
