import React, { createContext, useState } from "react";

interface ImageColors {
    primary: string;
    secondary: string;
}

interface ContextProps {
    colors: ImageColors;
    prevColors: ImageColors;
    setMainColors: (colors: ImageColors) => void;
    setPrevMainColors: (colors: ImageColors) => void;
}

export const GradientContext = createContext({} as ContextProps)//definir el tipo a exponer

export const GradientProvider = ({ children }: any) => {

    //colores actuales manejo por state
    const [ colors, setColors ] = useState<ImageColors>({
        primary: 'transparent',
        secondary: 'transparent'
    })

    //colores anteriores manejo por state
    const [ prevColors, setPrevColors ] = useState<ImageColors>({
        primary: 'transparent',
        secondary: 'transparent'
    });

    //manejo de los colores actuales
    const setMainColors = ( colors: ImageColors ) => {
        setColors( colors );
    }

    //manejador de los colores anteriores
    const setPrevMainColors = ( colors: ImageColors ) => {
        setPrevColors( colors );
    }

    return (
        <GradientContext.Provider value={{
            colors,
            prevColors,
            setMainColors,
            setPrevMainColors
        }}>
            { children }
        </GradientContext.Provider>
    )
}
