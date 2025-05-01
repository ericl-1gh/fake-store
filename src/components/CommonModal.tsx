import React from 'react';
import {Modal, StyleSheet} from 'react-native';

type Props = {
  onClose?: () => void;
  isVisible: boolean;
  children: React.ReactNode;
};

const CommonModal = (props: Props) => {
  const {onClose, isVisible, children} = props;
  return (
    <Modal
      visible={isVisible}
      style={[styles.modalContainer]}
      transparent
      onRequestClose={onClose}
      animationType="slide">
      {children}
    </Modal>
  );
};

export {CommonModal};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
});
