import { createContext } from "react"

export type AppStyleContext = {
    theme: string,
    setTheme: () => string,
    isLight: () => boolean
}

export const StyleContext = createContext<AppStyleContext>({
    theme: 'light',
    setTheme: () => 'light',
    isLight: () => true
});
