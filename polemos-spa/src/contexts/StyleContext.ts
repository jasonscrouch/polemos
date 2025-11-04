import { createContext } from "react"

export type AppStyleContext = {
    theme: string,
    setTheme: () => string,
    isDark: () => boolean
}

export const StyleContext = createContext<AppStyleContext>({
    theme: 'light',
    setTheme: () => 'light',
    isDark: () => false
});
