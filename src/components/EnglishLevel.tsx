import { TEnglishLevel } from '@type/T-type';
import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Define a mapping from level ID to image imports
const imageMap = {
    1: require('@asset/images/A1.jpg'),
    2: require('@asset/images/A2.jpg'),
    3: require('@asset/images/B1.jpg'),
    4: require('@asset/images/B2.jpg'),
    5: require('@asset/images/C1.jpg'),
    6: require('@asset/images/C2.jpg'),
};

export interface IEnglishLevel {
    level: TEnglishLevel;
    onPress: () => void;
}

const EnglishLevel = ({ level, onPress }: IEnglishLevel) => {
    const [imageName, setImageName] = useState(imageMap[level.levelId]);

    useEffect(() => {
        setImageName(imageMap[level.levelId]);
    }, [level.levelId]);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <ImageBackground
                source={imageName}
                style={styles.imageBackground}
                imageStyle={styles.image}
            >
                <LinearGradient
                    colors={['transparent', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.7)']}
                    style={styles.gradient}
                />
                <Text className='absolute bottom-0 p-4 text-white font-nunitoXBold text-xl w-full'>
                    {level.levelName}
                </Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '49%',
        paddingVertical: 8,
    },
    imageBackground: {
        height: 300,
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        borderRadius: 10,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 10,
    },
});

export default EnglishLevel;
