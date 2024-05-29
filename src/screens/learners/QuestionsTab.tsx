import EngComQAs from '@component/EngComQA';
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import SearchBar from '@component/SearchBar';
import { EngComAskScreenProps } from '@type/index';
import { UserContext } from '@root/context/user-context';
import { TDiscussionDto } from '@type/T-type';
import { DiscussionApi } from '@root/api/discussion.api';

const QuestionsTab = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const { user_id } = user.user;
    const [discussions, setDiscussions] = useState<TDiscussionDto[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const { content } = await DiscussionApi.getUserDiscussions(
                    user_id,
                    0,
                    10,
                    'createdDate'
                );
                setDiscussions(content);
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
    }, []);

    return (
        <View className='flex bg-slate-100 flex-1 p-3'>
            <SearchBar />
            <EngComQAs data={discussions} horizontal={false} navigation={navigation} />
        </View>
    );
};

export default QuestionsTab;
