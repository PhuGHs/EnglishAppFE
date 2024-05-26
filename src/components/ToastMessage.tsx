import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { ToastConfigs } from '@root/context/toast-context';
import { StyleSheet } from 'react-native';

const ToastMessage = forwardRef(({ type, description, timeout = 3000 }: ToastConfigs, ref) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const TOAST_TYPE = {
        success: {
            backgroundColor: '#2ecc71',
        },
        danger: {
            backgroundColor: '#e74c3c',
        },
        info: {
            backgroundColor: '#3498db',
        },
        warning: {
            backgroundColor: '#f39c12',
        },
    };

    const showToast = () => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsVisible(false);
            clearTimeout(timer);
        }, timeout);
    };

    useImperativeHandle(ref, () => ({
        show: showToast,
    }));

    const validType = Object.keys(TOAST_TYPE).includes(type) ? type : 'info';
    const backgroundColor = TOAST_TYPE[validType].backgroundColor;

    return (
        <>
            {isVisible && (
                <Animated.View
                    style={[styles.toastContainer, { backgroundColor }]}
                    entering={FadeInUp.delay(200)}
                    exiting={FadeOutUp}
                >
                    <View style={styles.messageContainer}>
                        <Text className='text-base text-white font-nunitoMedium'>
                            {description}
                        </Text>
                    </View>
                </Animated.View>
            )}
        </>
    );
});

const styles = StyleSheet.create({
    toastContainer: {
        position: 'absolute',
        top: 25,
        left: '15%',
        right: '15%',
        width: '70%',
        height: 'auto',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        shadowColor: '#000',
        opacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    messageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default ToastMessage;
