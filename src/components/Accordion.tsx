import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface IAccordion {
    header: string;
    content: string;
}

const Accordion = ({ header, content }: IAccordion) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} className='mt-4'>
            <View className='flex flex-row justify-between items-center'>
                <Text className='w-[93%] text-gray-700 text-lg font-nunitoSemi'>{header}</Text>
                <FontAwesomeIcon
                    icon={isExpanded ? faAngleDown : faAngleRight}
                    size={20}
                    color='#374151'
                />
            </View>
            {isExpanded && (
                <Text className='text-base text-gray-700 mt-2 font-nunitoRegular'>{content}</Text>
            )}
        </TouchableOpacity>
    );
};

export default Accordion;
