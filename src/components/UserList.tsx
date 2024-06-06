import {
    faCrown,
    faHeadphones,
    faMicrophone,
    faUserMinus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TParticipantDto, TUserNecessary } from '@type/T-type';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Image } from 'react-native';

interface IUserList {
    participant: TParticipantDto;
    currentParticipant: TParticipantDto;
    handlePromote?: () => void;
    handleKick?: () => void;
}

const UserList = ({ participant, handlePromote, handleKick, currentParticipant }: IUserList) => {
    const { is_owner, user, is_speaker } = participant;
    const { full_name, profile_picture, english_level } = user;
    return (
        <View className='flex flex-row mb-2'>
            <View className='w-[23%] items-center justify-center mr-2'>
                <Image
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50 / 2,
                    }}
                    source={{ uri: profile_picture }}
                />
                <View
                    className='bg-white flex items-center justify-center absolute top-0 right-0'
                    style={{
                        width: 25,
                        height: 25,
                        borderRadius: 25 / 2,
                    }}
                >
                    {is_owner && <FontAwesomeIcon icon={faCrown} color='#fb923c' size={18} />}
                    {is_speaker && !is_owner && (
                        <FontAwesomeIcon icon={faMicrophone} color='#fb923c' size={18} />
                    )}
                    {!is_speaker && !is_owner && (
                        <FontAwesomeIcon icon={faHeadphones} color='#fb923c' size={18} />
                    )}
                </View>
            </View>
            <View className='flex flex-col justiby-around w-[50%]'>
                <Text className='text-slate-700 text-lg font-nunitoSemi'>{full_name}</Text>
                <Text className='text-[#005DB2] text-base font-nunitoSemi'>
                    {english_level.levelName}
                </Text>
            </View>
            <View className='w-[25%] flex flex-row items-center space-x-4 justify-center'>
                {currentParticipant.is_owner && (
                    <>
                        {currentParticipant.participant_id !== participant.participant_id && (
                            <View className='flex flex-row space-x-3'>
                                <TouchableOpacity
                                    onPress={handlePromote ? handlePromote : () => {}}
                                >
                                    <FontAwesomeIcon icon={faCrown} color='#fb923c' size={25} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleKick ? handleKick : () => {}}>
                                    <FontAwesomeIcon icon={faUserMinus} color='#f87171' size={25} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </>
                )}
            </View>
        </View>
    );
};

export default UserList;
