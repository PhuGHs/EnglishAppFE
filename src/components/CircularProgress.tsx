import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

const CircularProgress = ({
    size,
    progress,
    strokeWidth,
    backgroundColor,
    progressColor,
    textColor,
    fontSize,
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progressStrokeDashoffset = circumference - (progress / 100) * circumference;
    const centerX = size / 2;
    const centerY = size / 2;
    const textY = centerY + radius / 2 - fontSize / 2;

    return (
        <View style={{ alignItems: 'center' }}>
            <Svg width={size} height={size}>
                <Circle
                    cx={centerX}
                    cy={centerY}
                    r={radius}
                    fill='none'
                    stroke={backgroundColor}
                    strokeWidth={strokeWidth}
                />
                <Circle
                    cx={centerX}
                    cy={centerY}
                    r={radius}
                    fill='none'
                    stroke={progressColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={progressStrokeDashoffset}
                />
                <SvgText
                    x={centerX}
                    y={textY}
                    textAnchor='middle'
                    fontSize='24'
                    fill={textColor}
                    fontWeight='bold'
                >
                    {`${progress}%`}
                </SvgText>
            </Svg>
        </View>
    );
};

export default CircularProgress;
