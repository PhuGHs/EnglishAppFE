import { Helper } from '@root/utils/helper';
import { TLearningRoomMessage } from '@type/T-type';
import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ILearningRoomMessage {
    item: TLearningRoomMessage;
    is_mine: boolean;
}

const LearningRoomMessage = ({ item, is_mine }: ILearningRoomMessage) => {
    const { user, message, created_at } = item;
    const { profile_picture, full_name } = user;

    const [visible, setVisible] = useState<boolean>(false);
    return (
        <View className={`w-full ${is_mine ? 'items-end' : 'items-start'}`}>
            <View className={`max-w-[70%] space-x-4 ${is_mine ? 'flex-row-reverse' : 'flex-row'}`}>
                <View className='items-center justify-center'>
                    <Image
                        source={{ uri: profile_picture }}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50 / 2,
                            borderWidth: 1,
                            borderColor: '#334155',
                        }}
                    />
                </View>
                <View className={`flex flex-col space-y-2 ${is_mine ? 'mr-3' : ''}`}>
                    <Text
                        className={`text-gray-700 font-nunitoSemi text-base ${is_mine ? 'text-right' : 'text-left'}`}
                    >
                        {full_name}
                    </Text>
                    <TouchableOpacity
                        className={`px-2 py-3 rounded-xl ${is_mine ? 'bg-[#1D84C6]' : 'bg-neutral-300'}`}
                        onPress={() => setVisible((prev) => !prev)}
                    >
                        <Text
                            className={`font-nunitoSemi text-base ${is_mine ? 'text-white' : 'text-gray-700'}`}
                        >
                            {message}
                        </Text>
                    </TouchableOpacity>
                </View>
                {visible && <Text>{Helper.formatDate(created_at)}</Text>}
            </View>
        </View>
    );
};

export default LearningRoomMessage;
