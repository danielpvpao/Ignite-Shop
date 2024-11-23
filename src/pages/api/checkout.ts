import { stripe } from "@/src/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";
interface ProductProps{
    priceId: string;
    quantity: number;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { products } = req.body;

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    if (!products) {
        return res.status(400).json({ error: 'Produtos não encontrados' });
    }

    const lineItems = products.map((product : ProductProps) => ({
        price: product.priceId,  
        quantity: product.quantity, 
    }));

    const successURL = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelURL = `${process.env.NEXT_URL}/`;

    try {
        const checkoutSession = await stripe.checkout.sessions.create({
            success_url: successURL,
            cancel_url: cancelURL,
            line_items: lineItems,
            mode: 'payment',
        });

        return res.status(201).json({
            checkoutUrl: checkoutSession.url,
        });

    } catch {
        return res.status(500).json({ error: 'Erro interno ao criar a sessão de checkout' });
    }
}
