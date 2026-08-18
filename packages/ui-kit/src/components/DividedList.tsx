import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';

type TDividedListProps = {
  children: React.ReactNode;
};

// возвращает строки инфоблоков
export const DividedList = ({ children }: TDividedListProps) => {
  const items = React.Children.toArray(children);

  return (
    <>
      {items.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {index < items.length - 1 && <View style={styles.divider} />}
        </React.Fragment>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
});
