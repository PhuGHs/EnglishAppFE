import { IconDefinition, IconName, IconParams, icon } from '@fortawesome/fontawesome-svg-core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface IVocabSection {
    icon?: IconDefinition;
    header: string;
    subtitle: string;
}

const VocabSection = ({ icon, header, subtitle }: IVocabSection) => {
    return (
        <TouchableOpacity className="rounded-xl bg-white w-full h-fit p-4 mt-4 flex flex-row items-center justify-between">
            {icon && <FontAwesomeIcon icon={icon} size={40} color="#005DB2" />}
            <View className="ml-4 flex flex-col justify-between items-start w-[78%]">
                <Text className="text-gray-700 text-xl font-bold">{header}</Text>
                <Text className="text-gray-500 text-base">{subtitle}</Text>
            </View>
            <FontAwesomeIcon icon={faAngleRight} size={25} color="#374151" />
        </TouchableOpacity>
    );
};

export default VocabSection;
