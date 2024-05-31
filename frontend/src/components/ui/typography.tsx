/** @format */

import { PropsWithChildrenAndClassname } from '@/interface/props.interface';
import { cn } from '@/lib/utils';

export function TypographyH1(props: PropsWithChildrenAndClassname) {
	return (
		<h1
			className={cn(
				'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
				props.className
			)}>
			{props.children}
		</h1>
	);
}

export function TypographyH2(props: PropsWithChildrenAndClassname) {
	return (
		<h2
			className={cn(
				'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
				props.className
			)}>
			{props.children}
		</h2>
	);
}

export function TypographyH3(props: PropsWithChildrenAndClassname) {
	return (
		<h3
			className={cn(
				'scroll-m-20 text-2xl font-semibold tracking-tight',
				props.className
			)}>
			{props.children}
		</h3>
	);
}

export function TypographyH4(props: PropsWithChildrenAndClassname) {
	return (
		<h4
			className={cn(
				'scroll-m-20 text-xl font-semibold tracking-tight',
				props.className
			)}>
			{props.children}
		</h4>
	);
}

export function TypographyH5(props: PropsWithChildrenAndClassname) {
	return (
		<h5
			className={cn(
				'scroll-m-20 text-lg font-semibold tracking-tight',
				props.className
			)}>
			{props.children}
		</h5>
	);
}

export function TypographyH6(props: PropsWithChildrenAndClassname) {
	return (
		<h6
			className={cn(
				'scroll-m-20 text-base font-semibold tracking-tight',
				props.className
			)}>
			{props.children}
		</h6>
	);
}

export function TypographyP(props: PropsWithChildrenAndClassname) {
	return (
		<p className={cn('leading-7 [&:not(:first-child)]:mt-6', props.className)}>
			{props.children}
		</p>
	);
}

export function TypographyBlockquote(props: PropsWithChildrenAndClassname) {
	return (
		<blockquote className={cn('mt-6 border-l-2 pl-6 italic', props.className)}>
			{props.children}
		</blockquote>
	);
}

export function TypographyLead(props: PropsWithChildrenAndClassname) {
	return (
		<p className={cn('text-xl text-muted-foreground', props.className)}>
			{props.children}
		</p>
	);
}

export function TypographySmall(props: PropsWithChildrenAndClassname) {
	return (
		<small className={cn('text-sm font-medium leading-none', props.className)}>
			{props.children}
		</small>
	);
}

export function TypographyMuted(props: PropsWithChildrenAndClassname) {
  return (
    <p className={cn("text-sm text-muted-foreground", props.className)}>
			{props.children}
		</p>
  )
}
