import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faHeadphones } from '@fortawesome/free-solid-svg-icons';
import Accordion from '@component/Accordion';
import Modal from 'react-native-modal';
import User from '@component/User';
import EngComUser from '@component/EngComUser';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RoomDetailsScreenProps, RootStackParamList } from '@type/index';
import { RouteProp } from '@react-navigation/native';
import { UserContext } from '@root/context/user-context';
import { LearningRoomApi } from '@root/api/learningroom.api';
import { TEnglishTopicQuestionDto, TParticipant, TParticipantDto } from '@type/T-type';
import { TopicApi } from '@root/api/topic.api';

const getParticpantId = (participants: TParticipantDto[], user_id: number) => {
    let participantId;
    participants.forEach((item, index) => {
        if (item.user.user_id === user_id) {
            participantId = item.participant_id;
            return;
        }
    });
    return participantId;
};

const RoomDetails = ({
    route,
    navigation,
}: RoomDetailsScreenProps & { route: RouteProp<RootStackParamList, 'RoomDetails'> }) => {
    const { user } = useContext(UserContext);
    const { user_id } = user.user;
    const { room } = route.params;
    const { participants } = room;

    const [questions, setQuestions] = useState<TEnglishTopicQuestionDto[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const [numberOfListeners, setNumberOfListeners] = useState<number>(0);

    const handleQuit = async () => {
        const { status } = await LearningRoomApi.leaveRoom(room.id, getParticpantId(participants, user_id));
        if (status === 'SUCCESS') {
            navigation.popToTop();
        }
    };

    const getNumberOfListeners = useCallback(() => {
        let count = 0;
        participants.forEach((item) => {
            if (!item.is_speaker) {
                count = count + 1;
            }
        });
        setNumberOfListeners(count);
    }, []);

    useEffect(() => {
        getNumberOfListeners();
        const fetch = async () => {
            const { data, message, status } = await TopicApi.getAllQuestions(room.topic.topic_id);
            if (status === 'SUCCESS') {
                setQuestions(data);
            }
        };
        fetch();
    }, []);

    const renderContent = () => (
        <View className='flex flex-1 bg-slate-100 px-3'>
            <View className='mt-4'>
                <View className='flex flex-row mb-5 items-center justify-between'>
                    <TouchableOpacity 
                        onPress={handleQuit}
                        className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px]'>
                        <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                    </TouchableOpacity>
                    <Text className='text-center  text-sky-600 text-[22px] font-nunitoSemi'>
                        EngCom Room
                    </Text>
                    <View className='w-[8%]'></View>
                </View>
            </View>
            <View className='flex flex-row justify-between mb-4'>
                <Text className='p-3 bg-[#ACE5FF] text-[#005DB2] text-base w-[45%] rounded-lg text-center font-nunitoBold'>
                    {room.topic.english_level_id}
                </Text>
                <Text className='p-3 bg-[#F2DDCC] text-[#FF6B00] text-base w-[45%] rounded-lg text-center font-nunitoBold'>
                    {room.topic.header}
                </Text>
            </View>
            <Text className='text-gray-700 font-nunitoSemi text-lg mb-4'>
                {room.room_name}
            </Text>
            <View className='p-3 bg-white min-h-[300px] rounded-xl mb-4' style={{ elevation: 10, shadowColor: 'gray' }}>
                <View className='flex flex-row justify-between items-center mb-4'>
                    <Text className='text-[#005DB2] font-nunitoBold text-lg'>SPEAKERS</Text>
                    <TouchableOpacity
                        onPress={() => setIsVisible(!isVisible)}
                        className='flex flex-row bg-[#E1F0FF] w-fit px-4 py-1 space-x-3 rounded-full items-center justify-center'
                    >
                        <FontAwesomeIcon icon={faHeadphones} size={25} color='#005DB2' />
                        <Text className='text-[#005DB2] text-lg font-nunitoBold'>{numberOfListeners}</Text>
                    </TouchableOpacity>
                </View>
                <View className='flex flex-row flex-wrap p-1'>
                    <FlatList
                        data={participants}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            if (item.is_speaker) {
                                return <EngComUser name={item.user.full_name} isCreator={item.is_owner} avatar={item.user.profile_picture} withName={true} noUser={false} />;
                            }
                        }}
                    />
                </View>
            </View>
            <Text className='text-xl text-gray-700 font-nunitoBold mb-4'>
                There are {questions.length} sample questions
            </Text>
        </View>
    );

    return (
        <SafeAreaView className='flex flex-1'>
            <FlatList
                data={questions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Accordion header={item.question} content={item.sample_answer} />}
                ListHeaderComponent={renderContent}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
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
                        <FlatList
                            data={participants}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                if (!item.is_speaker) {
                                    return <User isModerator={false} nameOnRight={true} room={true} user={item.user}/>;
                                }
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default RoomDetails;
