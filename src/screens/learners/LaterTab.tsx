import EngComRooms from '@component/EngComRooms';
import FilterButton from '@component/FilterButton';
import React, { useState } from 'react';
import { View } from 'react-native';
import moment, { Moment } from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import { ChevronLeftIcon, ChevronRightIcon } from 'react-native-heroicons/solid';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const LaterTab = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState<Moment>(moment());
    const datesWhiteList = [{
        start: moment(),
        end: moment().add(31, 'days')
    }];

    const renderFontAwesomeIcon = (icon) => (
        <FontAwesomeIcon icon={icon} size={20} color="white" />
    );
    return (
        <View className='flex flex-col justify-center'>
            <CalendarStrip
                calendarAnimation={{ type: 'sequence', duration: 30}}
                daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white'}}
                style={{height: 120, paddingTop: 20, paddingBottom: 10, borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}
                calendarHeaderStyle={{color: 'white'}}
                calendarColor={'#0284c7'}
                dateNumberStyle={{color: 'white'}}
                dateNameStyle={{color: 'white'}}
                highlightDateNumberStyle={{color: '#facc15'}}
                highlightDateNameStyle={{color: '#facc15'}}
                disabledDateNameStyle={{color: 'grey'}}
                disabledDateNumberStyle={{color: 'grey'}}
                datesWhitelist={datesWhiteList}
                iconLeft={() => renderFontAwesomeIcon(faAngleLeft)}
                iconRight={() => renderFontAwesomeIcon(faAngleRight)}
                iconContainer={{flex: 0.01}}
                numDaysInWeek={7}
                scrollerPaging={true}
                scrollable={true}
                selectedDate={selectedDate}
                onDateSelected={(date: Moment) => setSelectedDate(date)}
            />
            <EngComRooms horizontal={false} navigation={navigation} />
        </View>
    );
};

export default LaterTab;
