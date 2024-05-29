import CircularProgress from '@component/CircularProgress';
import Missions from '@component/Missions';
import { faArrowLeft, faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { MissionApi } from '@root/api/mission.api';
import { useToast } from '@root/context/toast-context';
import { UserContext } from '@root/context/user-context';
import { MissionScreenProps, TUserMission } from '@type/index';
import React, { useContext, useEffect, useState } from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';

function getPercentage(missions: TUserMission[]): { percentage: number; completedTasks: number } {
    if (missions.length == 0) return { percentage: 0, completedTasks: 0 };
    let count = 0;
    missions.forEach((element) => {
        if (element.is_completed) count++;
    });
    return { completedTasks: count, percentage: (count * 100) / missions.length };
}

const MissionScreen = ({ navigation }: MissionScreenProps) => {
    const [missions, setMissions] = useState<TUserMission[]>([]);
    const [percentage, setPercentage] = useState<number>(0);
    const [numberOfTasksCompleted, setNumberOfTasksCompleted] = useState<number>(0);
    const [hasFetched, setFetched] = useState<boolean>(true);
    const { user } = useContext(UserContext);
    const { showToast } = useToast();
    const { user_id } = user.user;

    useEffect(() => {
        const fetchMissions = async () => {
            setFetched(false);
            const { status, message, data } = await MissionApi.getUserMissions(user_id);
            if (status == 'FAIL') {
                showToast({ type: 'danger', description: message, timeout: 2000 });
                return;
            }
            setMissions(data as TUserMission[]);
            const { completedTasks, percentage } = getPercentage(data as TUserMission[]);
            setNumberOfTasksCompleted(completedTasks);
            setPercentage(percentage);
            setFetched(true);
        };
        fetchMissions();
    }, []);

    return (
        <>
            <SafeAreaView className='flex flex-1 p-4 bg-slate-100 h-full w-full'>
                <View className='flex flex-row justify-between items-center mt-3'>
                    <TouchableOpacity
                        className='bg-yellow-400 p-2 rounded-tl-xl rounded-br-xl w-[40px] h-[40px] flex items-center justify-center'
                        onPress={() => navigation.pop()}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} color='#374151' size={25} />
                    </TouchableOpacity>
                    <Text className='text-[22px] text-sky-600 font-nunitoBold'>Daily Missions</Text>
                    <TouchableOpacity onPress={() => navigation.push('LeaderBoard')}>
                        <FontAwesomeIcon icon={faRankingStar} color='#0ea5e9' size={40} />
                    </TouchableOpacity>
                </View>
                <View className='mt-8 space-y-6'>
                    <Text className='text-[#374151] font-nunitoBold text-4xl mt-5'>
                        New exciting tasks waiting you
                    </Text>
                    <View className='w-full flex p-4 flex-row bg-[#1679AB] rounded-3xl justify-evenly space-x-4'>
                        <CircularProgress
                            size={100}
                            fontSize={24}
                            progress={percentage}
                            strokeWidth={10}
                            backgroundColor='white'
                            progressColor='#5AB2FF'
                            textColor='white'
                        />
                        <View className='flex flex-col justify-evenly items-start w-[60%]'>
                            <Text className='text-2xl font-nunitoXBold text-white'>
                                You've done all the tasks
                            </Text>
                            <Text className='text-white'>
                                {numberOfTasksCompleted} out of {missions.length} tasks completed
                            </Text>
                        </View>
                    </View>
                    <Text className='text-2xl font-nunitoBold text-[#1679AB] mb-4'>
                        Today Tasks
                    </Text>
                    <Missions missions={missions} />
                </View>
            </SafeAreaView>
            {!hasFetched && (
                <View style={styles.overlay}>
                    <ActivityIndicator size='large' color='#0000ff' />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default MissionScreen;
