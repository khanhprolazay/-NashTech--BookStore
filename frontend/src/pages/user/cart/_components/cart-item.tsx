/** @format */

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	TypographyMuted,
	TypographyP,
	TypographySmall,
} from '@/components/ui/typography';
import useSession from '@/hooks/use-session.hook';
import { ICart } from '@/interfaces/user.interface';
import { removeCart, updateCart } from '@/services/user.service';
import { TrashIcon } from 'lucide-react';
import Image from 'next/image';

type Props = {
	cart: ICart;
};

export default function CartItem({ cart }: Props) {
	const { accessToken, user, update } = useSession();
	const total = Math.round(
		((cart.book.price * (100 - cart.discount)) / 100) * cart.quantity
	);

	const updateQuantity = async (quantity: number) => {
		if (!user || !accessToken) {
			return;
		}

		if (quantity < 1) {
			return;
		}

		const carts = await updateCart(accessToken, {
			bookId: cart.book.id,
			quantity,
		});

		update({
			...user,
			carts,
		});
	};

	const handleDelete = async () => {
		if (!accessToken) return;
		const carts = await removeCart(accessToken, cart.book.id);
		update({
			...user,
			carts,
		});
	};

	return (
		<Card className="shadow-none border-none">
			<CardContent className="p-2 flex flex-col">
				<div className="flex">
						<img
							className="w-20 rounded"
							src={cart.book.mainImage}
							alt={cart.book.title}
						/>
					<div className="flex flex-col gap-2 w-full pl-4">
						<TypographyP className="font-normal">
							<strong>{cart.book.title.split('(')[0]}</strong>
						</TypographyP>
						<div className="flex gap-2 justify-between items-end">
							<TypographyMuted className="text-sm">Price </TypographyMuted>
							<p className="text-sm font-normal">{cart.book.price}$</p>
						</div>
						<div className="flex gap-2 justify-between">
							{cart.discount > 0 && (
								<>
									<TypographyMuted className="text-sm">
										Discount{' '}
									</TypographyMuted>
									<p className="text-sm font-normal">{cart.discount}%</p>
								</>
							)}
						</div>
						<div className="flex gap-2 justify-between">
							<TypographyMuted className="text-sm">Total </TypographyMuted>
							<p className="text-sm font-normal">{total}$</p>
						</div>
					</div>
				</div>

				<Separator className="my-4" />
				<div className="flex justify-between">
					<div className="flex gap-2 items-center">
						<Button
							size="icon"
							variant="outline"
							onClick={() => updateQuantity(cart.quantity - 1)}>
							-
						</Button>
						<TypographySmall className="text-base">
							{cart.quantity}
						</TypographySmall>
						<Button
							size="icon"
							variant="outline"
							onClick={() => updateQuantity(cart.quantity + 1)}>
							+
						</Button>
					</div>
					<Button
						variant="outline"
						size="icon"
						onClick={handleDelete}
						className="border-destructive text-destructive hover:text-destructive">
						<TrashIcon className=" w-3 h-3" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
