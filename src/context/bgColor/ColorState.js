import React, { useState } from 'react'
import ColorContext from './colorContext';

const ColorState = (props) => {

    const [mode, setMode] = useState('light');
    
    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = 'grey';   
            props.showAlert("Dark mode has been enabled", "success");
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = 'white';
            props.showAlert("Light mode has been enabled", "success");
        }
    }

    return (
        <ColorContext.Provider value={{ mode, toggleMode }}>
            {props.children}
        </ColorContext.Provider>
    )
}

export default ColorState
