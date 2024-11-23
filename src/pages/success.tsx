import { ImageContainer, SuccessContainer } from "@/styles/succes";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";
import Image from "next/image";
import Head from "next/head";
import { useShoppingCart } from "use-shopping-cart";
import Stripe from "stripe";
interface SuccessProps {
    customerName: string,
    product: {
        name: string;
        imageUrl: string
    }
}
export default function Success({customerName, product}: SuccessProps){
    const { cartDetails,  } = useShoppingCart()
    return(
        <>
        <Head>
        <title>{product.name} | Ignite Shop</title>

        <meta name="robots" content="noindex" />
        </Head>
        <SuccessContainer>
        <section>
        {
    Object.values(cartDetails || {}).length <= 3 ? (
        Object.values(cartDetails || {}).map((product) => (
            <ImageContainer key={product.id}>
                <Image src={product.imageUrl} width={140} height={140} alt={product.name || 'Produto'} />
            </ImageContainer>
        ))
    ) : (
        Object.values(cartDetails || {}).slice(0, 3).map((product) => (
            <ImageContainer key={product.id}>
                <Image src={product.imageUrl} width={140} height={140} alt={product.name || 'Produto'} />
            </ImageContainer>
        ))
    )
}
</section>

            <h1>Compra efetuada!</h1>
            <p>
                Uhull <strong>{customerName}</strong>, sua <strong>{product.name}</strong> está a caminho da sua casa
            </p>

            <Link href="/">
            Voltar ao catálogo
            </Link>
        </SuccessContainer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
const  sessionId = String(query.session_id);
if (!query.session_id) {
    return {
        redirect: {
            destination: '/',
            permanent: false,
        }
    }
}
const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
})
if (!session.line_items || !session.line_items.data || session.line_items.data.length === 0) {
    return {
      notFound: true, 
    };
  }
  const customerName = session.customer_details?.name;

  const product = session.line_items.data[0].price?.product as Stripe.Product;
  if (!product) {
    return {
      notFound: true, 
    };
  }
return {
    props: {
        customerName,
        product: {
            name: product.name,
            imageUrl: product.images[0], 
        }
    }
}
}