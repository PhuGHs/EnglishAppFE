import { TConversation } from '@type/index';
import React from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';

const data: TConversation[] = [
    {
        id: 1,
        roomName: 'Le Van Phong',
        lastSentUser: {
            userId: 1,
            fullName: 'Le Van Phu',
            profilePicture: '',
            englishLevel: {
                levelId: 1,
                levelName: 'Intermediate',
                description: '',
            }
        },
        lastMessage: {
            id: 1,
            message: 'hello',
            conversationId: 1,
            sender: {
                userId: 1,
                fullName: 'Le Van Phu',
                profilePicture: '',
                englishLevel: {
                    levelId: 1,
                    levelName: 'Intermediate',
                    description: '',
                }
            },
            receiver: {
                userId: 2,
                fullName: 'Le Van Phong',
                profilePicture: '',
                englishLevel: {
                    levelId: 1,
                    levelName: 'Intermediate',
                    description: '',
                }
            },
            createdAt: ''          
        }
    },
    {
        id: 2,
        roomName: 'Haii',
        lastSentUser: {
            userId: 1,
            fullName: 'Le Van Phu',
            profilePicture: '',
            englishLevel: {
                levelId: 1,
                levelName: 'Intermediate',
                description: '',
            }
        },
        lastMessage: {
            id: 1,
            message: 'hello',
            conversationId: 1,
            sender: {
                userId: 1,
                fullName: 'Le Van Phu',
                profilePicture: '',
                englishLevel: {
                    levelId: 1,
                    levelName: 'Intermediate',
                    description: '',
                }
            },
            receiver: {
                userId: 3,
                fullName: 'Haii',
                profilePicture: '',
                englishLevel: {
                    levelId: 1,
                    levelName: 'Intermediate',
                    description: '',
                }
            },
            createdAt: ''          
        }
    }
];

const Conversation = ({navigation}) => {
    return (
        <TouchableOpacity
            className='flex flex-row justify-start items-center mb-4 bg-white p-2 rounded-2xl'
            style={{ elevation: 10, shadowColor: '#7dd3fc' }}
            onPress={() => navigation.push('DetailChat')}
        >
            <Image
                source={require('@asset/images/avatar.jpg')}
                style={{ resizeMode: 'cover', width: 70, height: 70, borderRadius: 70 / 2 }}
            />
            <View className='flex flex-col flex-grow ml-3'>
                <Text className='text-gray-700 font-nunitoBold text-xl'>Phu Le</Text>
                <View className='flex flex-row justify-between items-start'>
                    <View className='max-w-[70%]'>
                        <Text className='w-fit text-gray-500 text-base font-nunitoSemi'>
                            Is it fine?
                        </Text>
                    </View>
                    <View className=''>
                        <Text className='w-fit text-gray-500 text-base font-nunitoSemi'>
                            <Text className='text-gray-400 text-base font-nunitoSemi'>20/11</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};


const Conversations = ({navigation}) => {
    return (
        <FlatList
            horizontal={false}
            data={data}
            renderItem={({ item }) => <Conversation navigation={navigation} />}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default Conversations;