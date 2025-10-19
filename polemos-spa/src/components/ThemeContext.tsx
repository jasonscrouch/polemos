import { useEffect, useState } from "react";
import { StyleContext } from "../contexts/StyleContext";

interface Props {
    children: React.ReactNode;
}

export default function ThemeContext({children}: Props) {

    const key = 'theme';
    const light = 'light';
    const dark = 'dark';
    const themeSelector = 'data-bs-theme';

    const [appTheme, setAppTheme] = useState<string>(localStorage.getItem(key) || light);

    function getThemeElement() {
        return document.getElementById('theme') as HTMLElement;
    }

    function getTheme() {
        return getThemeElement().getAttribute(themeSelector);
    }

    function setTheme(theme: string) {
        return getThemeElement().setAttribute(themeSelector, theme);
    }

    function isLight() {
        return appTheme === light;
    }

    function handleSetTheme() {
        const theme = isLight() ? dark 
            : light; 

        setAppTheme(theme);

        return theme;
    }

    if (appTheme === dark 
        && !getTheme()) {
            
        setTheme(appTheme);
    }

    useEffect(() => {
        if (appTheme === getTheme()) {
            return;
        }

        localStorage.setItem(key, appTheme);

        setTheme(appTheme);
    }, [appTheme]);

    return (
        <StyleContext value={{theme: appTheme, setTheme: handleSetTheme, isLight: isLight}}>
            {children}
        </StyleContext>
    );
}
