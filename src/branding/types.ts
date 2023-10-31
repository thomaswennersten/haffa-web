import { ThemeOptions, TypographyOwnProps } from '@mui/material'

export type BrandingOptions =
    | 'primary'
    | 'secondary'
    | 'info'
    | 'warning'
    | 'error'
    | 'success'
    | 'radius'

export interface ThemeModel {
    colors: {
        primary: string
        secondary: string
        error: string
        warning: string
        info: string
        success: string
    }
    layout: {
        radius: number
        cardHeader: TypographyOwnProps['variant']
    }
}

export type ThemeFactory = (model: ThemeModel) => ThemeOptions
