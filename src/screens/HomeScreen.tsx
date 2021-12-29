import React, { useContext, useEffect } from 'react'
import Carousel from 'react-native-snap-carousel';
import { ActivityIndicator, Dimensions, ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies'
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
//import ImageColors from 'react-native-image-colors';
import { getImagesColor } from '../helpers/getColors';
import { GradientContext } from '../context/GradientContext';


const { width: windowWindth } = Dimensions.get('window');

export const HomeScreen = () => {

    const { nowPlaying, popular, toRated, upComing, isLoading } = useMovies();
    //console.log(moviesCinema[2]?.title)

    //manejo del top
    const { top } = useSafeAreaInsets();

    //Lllamamos la función asignada para poder manejar la logica de lo que pasará con los colores
    const {setMainColors} = useContext(GradientContext)

    const getPosterColors = async(index: number) =>{
        //console.log(nowPlaying[index].title);
        const movie = nowPlaying[index];
        const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        //console.log(uri)


        ///en caso de que la respuesta sea null tenemos que asignar un valor por defecto en el color
        const [primary = 'green', secondary = 'orange'] = await getImagesColor(uri);
        console.log({primary, secondary})

        //enviamos los colores que nos responde el paquete que me trae el gradiente
        setMainColors({primary, secondary})
    }

    //Control del color inicial donde aparece la tarjeta principal
    useEffect(() => {
       if (nowPlaying.length > 0) {
           getPosterColors(0)
       }
    }, [nowPlaying])

    if (isLoading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator color='gray' size={100} />
            </View>
        )
    }

    return (

        <GradientBackground>
            {/* //Nos permite hacer el scroll que ya conocemos */}
            <ScrollView>
                <View style={{ marginTop: top + 20 }}>
                    {/* Carousel Principal */}
                    <View style={{ height: 440 }}>
                        <Carousel
                            data={nowPlaying}
                            renderItem={({ item }: any) => <MoviePoster movie={item} />}
                            sliderWidth={windowWindth}
                            itemWidth={300}
                            inactiveSlideOpacity={0.7}
                            //Me permite tomar la imagen exacta que se está posicionando para tomar sus colores
                            onSnapToItem={index => getPosterColors(index)}
                        />
                    </View>

                    {/* Carousel peliculas populares */}
                    <HorizontalSlider title='Popular' movies={popular} />
                    <HorizontalSlider title='Top Rated' movies={toRated} />
                    <HorizontalSlider title='Upcoming ' movies={upComing} />

                </View>

            </ScrollView>
        </GradientBackground>
    )
}
