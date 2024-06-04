/** @format */

'use client';

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { TypographyH5, TypographyH6 } from '@/components/ui/typography';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import useSession from '@/hooks/use-session.hook';
import { signIn } from 'next-auth/react';
import { ToastAction } from '@/components/ui/toast';

const FormSchema = z.object({
	title: z.string().min(3).max(100),
	description: z.string().min(3).max(1000),
	rating: z.string().min(1).max(5),
});

export default function ReviewForm() {
	const { toast } = useToast();
	const { user, accessToken } = useSession();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			title: '',
			description: '',
			rating: '5',
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		if (!user || !accessToken) {
			return toast({
				title: 'Login required!',
				duration: 5000,
				description: 'You need to login to add to cart',
				variant: 'infor',
				action: (
					<ToastAction altText="Try again" onClick={() => signIn('keycloak')}>
						Go to Login
					</ToastAction>
				),
			});
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Card>
					<CardHeader className="py-4 border-b">
						<TypographyH6>Write a Review</TypographyH6>
					</CardHeader>
					<CardContent>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem className="pt-4">
									<FormLabel className="font-normal">Add a title</FormLabel>
									<FormControl>
										<Input placeholder="Title" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem className="pt-6">
									<FormLabel className="font-normal">
										Details please! Your review helps other shoppers.
									</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Your description goes here"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="rating"
							render={({ field }) => (
								<FormItem className="pt-6">
									<FormLabel className="font-normal">
										Select a rating start
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>1</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="1">1</SelectItem>
											<SelectItem value="2">2</SelectItem>
											<SelectItem value="3">3</SelectItem>
											<SelectItem value="4">4</SelectItem>
											<SelectItem value="5">5</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter className="py-4 border-t">
						<Button type="submit" className="w-full">
							Submit
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
}
