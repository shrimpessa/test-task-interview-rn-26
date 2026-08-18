import { Linking } from 'react-native';

export const openPhone = (phone: string): void => {
  Linking.openURL(`tel:${phone.replace(/[^\d+]/g, '')}`);
};

export const openEmail = (email: string): void => {
  Linking.openURL(`mailto:${email}`);
};
