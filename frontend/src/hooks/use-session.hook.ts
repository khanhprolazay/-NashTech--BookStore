/** @format */

import { useSession as useNextSession } from 'next-auth/react';

import 'next-auth';
import { ICart, IOrder } from '@/interfaces/user.interface';

declare module 'next-auth' {
	interface Session {
		accessToken: string; // Or string
		user: {
			name?: string;
			email?: string;
			image?: string;
			carts: ICart[];
			orders: IOrder[];
		};
	}
}

const useSession = () => {
	const session = useNextSession();
	const update = session.update;
	const user = session.data?.user;
	const accessToken = session.data?.accessToken;

	return { user, accessToken, session, update };
};

export default useSession;
