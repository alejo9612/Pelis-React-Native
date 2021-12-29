import React from 'react'
import { Image, Text, View, StyleSheet} from 'react-native'
import { Cast } from '../interface/creditInterface'

interface Props {
    actor: Cast
}

export const ActorItem = ({ actor }: Props) => {

    const uri = `https://image.tmdb.org/t/p/w500/${actor.profile_path}`;
    //console.log(actor.profile_path)

    return (
        <View style={styles.container}>
            {
                actor.profile_path && (
                    <Image
                    source={{uri}}
                    style={{width:50, height:50, borderRadius:10}}//quitar color copn buena petición
                    />
                )
            }
            <View style={styles.actorInfo}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    {actor.name}
                </Text>
                <Text style={{fontSize: 16, opacity: 0.7}}>
                    {actor.character}
                </Text>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        height:50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 9,
        marginLeft: 20,
        paddingRight: 15,
    },
    actorInfo:{
        marginLeft:10,
        marginTop: 5
    }
});