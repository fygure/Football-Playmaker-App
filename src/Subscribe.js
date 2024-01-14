import { loadStripe } from "@stripe/stripe-js";

function Subscribe() {

    const handleClick = async (event) => {
        try {
            //TODO: replace with prod publishable key (exposure is ok)
            const stripe = await loadStripe('pk_test_51OOkwQDtAjmN4bYix4tQvdc1IAmSIhnGIhbk4CLw6TAzFKClu9n7yi1UeHiHSWrUCBc8nZJfjEAq4xGTbYZJ28I900lnw9MSVY');
            const { error } = await stripe.redirectToCheckout({
                lineItems: [{
                    //TODO: replace with prod price key
                    price: 'price_1OYDuNDtAjmN4bYiLe9mRSxo',
                    quantity: 1,
                }],
                mode: 'subscription',
                successUrl: 'http://localhost:3000/test',
                cancelUrl: 'http://localhost:3000/cancel',
            });
        } catch (err) {
            console.log('error occured while trying to subscribe', err);
        }

    }

    return (
        <div>
            <button onClick={handleClick}>Get Access</button>
        </div>
    )
}


export default Subscribe;