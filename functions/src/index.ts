import * as functions from "firebase-functions";
import Stripe from 'stripe';
import * as admin from "firebase-admin";


const stripe = new Stripe(functions.config().stripe.secret, {
    apiVersion: "2020-08-27",
});
  
admin.initializeApp();

async function createStripeProduct (product: Stripe.ProductCreateParams){
    const prod = await stripe.products.create(product);
    return prod;
}

async function createStripePrice (price: Stripe.PriceCreateParams){
    const prce = await stripe.prices.create(price);
    return prce;
}

export const stripeProduct = functions.https.onCall( async (data, context) => {
    if(context.auth?.uid !== 'AlMOK7JryjMlmS6XxWIqGc1sH6f1'){
        return { message: 'Not Authorized' };
    }
    const { id } = await createStripeProduct({
        name: data.product.name,
        description: data.product.description,
        images: [ data.product.image[0] ],
    });

    const cadPrice = await createStripePrice({
        currency: 'cad',
        product: id,
        unit_amount: data.amounts.first_amount_cad,
        nickname: data.product.name,
    });
    const usdPrice = await createStripePrice({
        currency: 'usd',
        product: id,
        unit_amount: data.amounts.first_amount_usd,
        nickname: data.product.name,
    });

    if(data.product.wholesale){
        const cadPrice_second = await createStripePrice({
            currency: 'cad',
            product: id,
            unit_amount: data.amounts.second_amount_cad,
            nickname: data.product.name,
        });
        const cadPrice_third = await createStripePrice({
            currency: 'cad',
            product: id,
            unit_amount: data.amounts.third_amount_cad,
            nickname: data.product.name,
        });
        const cadPrice_fourth = await createStripePrice({
            currency: 'cad',
            product: id,
            unit_amount: data.amounts.fourth_amount_cad,
            nickname: data.product.name,
        });
        const usdPrice_second = await createStripePrice({
            currency: 'usd',
            product: id,
            unit_amount: data.amounts.second_amount_usd,
            nickname: data.product.name,
        });
        const usdPrice_third = await createStripePrice({
            currency: 'usd',
            product: id,
            unit_amount: data.amounts.third_amount_usd,
            nickname: data.product.name,
        });
        const usdPrice_fourth = await createStripePrice({
            currency: 'usd',
            product: id,
            unit_amount: data.amounts.fourth_amount_usd,
            nickname: data.product.name,
        });
        const docRef = admin.firestore().collection('products').doc();
        const doc = await docRef.set({
            name: data.product.name,
            categories: data.product.categories,
            color: data.product.color,
            description: data.product.description,
            wholesale: data.product.wholesale,
            image: data.product.image,
            slug: data.product.slug,
            cad: data.amounts.first_amount_cad,
            usd: data.amounts.first_amount_usd,
            secondCad: data.amounts.second_amount_cad,
            secondUsd: data.amounts.second_amount_usd,
            thirdCad: data.amounts.third_amount_cad,
            thirdUsd: data.amounts.third_amount_usd,
            fourthCad: data.amounts.fourth_amount_cad,
            fourthUsd: data.amounts.fourth_amount_usd,
            price_cad: cadPrice.id,
            price_usd: usdPrice.id,
            price_secondCad: cadPrice_second.id,
            price_secondUsd: usdPrice_second.id,
            price_thirdCad: cadPrice_third.id,
            price_thirdUsd: usdPrice_third.id,
            price_fourthCad: cadPrice_fourth.id,
            price_fourthUsd: usdPrice_fourth.id,
        });
        return doc;
    }

    const docRef = admin.firestore().collection('products').doc();
    const doc = await docRef.set({
        name: data.product.name,
        categories: data.product.categories,
        color: data.product.color,
        description: data.product.description,
        wholesale: data.product.wholesale,
        image: data.product.image,
        slug: data.product.slug,
        cad: data.amounts.first_amount_cad,
        usd: data.amounts.first_amount_usd,
        price_cad: cadPrice.id,
        price_usd: usdPrice.id
    });
    return doc;
});

export const makeWholesale = functions.https.onCall( async (data, context) => {
    if(context.auth?.uid !== 'AlMOK7JryjMlmS6XxWIqGc1sH6f1'){
        return { message: 'Not Authorized' };
    }
    return await admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            wholesale: true
        })
    }).then(() => {
        return {
            message: `${data.email} has been allowed Wholesale`
        }
    }).catch(err => err);
});
