import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import { useNotes } from '../contexts/NoteProvider';
import NoteInputModal from './NoteInputModal';
//import AsyncStorage from '@react-native-async-storage/async-storage';

const formatDate = (ms) => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  return `${day}/${month}/${year} - ${hour}:${min}:${sec}`;
};

const NoteDetail = (props) => {
  const [note, setNote] = useState(props.route.params.note);
  const headerHeight = useHeaderHeight();
  const { setNotes } = useNotes();
  const [showModal, setShowmodal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const deleteNote = async () => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter((n) => n.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    props.navigation.goBack();
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      'Are You Sure!',
      'This action will delete your note permanently!',
      [
        {
          text: 'Delete',
          onPress: deleteNote,
        },
        {
          text: 'Cancel',
          onPress: () => console.log('no thanks'),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleOnClose = () => {
    // setNotes([]);
    setShowmodal(false);
  };
  const handleUpdate = async (title, desc, time) => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter((n) => {
      if (n.id === note.id) {
        n.title = title;
        n.desc = desc;
        n.isUpdated = true;
        n.time = time;
        setNote(n);
      }
      return n;
    });
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  };

  const openEditModal = () => {
    setIsEdit(true);
    setShowmodal(true);
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}
      >
        <Text style={styles.time}>
          {note.isUpdated
            ? `Updated At  ${formatDate(note.time)}`
            : `Created At  ${formatDate(note.time)}`}
        </Text>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.desc}>{note.desc}</Text>
      </ScrollView>
      <View style={styles.btnContainer}>
        <RoundIconBtn
          anticonName="delete"
          onPress={displayDeleteAlert}
          style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
        />
        <RoundIconBtn anticonName="edit" onPress={openEditModal} />
      </View>
      <NoteInputModal
        isEdit={isEdit}
        note={note}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        visible={showModal}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    //   flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 30,
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 20,
    opacity: 0.6,
  },
  time: {
    fontSize: 12,
    textAlign: 'right',
    opacity: 0.5,
  },
  btnContainer: {
    position: 'absolute',
    right: 15,
    bottom: 50,
  },
});

export default NoteDetail;
