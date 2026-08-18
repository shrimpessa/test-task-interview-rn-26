import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from './Avatar';
import { colors } from '../theme/colors';

type TAvatarHeaderSubtitle = {
  text: string;
  color?: string;
};

type TAvatarHeaderProps = {
  title: string;
  subtitleLines?: TAvatarHeaderSubtitle[];
  avatarColor?: string;
};

export const AvatarHeader = ({ title, subtitleLines, avatarColor }: TAvatarHeaderProps) => {
  return (
    <View style={styles.header}>
      <Avatar label={title} backgroundColor={avatarColor} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        {subtitleLines?.map((line) => (
          <Text key={line.text} style={[styles.subtitle, line.color && { color: line.color }]}>
            {line.text}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  info: {
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
