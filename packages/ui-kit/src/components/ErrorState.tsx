import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from './Button';
import { colors } from '../theme/colors';

type TErrorStateProps = {
  message: string;
  onRetry?: () => void;
};

export const ErrorState = ({ message, onRetry }: TErrorStateProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {onRetry && <Button label="Повторить" onPress={onRetry} compact />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  message: {
    fontSize: 14,
    color: colors.danger,
    textAlign: 'center',
  },
});
