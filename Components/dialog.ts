import * as Dialog from "@radix-ui/react-dialog";
import { styled } from "@stitches/react";

export const Content = styled(Dialog.Content, {
    backgroundColor: '#202024',
    height: '100vh',
    width: '480px',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    right: 0,
    padding: '3rem 3rem',
    })
    export const Close = styled(Dialog.Close, {
        marginLeft: 'auto',
        cursor: 'pointer',
    })
    export const Title = styled(Dialog.Title, {
        fontSize: '$lg',
    })
    export const ItensContainer = styled('div', {
        marginTop: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        img:{
            borderRadius: '8px',
        },
        div: {
            display: 'flex',
            gap: '20px',
            span: {
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
               
            },
              button: {
                border: 'none',
                backgroundColor: 'inherit',
                display:'flex',
                alignItens: 'flex-start',
                color:'#00875F',
                fontSize:'1rem',
                cursor: 'pointer',
               }
        }
    })
    export const ImageContainer = styled('div',{
        borderRadius: '8px',
        padding: '10px',
        maxWidth: 101,
        maxHeight: 93,
        background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    })
    export const CheckoutSummaryContainer = styled('div', {
        marginTop: '12rem',
        section: {
            display: 'flex',
            justifyContent: 'space-between',
            span: {
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
               p:{
                    color: '#E1E1E6',
               },
               
            }
        },
        button: {
            padding: '1.25rem 2rem',
            borderRadius: '8px',
            backgroundColor: '#00875F',
            border: 'none',
            color: 'white',
            width: '100%',
            marginTop: '3rem',
            '&:hover':{
                cursor: 'pointer',
            }
        }
    })
    export const Price = styled('p', {
            fontSize: '$xl',
            color: '#E1E1E6',
            fontWeight: 'bold',
    })
    export const ItemAmount = styled('p', {
        color: '#C4C4CC',
    })

    export const ItemAmountAndPrice = styled('span', {
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-end'
    })
    export const ItemPrice = styled('p', {
        color: 'white',
    })
    export const ItemTitle = styled('p', {
            color: '#C4C4CC',
    })