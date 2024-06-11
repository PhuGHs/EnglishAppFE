import { faAngleRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    TEnglishTopicDto,
    TLearningRoomPostInstant,
    TLearningRoomPostLater,
    TRadioButton,
} from '@type/T-type';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
    FlatList,
    ScrollView,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { CalendarDaysIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal/dist/modal';
import VocabSection from '@component/VocabSection';
import { LearningRoomApi } from '@root/api/learningroom.api';
import { TopicApi } from '@root/api/topic.api';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useInput } from '@hook/useInput';
import { Helper } from '@root/utils/helper';
import { UserContext } from '@root/context/user-context';
import { useToast } from '@root/context/toast-context';
import { CreateARoomScreenProps } from '@type/index';

const arr: number[] = [1, 2];

const CreateARoom = ({ navigation }: CreateARoomScreenProps) => {
    const { user } = useContext(UserContext);
    const { showToast } = useToast();
    const { user_id } = user.user;

    const [selectedId, setSelectedId] = useState(1);
    const radGroup: TRadioButton[] = useMemo(
        () => [
            {
                id: 1,
                label: 'A1 - Beginner',
            },
            {
                id: 2,
                label: 'A2 - Elementary',
            },
            {
                id: 3,
                label: 'B1 - Intermediate',
            },
            {
                id: 4,
                label: 'B2 - Upper intermediate',
            },
            {
                id: 5,
                label: 'C1 - Advanced',
            },
            {
                id: 6,
                label: 'C2 - Proficiency',
            },
        ],
        []
    );

    const [topics, setTopics] = useState<TEnglishTopicDto[]>([]);
    const [confirmedModalVisible, setConfirmedModalVisible] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedTopic, setSelectedTopic] = useState<TEnglishTopicDto>(null);
    const [isEnabled, setIsEnabled] = useState(false);
    const [isPrivateRoom, setIsPrivateRoom] = useState(false);

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedTime, setSelectedTime] = useState<Date>(null);
    const [selectedDuration, setSelectedDuration] = useState<number>(1);

    const [showDP, setShowDP] = useState<boolean>(false);
    const [mode, setMode] = useState<'date' | 'time'>('date');

    const toggle = () => setIsPrivateRoom((prev) => !prev);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    const {
        value: content,
        handleInputChange: handleContentChange,
        handleInputBlur: handleContentBlur,
        setEnteredValue: setContent,
        hasError: contentHasError,
        didEdit: contentDidEdit,
    } = useInput({ defaultValue: '', validationFn: (value) => value !== '' });

    const {
        value: password,
        handleInputChange: handlePasswordChange,
        handleInputBlur: handlePasswordBlur,
        setEnteredValue: setPassword,
        hasError: passwordHasError,
        didEdit: passwordDidEdit,
    } = useInput({
        defaultValue: Helper.generateRoomPassword(),
        validationFn: (value) => value.length === 6,
    });

    const onChange = (event, date) => {
        if (mode === 'date') {
            // Handle date selection
            if (date) {
                setSelectedDate(date); // Update the selected date
            }
            setShowDP(true); // Show the time picker after selecting a date
            setMode('time'); // Switch to time mode
        } else {
            // Handle time selection
            if (date) {
                // Ensure we have both date and time to create a new Date object
                if (selectedDate && date) {
                    const newDate = new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth(),
                        selectedDate.getDate(),
                        date.getHours(),
                        date.getMinutes(),
                        date.getSeconds(),
                        date.getMilliseconds()
                    );
        
                    setSelectedTime(newDate); // Update the selected date and time
                }
            }
            setShowDP(false); // Hide the date/time picker
            setMode('date'); // Switch back to date mode
        }
    };
    
    

    const handleCreate = async () => {
        let bodyOut: TLearningRoomPostInstant | TLearningRoomPostLater;
        if (isEnabled) {
            const body: TLearningRoomPostLater = {
                room_name: content,
                is_private: isPrivateRoom,
                password: password,
                scheduled_to: selectedTime,
                duration: selectedDuration,
                topic_id: selectedTopic.topic_id,
                user_id: user_id,
                max_participants: 5,
            };
            bodyOut = body;
        } else {
            const body: TLearningRoomPostInstant = {
                room_name: content,
                is_private: isPrivateRoom,
                password: password,
                duration: selectedDuration,
                topic_id: selectedTopic.topic_id,
                user_id: user_id,
                max_participants: 5,
            };
            bodyOut = body;
        }

        const { data, message, status } = await LearningRoomApi.create(bodyOut, !isEnabled);
        if (status === 'SUCCESS') {
            showToast({ type: 'success', description: message, timeout: 3000 });
            if (isEnabled) {
                navigation.pop();
            } else {
                navigation.push('RoomDetails', { room: data });
            }
        }
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data, message, status } = await TopicApi.getAllTopics(selectedId);
                if (status === 'SUCCESS') {
                    setTopics(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
    }, [selectedId]);

    return (
        <SafeAreaView className='flex flex-1 bg-white'>
            <View className='flex flex-1'>
                <View className='px-3 mt-4'>
                    <View className='flex flex-row mb-5 items-center justify-between'>
                        <TouchableOpacity
                            onPress={() => navigation.pop()}
                            className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px]'
                        >
                            <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                        </TouchableOpacity>
                        <Text className='text-center text-sky-600 text-[22px] font-nunitoSemi'>
                            Create A Room
                        </Text>
                        <View className='w-[8%]'></View>
                    </View>
                </View>
                <ScrollView horizontal={false} className='flex flex-1 space-y-2 bg-slate-100'>
                    <View className='px-3 flex flex-1 space-y-4'>
                        <Text className='text-xl font-nunitoSemi text-gray-700 mt-4'>
                            Select your language level for this room
                        </Text>
                        {radGroup.map((value, index) => (
                            <TouchableOpacity
                                key={value.id}
                                disabled={user.user.english_level.levelId < index + 1}
                                onPress={() => setSelectedId(value.id)}
                                className='flex justify-center items-start w-full'
                            >
                                <Text
                                    className={`p-3 w-full ${selectedId === value.id ? 'bg-sky-400 font-semibold text-white' : 'bg-white text-gray-800'} text-lg font-nunitoBold rounded-xl`}
                                >
                                    {value.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View className='px-3 flex flex-1 space-y-4'>
                        <Text className='text-xl font-nunitoSemi text-gray-700 mt-4'>
                            Room Topic
                        </Text>
                        <TouchableOpacity
                            onPress={() => setConfirmedModalVisible(true)}
                            className='bg-white py-4 px-2 rounded-xl flex flex-row justify-between items-center'
                        >
                            <Text className='text-lg font-nunitoSemi text-gray-700'>
                                {selectedTopic ? selectedTopic.header : 'Select a topic'}
                            </Text>
                            <FontAwesomeIcon icon={faAngleRight} size={25} color='#374151' />
                        </TouchableOpacity>
                    </View>
                    <View className='px-3 flex flex-1 space-y-4'>
                        <Text className='text-xl font-nunitoSemi text-gray-700 mt-4'>
                            Room name
                        </Text>
                        <TextInput
                            value={content}
                            onChange={handleContentChange}
                            onBlur={handleContentBlur}
                            multiline={true}
                            className='bg-white py-4 px-3 rounded-xl text-lg font-nunitoRegular'
                            placeholder='Enter room name'
                        />
                        {contentHasError && contentDidEdit && (
                            <Text className='text-base font-nunitoMedium text-red-400'>
                                This field is required!
                            </Text>
                        )}
                    </View>
                    <View className='px-3 flex flex-1 space-y-4'>
                        <Text className='text-xl font-nunitoSemi text-gray-700 mt-4'>Duration</Text>
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                            className='bg-white py-4 px-2 rounded-xl flex flex-row justify-between items-center'
                        >
                            <Text className='text-lg font-nunitoSemi text-gray-700'>
                                {selectedDuration ? selectedDuration + 'h' : 'Select duration'}
                            </Text>
                            <FontAwesomeIcon icon={faAngleRight} size={25} color='#374151' />
                        </TouchableOpacity>
                    </View>
                    <View className='px-3 flex flex-1 flex-row items-center justify-between'>
                        <Text className='text-xl font-nunitoSemi text-gray-700'>
                            Schedule the room
                        </Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                    {isEnabled && (
                        <View className='mx-6 flex space-y-4 flex-1'>
                            <Text className='text-lg font-nunitoSemi text-gray-700'>Date</Text>
                            <TouchableOpacity
                                onPress={() => setShowDP(true)}
                                className='bg-white py-4 px-2 rounded-xl flex flex-row justify-between items-center'
                            >
                                <Text className='text-lg font-nunitoSemi text-gray-700'>
                                    {selectedTime
                                        ? Helper.formatDateTime(selectedTime)
                                        : 'Select your date'}
                                </Text>
                                <CalendarDaysIcon size={25} color='#374151' />
                            </TouchableOpacity>
                            {showDP && (
                                <RNDateTimePicker
                                    mode={mode}
                                    display={mode === 'date' ? 'calendar' : 'spinner'}
                                    value={selectedDate}
                                    onChange={onChange}
                                />
                            )}
                        </View>
                    )}
                    <View className='px-3 flex flex-1 flex-row items-center justify-between'>
                        <Text className='text-xl font-nunitoSemi text-gray-700'>Private room</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isPrivateRoom ? '#f5dd4b' : '#f4f3f4'}
                            onValueChange={toggle}
                            value={isPrivateRoom}
                        />
                    </View>
                    {isPrivateRoom && (
                        <View className='mx-6 flex space-y-4 flex-1'>
                            <Text className='text-lg font-nunitoSemi text-gray-700'>Password</Text>
                            <TextInput
                                value={password}
                                onChange={handlePasswordChange}
                                onBlur={handlePasswordBlur}
                                className='bg-white py-2 px-3 rounded-xl border-[1px] border-slate-300 text-base font-nunitoRegular'
                                placeholder='Enter room password'
                            />
                            {passwordDidEdit && passwordHasError && (
                                <Text className='text-base font-nunitoMedium text-red-400'>
                                    Password must have 6 characters
                                </Text>
                            )}
                        </View>
                    )}
                    <View className='flex items-center justify-center my-4'>
                        <TouchableOpacity
                            disabled={contentHasError || passwordHasError || !selectedTopic}
                            onPress={handleCreate}
                            className='py-2 bg-yellow-400 rounded-xl'
                            style={{ elevation: 6, shadowColor: '#0f172a' }}
                        >
                            <Text className='text-xl font-nunitoBold text-center text-gray-700 px-8 py-2'>
                                Create a room
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <Modal
                isVisible={confirmedModalVisible}
                onBackButtonPress={() => setConfirmedModalVisible(!confirmedModalVisible)}
                onBackdropPress={() => setConfirmedModalVisible(!confirmedModalVisible)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <View className='flex flex-col bg-slate-100 rounded-2xl p-4 space-y-4 w-[100%] max-h-[70%]'>
                    <Text className='text-sky-600 text-center text-xl font-nunitoBold'>
                        Choose a topic
                    </Text>
                    <View
                        style={{
                            borderBottomColor: '#d1d5db',
                            borderBottomWidth: 2,
                            marginTop: 10,
                        }}
                    />
                    <FlatList
                        data={topics}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <VocabSection
                                press={() => {
                                    setSelectedTopic(item);
                                    setConfirmedModalVisible(false);
                                }}
                                topic={true}
                                header={item.header}
                                key={index}
                            />
                        )}
                    />
                </View>
            </Modal>
            <Modal
                isVisible={modalVisible}
                onBackButtonPress={() => setModalVisible(!modalVisible)}
                onBackdropPress={() => setModalVisible(!modalVisible)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <View className='flex flex-col bg-slate-100 rounded-2xl p-4 space-y-4 w-[100%] max-h-[70%]'>
                    <Text className='text-sky-600 text-center text-xl font-nunitoBold'>
                        Choose duration
                    </Text>
                    <View
                        style={{
                            borderBottomColor: '#d1d5db',
                            borderBottomWidth: 2,
                            marginTop: 10,
                        }}
                    />
                    <FlatList
                        data={arr}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <VocabSection
                                press={() => {
                                    setSelectedDuration(item);
                                    setModalVisible(false);
                                }}
                                topic={true}
                                header={item + 'h'}
                                key={index}
                            />
                        )}
                    />
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default CreateARoom;
