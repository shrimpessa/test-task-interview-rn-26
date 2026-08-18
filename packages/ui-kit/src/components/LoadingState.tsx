import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

type TLoadingStateProps = {
  label?: string;
};

export const LoadingState = ({ label = 'Загрузка...' }: TLoadingStateProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
