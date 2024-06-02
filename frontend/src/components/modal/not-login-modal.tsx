/** @format */

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from 'next-auth/react';

type Props = {
	open: boolean;
	handleOpen: any;
};

export default function NotLoginModal(props: Props) {
	return (
		<Dialog open={props.open} onOpenChange={props.handleOpen}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Login required</DialogTitle>
					<DialogDescription>
						You need to be logged in to perform this action
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Stay in</Button>
					</DialogClose>
					<Button onClick={() => signIn('keycloak')}>Go to login</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
