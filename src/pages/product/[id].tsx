import { ImageContainer, ProductContainer, ProductDetails } from "../product"
import { GetStaticPaths, GetStaticProps } from "next"
import { stripe } from "@/src/lib/stripe"
import Stripe from "stripe"
import Image from "next/image"
import Head from "next/head"
import { useShoppingCart } from "use-shopping-cart"
export interface ProductProps {
    product: {
        id: string,
        name: string,
        imageUrl: string,
        price: number;
        description: string | null;
        defaultPriceId: string;
    },
} 

export default function Product({product}: ProductProps){
    const { addItem } = useShoppingCart();
    function handleAddToCart(){
        addItem({
            sku: product.id,
            id: product.id,
            name: product.name,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: 1,
            description: product.defaultPriceId,
            currency: 'BRL'
        })
    }
     const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(product.price);
return(
    <>
    <Head>
        <title>{product.name} | Ignite Shop</title>
    </Head>


    <ProductContainer>
        <ImageContainer>
        <Image src={product.imageUrl} width={520} height={400} alt=""/>
        </ImageContainer>
        <ProductDetails>
            <h1>{product.name}</h1>
            <span>{formattedPrice}</span>
            <p>{product.description}</p>
            <button onClick={handleAddToCart}>
                Colocar na sacola
            </button>
        </ProductDetails>
    </ProductContainer>
    </>
)
}
export const getStaticPaths: GetStaticPaths = async () => {
    return {
            paths: [
                { params: {id: 'prod_'}}
            ],
            fallback: "blocking",
        }
}
export const getStaticProps: GetStaticProps<ProductProps, { id: string }> = async ({ params }) => {
    const productId = params?.id;

    if (!productId) {
        return {
            notFound: true,
        };
    }

    try {
        const product = await stripe.products.retrieve(productId, {
            expand: ['default_price'],
        });

        const price = product.default_price as Stripe.Price;

        if (price.unit_amount) {
            return {
                props: {
                    product: {
                        id: product.id,
                        name: product.name,
                        imageUrl: product.images[0],
                        price: price.unit_amount / 100, 
                        description: product.description,
                        defaultPriceId: price.id,
                    },
                },
                revalidate: 60 * 60 * 1, 
            };
        }

        return { notFound: true };

    } catch (error) {
        console.error("Erro ao buscar produto:", error);
        return { notFound: true };
    }
};