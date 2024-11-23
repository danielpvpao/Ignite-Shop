import { styled } from ".";

export const SuccessContainer = styled('main', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
    section: {
        display: 'flex',
        marginLeft: '3rem'
    },
    h1: {   
        marginTop: '2rem',
        fontSize: '$2xl',
        color: '$gray100'
    },

    p: {
        fontSize: '$xl',
        color: '$gray300',
        textAlign: "center",
        marginTop: '2rem',
        maxWidth: 540,
    },

    a: {
        display: "flex",
        marginTop: '5rem',
        fontSize: "$lg",
        color: '$green500',
        textDecoration: 'none',

        '&:hover': {
            color: '$green300'
        }
    },
})

export const ImageContainer = styled('div', {
    width: '100%',
    minWidth: 140,
    minHeight: 140,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: '50%',
    padding: '0.25rem',
    marginTop: '4rem',
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    marginLeft: '-3rem',
    img: {
        objectFit: "cover",
    }
})