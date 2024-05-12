import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import LeaderboardTabs from '@component/LeaderboardTabs';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LeaderboardUser from '@component/LeaderboardUser';
import LeaderboardTopUser from '@component/LeaderboardTopUser';
import { LeaderBoardScreenProps } from '@type/index';

const LeaderBoard = ({ navigation }: LeaderBoardScreenProps) => {
    return (
        <SafeAreaView className='flex flex-1 bg-[#00224D]'>
            <View className='flex flex-row my-4 px-3'>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <FontAwesomeIcon icon={faAngleLeft} size={25} color='white' />
                </TouchableOpacity>
                <Text className='text-center w-full -left-[25px] font-nunitoMedium text-white text-2xl'>
                    Leaderboard
                </Text>
            </View>
            <LeaderboardTabs handlePress={() => {}}/>
            <ScrollView>
                <View className='flex flex-row items-end justify-evenly my-4'>
                    <LeaderboardTopUser top={2} points={10020}/>
                    <LeaderboardTopUser top={1} points={10120}/>
                    <LeaderboardTopUser top={3} points={9000}/>
                </View>
                <View className='flex flex-col mx-3 px-3'>
                    <LeaderboardUser />
                    <LeaderboardUser />
                    <LeaderboardUser />
                    <LeaderboardUser />
                    <LeaderboardUser />
                    <LeaderboardUser />
                    <LeaderboardUser />
                    <LeaderboardUser />
                    <LeaderboardUser />
                    <LeaderboardUser />
                    <LeaderboardUser />
                    <LeaderboardUser />
                    <LeaderboardUser />
                    <LeaderboardUser />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LeaderBoard;
