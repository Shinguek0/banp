import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

type BackProps = {} & TouchableWithoutFeedback['props'];

export const Back = ({ ...rest }: BackProps) => {
  return (
    <TouchableWithoutFeedback {...rest}>
      <Feather
        name="arrow-left"
        size={24}
        color="#fff"
      />
    </TouchableWithoutFeedback>
  );
};
