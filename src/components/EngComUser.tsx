import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native';

interface IEngComUser {
    isCreator: boolean;
    noUser: boolean;
    withName?: boolean;
    avatar?: string;
    name?: string;
    handlePress?: () => void;
}

const EngComUser = ({
    isCreator,
    noUser,
    withName = true,
    avatar,
    name,
    handlePress,
}: IEngComUser) => {
    return (
        <View className={`flex flex-col ${withName && 'mb-3 mr-3'}`}>
            {noUser && (
                <TouchableOpacity
                    onPress={handlePress ? handlePress : () => {}}
                    className='w-[60px] h-[60px] flex items-center justify-center bg-[#E1F0FF] rounded-full'
                >
                    <FontAwesomeIcon icon={faPlus} color='#005DB2' size={25} />
                </TouchableOpacity>
            )}
            {!noUser && (
                <View>
                    <TouchableOpacity
                        style={{
                            width: 65,
                            height: 65,
                        }}
                        className={`${isCreator && 'border-solid border-yellow-500 items-center justify-center border border-2 rounded-full'}`}
                    >
                        <Image
                            source={avatar ? { uri: avatar } : require('@asset/images/avatar.jpg')}
                            style={{
                                resizeMode: 'cover',
                                width: 60,
                                height: 60,
                                borderRadius: 60 / 2,
                            }}
                        />
                    </TouchableOpacity>
                    {withName && (
                        <Text
                            numberOfLines={1}
                            className={`max-w-[60px] text-base font-nunitoSemi text-center mt-2 ${isCreator ? 'text-yellow-500' : 'text-gray-700'}`}
                        >
                            {name ? name : 'PhuGHs'}
                        </Text>
                    )}
                </View>
            )}
        </View>
    );
};

export default EngComUser;
