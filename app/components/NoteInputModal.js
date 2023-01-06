import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import RoundIconBtn from '../components/RoundIconBtn';
import colors from '../misc/colors';

const NoteInputModal = ({ visible, onClose, onSubmit, note, isEdit }) => {
  const [title, setTitle] = useState('');

  const [desc, setDesc] = useState('');
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(note.title);
      setDesc(note.desc);
    }
  }, [isEdit]);

  const handlesOnChangeText = (text, valueFor) => {
    if (valueFor === 'title') setTitle(text);
    if (valueFor === 'desc') setDesc(text);
  };
  //console.log(title, desc);
  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();
    if (isEdit) {
      onSubmit(title, desc, Date.now());
    } else {
      onSubmit(title, desc);
      setTitle('');
      setDesc('');
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setTitle('');
      setDesc('');
    }
    onClose();
  };

  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType="fade">
        <View style={styles.container}>
          <TextInput
            value={title}
            onChangeText={(text) => handlesOnChangeText(text, 'title')}
            placeholder="Title"
            style={[styles.input, styles.title]}
          />
          <TextInput
            value={desc}
            onChangeText={(text) => handlesOnChangeText(text, 'desc')}
            multiline
            placeholder="Notes"
            style={[styles.input, styles.desc]}
          />
          <View style={styles.btnContainer}>
            <RoundIconBtn
              onPress={handleSubmit}
              size={15}
              anticonName="check"
            />
            {title.trim() || desc.trim() ? (
              <RoundIconBtn
                size={15}
                style={{ marginLeft: 15 }}
                anticonName="close"
                onPress={closeModal}
              />
            ) : null}
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]}></View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    fontSize: 20,
    color: colors.DARK,
  },
  title: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  desc: {
    height: 100,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
  },
});

export default NoteInputModal;
