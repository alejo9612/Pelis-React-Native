import React, { useContext, useEffect } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { GradientContext } from '../context/GradientContext';
import { useFade } from '../hooks/useFade';

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const GradientBackground = ({ children }: Props) => {

    //llamamos el context para poder manejar los colores que tendriamos
    const { colors, prevColors, setPrevMainColors } = useContext(GradientContext);

    //Llamamos el hook con el fin de poder ver la opacidad y darle manejo al cambio de imagen
    const { opacity, fadeIn, fadeOut } = useFade();

    ///Manejo del efecto para que se cargue los colores de manera correcta de entrada por cada una de las imagenes
    useEffect(() => {
        fadeIn(() => {
            setPrevMainColors(colors);
            fadeOut(0)
        })
    }, [colors])

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={[prevColors.primary, prevColors.secondary, 'white']}
                style={{ ...StyleSheet.absoluteFillObject }}
                start={{ x: 0.1, y: 0.1 }}
            />

            <Animated.View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    opacity
                }}
            >
                <LinearGradient
                    colors={[colors.primary, colors.secondary, 'white']}
                    style={{ ...StyleSheet.absoluteFillObject }}
                    start={{ x: 0.1, y: 0.1 }}
                />
            </Animated.View>
            {/* Viene siendo toda la aplicación */}
            {children}
        </View>
    )
}
