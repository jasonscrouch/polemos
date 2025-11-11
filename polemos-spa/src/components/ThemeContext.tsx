import type { JSX } from "react";
import { StyleContext } from "../contexts/StyleContext";
import useLocalStorage from "../hooks/LocalStorage";

interface Props {
    children: React.ReactNode;
}

export default function ThemeContext({children}: Props) : JSX.Element {

    const theme = "theme";
    const light = "light";
    const dark = "dark";
    const themeSelector = "data-bs-theme";

    const [appTheme, setAppTheme] = useLocalStorage<string>(theme, light);

    if (!getTheme()) {
            
        setTheme(appTheme);
    }

    function getThemeElement() : HTMLElement {
        return document.getElementById(theme) as HTMLElement;
    }

    function getTheme() : string | null {
        return getThemeElement().getAttribute(themeSelector);
    }

    function setTheme(theme: string) : string {
        getThemeElement().setAttribute(themeSelector, theme);

        return theme;
    }

    function isDark() : boolean {
        return appTheme === dark;
    }

    function handleSetTheme() : "light" | "dark" {
        const theme = isDark() ? light 
            : dark; 

        setTheme(theme);
        setAppTheme(theme);

        return theme;
    }

    return (
        <StyleContext value={{theme: appTheme, setTheme: handleSetTheme, isDark: isDark}}>
            {children}
        </StyleContext>
    );
}
