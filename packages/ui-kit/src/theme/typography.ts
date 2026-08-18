import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const typography = StyleSheet.create({
  primaryText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
});
