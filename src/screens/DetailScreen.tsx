import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RootStackParams } from '../navigation/Navigation';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import { Ionicons } from '@expo/vector-icons';

const screenHeight = Dimensions.get('screen').height;

//Interface que me va proveer la infromación necesaria
interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> { };

export const DetailScreen = ({ route, navigation }: Props) => {

    const movie = route.params;
    //console.log(movie.id);

    const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    const { isLoading, cast, movieFull } = useMovieDetails(movie.id);
    //console.log(cast)

    return (
        <ScrollView>
            <View style={styles.imageContainer}>
                <View style={styles.imgBorder}>
                    <Image
                        source={{ uri }}
                        style={styles.posterImage}
                    />
                </View>
            </View>
            <View style={styles.marginContainer}>
                <Text style={styles.subtitle}> {movie.original_title} </Text>
                <Text style={styles.title}> {movie.title} </Text>
            </View>
            {
                isLoading
                    ? <ActivityIndicator size={35} color='grey' style={{ marginTop: 20 }} />
                    : <MovieDetails movieFull={movieFull!} cast={cast} />
            }
            <View style={styles.backButton}>
                <TouchableOpacity onPress={()=> navigation.pop()}>
                    <Ionicons name="arrow-back" size={50} color="white" />
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: screenHeight * 0.7,
        //backgroundColor: 'red',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        elevation: 9,
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25

    },
    imgBorder: {
        flex: 1,
        overflow: 'hidden',
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25
    },
    posterImage: {
        flex: 1,
    },
    marginContainer: {
        marginHorizontal: 20,
        marginTop: 20
    },
    subtitle: {
        fontSize: 16,
        opacity: 0.5
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    backButton: {
        position: 'absolute',
        zIndex: 999,
        elevation: 9,
        top: 30,
        left: 5
    }
});