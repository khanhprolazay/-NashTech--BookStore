/** @format */

import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { IAuthor, ICategory } from '@/interfaces/book.interface';
import { transformQueryValueToArray } from '@/lib/utils';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
	data: ICategory[] | IAuthor[];
	name: string;
	description: string;
};

export default function FilterForm(props: Props) {
	const router = useRouter();
	const currentValues = transformQueryValueToArray(
		router.query[props.name.toLowerCase()]
	);

	const handleCheckboxChange = (slug: string, checked: boolean) => {
		let newValues = [...currentValues];

		if (checked) {
			newValues.push(slug);
		} else {
			newValues = newValues.filter((value) => value !== slug);
		}

		const newQuery = { ...router.query };
		delete newQuery.page;

		if (newValues.length > 0) {
			newQuery[props.name.toLowerCase()] = newValues.join(',');
		} else {
			delete newQuery[props.name.toLowerCase()];
		}

		router.push({
			pathname: router.pathname,
			query: newQuery,
		});
	};

	return (
		<Card>
			<CardContent className="p-4">
				<div className="mb-4">
					<label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize">
						{props.name}
					</label>
					<p className="text-[0.8rem] text-muted-foreground">
						{props.description}
					</p>
				</div>
				<div className="flex flex-col gap-2">
					{props.data.map((item) => (
						<div
							key={item.slug}
							className="flex flex-row items-start space-x-3 space-y-0">
							<Checkbox
								checked={currentValues.includes(item.slug)}
								onCheckedChange={(e) =>
									handleCheckboxChange(item.slug, e.valueOf() as boolean)
								}
								id={item.slug}
							/>
							<label
								htmlFor={item.slug}
								className="font-normal text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize">
								{item.name}
							</label>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
