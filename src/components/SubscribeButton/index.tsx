import { useSession, signin } from 'next-auth/client';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripsJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const [session] = useSession();
    const router = useRouter()

    async function handleSubscribe() {
        if (!session) {
            signin('github')
            return;
        }
        if (session.activeSubscription) {
            router.push('/posts');
            return;
        }

        try {
            const response = await api.post('/subscribe')
            const { sessionId } = response.data

            const stripe = await getStripsJs()

            await stripe.redirectToCheckout({ sessionId })
        } catch (err) {
            alert(err.message);
        }

    }

    return (
        <button
            type="button"
            onClick={handleSubscribe}
            className={styles.subscribeButton}>
            Subscribe now
        </button>
    )
}