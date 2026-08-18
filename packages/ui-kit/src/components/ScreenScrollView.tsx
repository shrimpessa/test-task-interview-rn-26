import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

type TScreenScrollViewProps = {
  children: React.ReactNode;
};

export const ScreenScrollView = ({ children }: TScreenScrollViewProps) => {
  return <ScrollView style={styles.container}>{children}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
