import {createContext, useContext, useState} from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
        const [theme, setTheme] = useState("dark");
}

const handleToggleTheme = () => {
        return setTheme((prevTheme) => (prevTheme === "dark"?"light":"dark"))
}

return(
        <ThemeContext.Provider value={{theme, handleToggleTheme}}>
                {children}
        </ThemeContext.Provider>
)