import ImageColors from 'react-native-image-colors'

export const getImagesColor = async(uri: string) => {
    

    const colors = await ImageColors.getColors(uri,{})
    console.log(colors)

    let primary;
    let secondary;

    if (colors.platform === 'android') {
        primary = colors.dominant
        secondary = colors.average
    }
    else if (colors.platform === 'ios') {
        primary = colors.primary
        secondary = colors.secondary
    }else{
        primary = colors.lightVibrant
        secondary = colors.lightMuted
    }

    return [ primary, secondary]    
}

