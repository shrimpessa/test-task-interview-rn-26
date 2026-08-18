import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

type TButtonProps = {
  label: string;
  onPress: () => void;
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const Button = ({ label, onPress, compact, style }: TButtonProps) => {
  return (
    <Pressable style={[styles.button, compact && styles.buttonCompact, style]} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  buttonCompact: {
    borderRadius: 8,
    paddingVertical: 8,
  },
  label: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
