import React from 'react'
import { FlatList, Text, View } from 'react-native'
import currencyformatter from 'currency-formatter'
import { Cast } from '../interface/creditInterface'
import { MovieFull } from '../interface/movieInterface'
import { FontAwesome } from '@expo/vector-icons';
import { ActorItem } from './ActorItem'

interface Props {
    movieFull: MovieFull;
    cast: Cast[]
}

export const MovieDetails = ({ movieFull, cast }: Props) => {


    return (
        <>
            {/* Detalles */}
            <View style={{ marginHorizontal: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    <FontAwesome name="star-half-empty" size={16} color="grey" />

                    <Text>  {movieFull.vote_average}</Text>
                    <Text style={{ marginLeft: 5 }}>
                        - {movieFull.genres.map(g => g.name).join(', ')}
                    </Text>
                </View>

                {/* Historia de la pelicula */}
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
                    Historia
                </Text>
                <Text style={{ fontSize: 16 }}>{movieFull.overview}</Text>
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
                    Presupuesto
                </Text>
                <Text style={{ fontSize: 16 }}>
                    {currencyformatter.format(movieFull.budget, { code: 'USD' })}
                </Text>
            </View>

            {/* Casting */}
            <View style={{ marginTop: 10, marginBottom: 100 }}>
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold', marginHorizontal: 20 }}>
                    Actores
                </Text>

                {/* Manejo del scoll lo configuramos de manera horizontal con sus respectivos argumentos */}
                <FlatList 
                    data={cast}//tenemos que ingresar la data que vamos a recorrer
                    keyExtractor={(item)=>item.id.toString()}//le asigmamos una llave la cual es el id pero solo resive string, por lo que usamos el método string
                    renderItem={({item}) => <ActorItem actor={item} /> } //Renderizamos el componente que queremos mostrar con su respectivos datos por item
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{marginTop: 10, height:70}}
                />
            </View>
        </>
    )
}
