import EngComUser from '@component/EngComUser';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import Accordion from '@component/Accordion';
import Modal from 'react-native-modal';
import User from '@component/User';

import { SafeAreaView } from 'react-native-safe-area-context';
const RoomDetails = () => {
    const [session, setSession] = useState(null);
    const [publisher, setPublisher] = useState(null);
    const [subscribers, setSubscribers] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [sessionId, setSessionId] = useState(false);
    return (
        <SafeAreaView className='flex flex-1 bg-slate-100 px-3'>
            <View className='mt-4'>
                <View className='flex flex-row mb-5 items-center'>
                    <TouchableOpacity className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px]'>
                        <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                    </TouchableOpacity>
                    <Text className='text-center w-full -left-[40px] text-sky-600 text-[22px] font-nunitoSemi'>
                        EngCom Room
                    </Text>
                </View>
            </View>
            <ScrollView horizontal={false} className='space-y-4 mb-10'>
                <View className='flex flex-row justify-between'>
                    <Text className='p-3 bg-[#ACE5FF] text-[#005DB2] text-base w-[45%] rounded-lg text-center font-nunitoBold'>
                        B1 - Intermediate
                    </Text>
                    <Text className='p-3 bg-[#F2DDCC] text-[#FF6B00] text-base w-[45%] rounded-lg text-center font-nunitoBold'>
                        Daily life
                    </Text>
                </View>
                <Text className='text-gray-700 font-nunitoSemi text-lg'>
                    Do you prefer to have a lot of friends or just a few close friends?
                </Text>
                <View
                    className='p-3 bg-white min-h-[300px] rounded-xl'
                    style={{ elevation: 10, shadowColor: 'gray' }}
                >
                    <View className='flex flex-row justify-between items-center'>
                        <Text className='text-[#005DB2] font-nunitoBold text-lg'>SPEAKERS</Text>
                        <TouchableOpacity
                            onPress={() => setIsVisible(!isVisible)}
                            className='flex flex-row bg-[#E1F0FF] w-fit px-4 py-1 space-x-3 rounded-full items-center justify-center'
                        >
                            <FontAwesomeIcon icon={faHeadphones} size={25} color='#005DB2' />
                            <Text className='text-[#005DB2] text-lg font-nunitoBold'>3</Text>
                        </TouchableOpacity>
                    </View>
                    <View className='flex flex-row flex-wrap p-1'>
                        <EngComUser isCreator={true} noUser={false} />
                        <EngComUser isCreator={false} noUser={false} />
                        <EngComUser isCreator={false} noUser={false} />
                        <EngComUser isCreator={false} noUser={false} />
                        <EngComUser isCreator={false} noUser={false} />
                        <EngComUser isCreator={false} noUser={true} />
                        <EngComUser isCreator={false} noUser={true} />
                        <EngComUser isCreator={false} noUser={true} />
                    </View>
                </View>
                <View className=''>
                    <Text className='text-xl text-gray-700 font-nunitoBold'>
                        There are 8 sample questions
                    </Text>
                    <View className='flex flex-col'>
                        <Accordion
                            header='Do you prefer to have a lot of friends or just a few close friends?'
                            content='Personally I think that I will more inclined to close friends'
                        />
                        <Accordion
                            header='Do you prefer to have a lot of friends or just a few close friends?'
                            content='Personally I think that I will more inclined to close friends'
                        />
                        <Accordion
                            header='Do you prefer to have a lot of friends or just a few close friends?'
                            content='Personally I think that I will more inclined to close friends'
                        />
                        <Accordion
                            header='Do you prefer to have a lot of friends or just a few close friends?'
                            content='Personally I think that I will more inclined to close friends'
                        />
                        <Accordion
                            header='Do you prefer to have a lot of friends or just a few close friends?'
                            content='Personally I think that I will more inclined to close friends'
                        />
                    </View>
                </View>
            </ScrollView>
            <Modal
                isVisible={isVisible}
                onBackButtonPress={() => setIsVisible(!isVisible)}
                onBackdropPress={() => setIsVisible(!isVisible)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <View className='w-[100%] h-[70%] bg-white flex rounded-xl p-4 flex-col items-center'>
                    <Text className='text-xl font-nunitoSemi text-sky-700'>Listeners</Text>
                    <View className='border-t-[1px] border-gray-700 mx-10 w-full mt-4' />
                    <View className='mt-4 flex flex-col items-start w-full'>
                        <User isModerator={false} nameOnRight={true} room={true} />
                        <User isModerator={false} nameOnRight={true} room={true} />
                        <User isModerator={false} nameOnRight={true} room={true} />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default RoomDetails;
