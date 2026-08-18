import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar } from './Avatar';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type TPersonRowProps = {
  name: string;
  position: string;
  phone: string;
  onPressPhone: () => void;
};

export const PersonRow = ({ name, position, phone, onPressPhone }: TPersonRowProps) => {
  return (
    <View style={styles.row}>
      <Avatar label={name} size={36} backgroundColor={colors.border} textColor={colors.textMuted} />
      <View style={styles.info}>
        <Text style={typography.primaryText}>{name}</Text>
        <Text style={styles.position}>{position}</Text>
      </View>
      <Pressable onPress={onPressPhone}>
        <Text style={typography.linkText}>{phone}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  position: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
