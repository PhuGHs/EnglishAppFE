import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import LeaderboardTabs from '@component/LeaderboardTabs';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LeaderboardUser from '@component/LeaderboardUser';
import LeaderboardTopUser from '@component/LeaderboardTopUser';
import { LeaderBoardScreenProps } from '@type/index';
import { TLeaderboardDto } from '@type/T-type';
import { LeaderboardApi } from '@root/api/leaderboard.api';
import { FlatList } from 'react-native-gesture-handler';

const LeaderBoard = ({ navigation }: LeaderBoardScreenProps) => {
    const [selectedType, setSelectedType] = useState('Today');
    const [users, setUsers] = useState<TLeaderboardDto[]>([]);
    const [topThreeUsers, setTopThreeUsers] = useState<TLeaderboardDto[]>([]);
    const [remainingUsers, setRemainingUsers] = useState<TLeaderboardDto[]>([]);

    const handleSetType = (type: string) => {
        setSelectedType(type);
    };

    useEffect(() => {
        console.log('come outside');
        const fetch = async () => {
            console.log('come inside');
            if (selectedType === 'Today') {
                const { data } = await LeaderboardApi.getWeek(0, 50);
                setUsers(data);
            } else if (selectedType === 'Week') {
                const { data } = await LeaderboardApi.getMonth(0, 50);
                setUsers(data);
            } else if (selectedType === 'Month') {
                const { data } = await LeaderboardApi.getYear(0, 50);
                setUsers(data);
            }
        };
        fetch();
    }, [selectedType]);

    useEffect(() => {
        const topThree = users.slice(0, 3);
        const remaining = users.slice(3);
        setTopThreeUsers(topThree);
        setRemainingUsers(remaining);
    }, [users]);

    return (
        <SafeAreaView className='flex flex-1 bg-[#00224D]'>
            <View className='flex flex-row my-4 px-3 justify-between'>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <FontAwesomeIcon icon={faAngleLeft} size={25} color='white' />
                </TouchableOpacity>
                <Text className='font-nunitoMedium text-white text-2xl'>Leaderboard</Text>
                <View className='w-[4%]'></View>
            </View>
            <LeaderboardTabs selectedType={selectedType} handlePress={handleSetType} />
            <View className='flex flex-row items-end justify-evenly mb-4'>
                <LeaderboardTopUser index={2} item={topThreeUsers[1]} />
                <LeaderboardTopUser index={1} item={topThreeUsers[0]} />
                <LeaderboardTopUser index={3} item={topThreeUsers[2]} />
            </View>
            <FlatList
                data={remainingUsers}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <LeaderboardUser item={item} index={index + 4} />}
                contentContainerStyle={{
                    padding: 3,
                    margin: 3,
                }}
            />
        </SafeAreaView>
    );
};

export default LeaderBoard;
