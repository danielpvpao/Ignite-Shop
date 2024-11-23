import { styled } from "..";

export const HomeContainer = styled('main', {
    display: 'flex',
    width: '100%',
    maxWidth: 'calc(100vw - ((100vw - 1180px)) / 2)',
    marginLeft: 'auto',
    minHeight: 656,
})

export const Product = styled('div', {
background: 'linear-gradient(100deg, #1ea483 0%, #7465d4 100%)',
borderRadius: 8,
cursor: 'pointer',
position: 'relative',

display: 'flex',
alignItems: 'center',
justifyContent: 'center',
overflow: 'hidden',

img: {
    objectFit: 'cover'
},

footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',
    cursor: 'default',
    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    strong: {
        fontSize: '$lg',
        color: '$gray100'
    },
    
    span: {
        fontSize: '$xl',
        fontWeight: 'bold',
        color: '$green300',
    }
},
    '&:hover': {
        footer: {
            transform: 'translateY(0%)',
            opacity: 1
        }
    },
    div: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    },
    button: {
        padding: '0.75rem',
        borderRadius: '6px',
        border: 'none',
        backgroundColor: '#00875F',
        color: 'white',
        cursor: 'pointer',
    }
})
export const ShoppingCartButton = styled('button', {
    backgroundColor: '#202024',
    border: 'none',
    padding: '12px',
    borderRadius: '6px',
    cursor: "pointer",
    position:'relative',
    div: {
        width: 24,
        height: 24,
        borderRadius:'50%',
        backgroundColor: '#00875F',
        fontSize: 14,
        color: 'white',
        display:'flex',
        alignItems:'center',
        justifyContent: 'center',
        position:'absolute',
        bottom:'34px',
        left:'32px',
        outline:'solid 3px #121214'
    }
})