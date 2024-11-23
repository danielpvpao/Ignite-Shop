import * as Dialog from "@radix-ui/react-dialog";
import {
  CheckoutSummaryContainer,
  Close,
  Content,
  ImageContainer,
  ItemAmount,
  ItemAmountAndPrice,
  ItemPrice,
  ItemTitle,
  ItensContainer,
  Price,
  Title,
} from "./dialog";
import { X } from "phosphor-react";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { useContext, useEffect } from "react";
import { ShoppingCartContext } from "./context/shoppingCartContext";
import axios from "axios";

export function ShoppingCartDialog() {
  const { cartDetails, totalPrice, decrementItem } = useShoppingCart();
  const { setItensNumber: setContextItensNumber } = useContext(ShoppingCartContext);

  useEffect(() => {
    const totalItems = cartDetails
      ? Object.values(cartDetails).reduce((acc, item) => acc + item.quantity, 0)
      : 0;
    setContextItensNumber(totalItems);
  }, [cartDetails, setContextItensNumber]);

  const handleRemoveAndUpdate = async (itemId: string) => {
    await decrementItem(itemId);
  };

  const handleCompletePurchase = async () => {
    try {
      if (cartDetails && Object.values(cartDetails).length > 0) {
        const products = Object.values(cartDetails).map((product) => ({
          priceId: product.description,
          quantity: product.quantity,
        }));

        const response = await axios.post("/api/checkout", {
          products,
        });

        if (response.data && response.data.checkoutUrl) {
          window.location.href = response.data.checkoutUrl;
        } else {
          throw new Error("Resposta inesperada da API de checkout.");
        }
      } else {
        throw new Error("O carrinho está vazio.");
      }
    } catch{
      alert('Falha ao redirecionar ao checkout. Erro');
    }
  };

  const formattedTotalPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(totalPrice ?? 0);

  const totalItems = cartDetails ? Object.values(cartDetails).reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <Dialog.Portal>
      <Content>
        <Close asChild>
          <X size={24} />
        </Close>
        <Title>Sacola de compras</Title>
        <ItensContainer>
          {cartDetails && Object.values(cartDetails).length > 0 ? (
            Object.values(cartDetails).map((item) => (
              <div key={item.id}>
                <ImageContainer>
                  <Image src={item.imageUrl} alt={item.name} width={94} height={94} />
                </ImageContainer>
                <span>
                  <ItemTitle>{item.name}</ItemTitle>
                  <ItemPrice>
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.price)}
                  </ItemPrice>
                  <ItemAmount>{item.quantity} x</ItemAmount>
                  <button type="button" onClick={() => handleRemoveAndUpdate(item.id)}>
                    Remover
                  </button>
                </span>
              </div>
            ))
          ) : (
            <p>Seu carrinho está vazio.</p>
          )}
        </ItensContainer>
        <CheckoutSummaryContainer>
          <section>
            <span>
              <p>Quantidade</p>
              <p>Valor total</p>
            </span>
            <ItemAmountAndPrice>
              <ItemAmount>{totalItems} itens</ItemAmount>
              <Price>{formattedTotalPrice}</Price>
            </ItemAmountAndPrice>
          </section>
          <button type="button" onClick={handleCompletePurchase}>
            Finalizar Compra
          </button>
        </CheckoutSummaryContainer>
      </Content>
    </Dialog.Portal>
  );
}
