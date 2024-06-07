/** @format */

import {
	TypographyH6,
	TypographyP,
} from '@/components/ui/typography';
import CartItem from './_components/cart-item';
import useSession from '@/hooks/use-session.hook';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { checkoutOrder } from '@/services/user.service';
import Layout from '../_components/layout';
import { useToast } from '@/components/ui/use-toast';

export default function CartPage() {
	const { toast } = useToast();
	const { user, accessToken, update } = useSession();

	const subTotal = Math.round(
		user?.carts.reduce(
			(acc, cart) => acc + cart.book.price * cart.quantity,
			0
		) || 0
	);
	const discount = Math.round(
		user?.carts.reduce((acc, cart) => {
			if (cart.discount > 0) {
				return acc + (cart.discount * cart.book.price * cart.quantity) / 100;
			}
			return acc;
		}, 0) || 0
	);

	const checkout = () => {
		if (!accessToken) return;
		return checkoutOrder(accessToken).then((orders) => {
			toast({
				title: 'Success',
				duration: 3000,
				description: 'Checkout successfully',
				variant: 'success',
			});
			update({
				...user,
				orders,
			});
		}).catch(errr => {
			toast({
				title: 'Oh! Something went wrong!',
				duration: 3000,
				description: errr.message,
				variant: 'destructive',
			});
		});
		
	};

	return (
		<Layout>
			<div className="col-span-6 flex flex-col gap-4">
				{user?.carts.map((cart) => <CartItem key={cart.book.id} cart={cart} />)}
			</div>
			<div className="col-span-4">
				<Card className="border-none bg-muted">
					<CardHeader>
						<strong>Order Summary</strong>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col gap-2">
							<div className="flex justify-between">
								<TypographyP className="!my-0 text-sm">Sub total</TypographyP>
								<TypographyP className="!my-0 text-sm font-medium">
									{subTotal} $
								</TypographyP>
							</div>
							<div className="flex justify-between">
								<TypographyP className="!my-0 text-sm">Discount</TypographyP>
								<TypographyP className="!my-0 text-sm font-medium">
									{discount} $
								</TypographyP>
							</div>
							<div className="flex justify-between">
								<TypographyP className="!my-0 text-sm">Tax</TypographyP>
								<TypographyP className="!my-0 text-sm font-medium">0 $</TypographyP>
							</div>
							<div className="flex justify-between">
								<TypographyP className="!my-0 text-sm">Shipping</TypographyP>
								<TypographyH6 className="text-primary font-medium">
									Free
								</TypographyH6>
							</div>
							<div className="flex justify-between">
								<TypographyP className="!my-0 text-sm">Total</TypographyP>
								<TypographyH6 className="font-medium">
									{subTotal - discount} $
								</TypographyH6>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button className="!block w-full" onClick={checkout}>
							Checkout
						</Button>
					</CardFooter>
				</Card>
			</div>
		</Layout>
	);
}
