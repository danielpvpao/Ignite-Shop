import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";
import { Container } from "@/styles/pages/app";
import { CartProvider } from 'use-shopping-cart';
import { ShoppingCartProvider } from "@/Components/context/shoppingCartContext"; 
import { Header } from "@/Components/Header/Header";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const stripePublicKey = process.env.STRIPE_PUBLIC_KEY || ""; 

  return (
    <ShoppingCartProvider>
      <CartProvider
        mode="payment" 
        stripe={stripePublicKey} 
        currency="BRL" 
        successUrl={`${process.env.NEXT_URL}/success`}
        cancelUrl={`${process.env.NEXT_URL}/`} 
        cartMode="client-only" 
        shouldPersist={true}
      >
        <Container>
          <Header /> 
          <Component {...pageProps} />
        </Container>
      </CartProvider>
    </ShoppingCartProvider>
  );
}
