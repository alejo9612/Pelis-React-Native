import { useRef } from 'react'
import { Animated } from 'react-native';

export const useFade = () => {

    //Componente propio de animación viene de react Animated
    const opacity = useRef(new Animated.Value(0)).current;

    const fadeIn = (callback?: Function) => {
        console.log(opacity)
        //De esta menera le datemos manejo a la animación que vamos a manejar
        Animated.timing(
            opacity,
            {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }

            //Lo que hacemos aquí es que inicializamos el start con un callback que se ejecutará en caso de existir
        ).start(() => callback ? callback() : null);
    }

    const fadeOut = (duration: number = 300) => {
        //De esta menera le datemos manejo a la animación que vamos a manejar
        Animated.timing(
            opacity,
            {
                toValue: 0,
                duration: duration,
                useNativeDriver: true
            }
        ).start();
    }

    return {
        opacity, fadeIn, fadeOut
    }
}
