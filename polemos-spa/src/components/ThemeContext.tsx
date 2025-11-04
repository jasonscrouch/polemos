import { useEffect } from "react";
import { StyleContext } from "../contexts/StyleContext";
import useLocalStorage from "../hooks/LocalStorage";

interface Props {
    children: React.ReactNode;
}

export default function ThemeContext({children}: Props) {

    const key = 'theme';
    const light = 'light';
    const dark = 'dark';
    const themeSelector = 'data-bs-theme';

    const [appTheme, setAppTheme] = useLocalStorage<string>(key, light);

    if (!getTheme()) {
            
        setTheme(appTheme);
    }

    function getThemeElement() {
        return document.getElementById('theme') as HTMLElement;
    }

    function getTheme() {
        return getThemeElement().getAttribute(themeSelector);
    }

    function setTheme(theme: string) {
        return getThemeElement().setAttribute(themeSelector, theme);
    }

    function isDark() {
        return appTheme === dark;
    }

    function handleSetTheme() {
        const theme = isDark() ? light 
            : dark; 

        setAppTheme(theme);

        return theme;
    }

    useEffect(() => {
        if (appTheme === getTheme()) {
            return;
        }

        setTheme(appTheme);
    }, [appTheme]);

    return (
        <StyleContext value={{theme: appTheme, setTheme: handleSetTheme, isDark: isDark}}>
            {children}
        </StyleContext>
    );
}
