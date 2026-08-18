import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

const VALUE_MAX_LINES = 2;

type TProps = {
  label: string;
  value: string;
  onPress?: () => void;
};

export const Row = ({ label, value, onPress }: TProps) => {
  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper style={styles.row} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
      <Text
        style={[onPress ? typography.linkText : typography.primaryText, styles.value]}
        numberOfLines={VALUE_MAX_LINES}
        ellipsizeMode="tail"
      >
        {value}
      </Text>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    flexShrink: 0,
    marginRight: 12,
  },
  value: {
    flex: 1,
    textAlign: 'right',
  },
});
