import React, { useContext } from 'react'
import ThemeContext from '../context/context'

const ThemeSwitcher = () => {
    const {theme, setTheme} = useContext(ThemeContext)
    const switchTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }
  return (
    <button onClick={switchTheme}>Switch Theme</button>
  )
}

export default ThemeSwitcher
