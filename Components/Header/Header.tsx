import { useContext } from "react";
import { HeaderContainer } from "./HeaderStyles";
import { ShoppingCartContext } from "../context/shoppingCartContext";
import Image from "next/image";
import { useRouter } from "next/router";
import * as Dialog from '@radix-ui/react-dialog'
import { ShoppingCartButton } from "@/styles/pages/home";
import { Handbag } from "phosphor-react";
import { ShoppingCartDialog } from "../ShoppingCartDialog";
import logoImg from '@/src/assets/logo.svg'
export function Header(){
    const router = useRouter();
    const isSuccessRoute = router.pathname === '/success';
    const {itensNumber} = useContext(ShoppingCartContext)
    return(
        <HeaderContainer
            css={{
              padding: isSuccessRoute ? '0' : '2rem 0 2rem 10rem',
              margin: isSuccessRoute ? '4rem auto' : '0 auto',
            }}
          >
            <Image
              src={logoImg}
              alt="Logo"
              style={{
                margin: isSuccessRoute ? '0 auto' : '0',
              }}
            />
            {!isSuccessRoute && (
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <ShoppingCartButton>
                    <Handbag size={24} color="white" />
                    {itensNumber > 0 && <div>{itensNumber}</div>}
                  </ShoppingCartButton>
                </Dialog.Trigger>
                <ShoppingCartDialog />
              </Dialog.Root>
            )}
          </HeaderContainer>
    )
}