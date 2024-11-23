import { HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image";
import Head from 'next/head'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { GetStaticProps } from "next";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Link from "next/link";
import { Handbag } from "phosphor-react";
import { useShoppingCart } from "use-shopping-cart";
interface Product{
      id: string,
      name: string,
      imageUrl: string,
      price: number;
      description: string | null;
      defaultPriceId: string;
}
interface HomeProps {
  products: Product[]; 
}


export default function Home({products}: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    }
  });

  const { addItem } = useShoppingCart();

  function handleAddItemToShoppingCart(product: Product) {
    addItem({
      sku: product.id,
      currency: 'BRL',
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price, 
      description: product.defaultPriceId,
      quantity: 1,
    });
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => (
          <Product key={product.id} className="keen-slider__slide">
            <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
              <Image src={product.imageUrl} width={520} height={480} alt="" />
            </Link>
            <footer>
              <div>
                <strong>{product.name}</strong>
                <span>{new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(product.price)}</span>
              </div>
              <button onClick={() => handleAddItemToShoppingCart(product)}>
                <Handbag size={32} />
              </button>
            </footer>
          </Product>
        ))}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;
    if (price.unit_amount) {
      return {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount / 100, 
        description: product.description,
        defaultPriceId: price.id, 
      };
    }
    return null
  }).filter((product): product is Product => product !== null);

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, 
  };
};
