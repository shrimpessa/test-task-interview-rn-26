import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

type TAvatarProps = {
  label: string;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
};

export const Avatar = ({
  label,
  size = 56,
  backgroundColor = colors.primary,
  textColor = '#fff',
}: TAvatarProps) => {
  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2, backgroundColor },
      ]}
    >
      <Text style={[styles.label, { fontSize: size * 0.4, color: textColor }]}>
        {label[0]?.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '600',
  },
});
