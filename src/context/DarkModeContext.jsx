import { createContext, useEffect } from 'react';
import PropTypes from 'prop-types';

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {

    const storedTheme = localStorage.getItem('theme');

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
        } else {
        document.documentElement.classList.remove('dark')
        }
    }, [storedTheme]);

    return (
        <DarkModeContext.Provider value={{ storedTheme }}>
            {children}
        </DarkModeContext.Provider>
    )
}

DarkModeProvider.propTypes = {
    children: PropTypes.node.isRequired,
}