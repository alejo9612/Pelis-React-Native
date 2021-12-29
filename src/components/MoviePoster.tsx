import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Movie } from '../interface/movieInterface'

//typado que necesito para manejar las movies
interface Props {
    movie: Movie;
    height?: number;
    width?: number;
}

export const MoviePoster = ({ movie, height = 420, width = 300 }: Props) => {

    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    
    //console.log(movie.poster_path);

    const navigation = useNavigation();


    return (
        <TouchableOpacity
            onPress={()=> {navigation.navigate('DetailScreen', movie)}}
            activeOpacity={0.7}//Eliminar el bacgroud color cuando cargue la imagen
            style={{ width, height, marginHorizontal: 5, paddingBottom: 20, paddingHorizontal:7 }}
        >
            <View style={styles.imageConteiner}>
                <Image
                    source={{ uri }}
                    style={styles.image}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    imageConteiner: {
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 9,
    },
    image: {
        flex: 1,
        borderRadius: 18,
    },

});