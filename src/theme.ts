import { extendTheme } from '@chakra-ui/react'

// 3. extend the theme
const theme = extendTheme({
    heading: {
        default: 'white',
    },
    text: {
        default: 'white',
    },
    fonts: {
        heading: 'Space Grotesk',
    },
    colors: {
        primary: '#111',
        secondary: 'rgb(23,22,145)',
        tertiary: '#807eff',
    },
    styles: {
        global: {
            'html, body': {
                background: '#111',
                'min-height': '100vh',
                'font-family': 'Space Grotesk',
                transition: 'all 300ms',
            } 
        }
    }
})

export default theme;
