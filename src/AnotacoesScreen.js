import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('notes').then((savedNotes) => {
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    });
  }, []);

  const saveNotes = (updatedNotes) => {
    setNotes(updatedNotes);
    AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const addOrUpdateNote = () => {
    if (text.trim() !== '') {
      if (selectedNoteIndex !== null) {
        const updatedNotes = [...notes];
        const now = new Date();
        const editedText = text + `\n\nEditado em: ${now.toLocaleString()}`;
        updatedNotes[selectedNoteIndex] = editedText;
        saveNotes(updatedNotes);
        setSelectedNoteIndex(null);
      } else {
        const now = new Date();
        const noteText = text + `\n\nCriado em: ${now.toLocaleString()}`;
        saveNotes([...notes, noteText]);
      }
      setText('');
      setIsModalVisible(false);
    }
  };

  const editNote = (index) => {
    setSelectedNoteIndex(index);
    setText(notes[index].split('\n\n')[0]);
    setIsModalVisible(true);
  };

  const confirmDeleteNote = (index) => {
    Alert.alert(
      'Excluir Nota',
      'Tem certeza de que deseja excluir esta nota?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => deleteNote(index),
        },
      ]
    );
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    saveNotes(updatedNotes);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.notesContainer}>
        {notes.map((note, index) => (
          <TouchableOpacity
            key={index}
            onLongPress={() => confirmDeleteNote(index)}
            onPress={() => editNote(index)}
            style={styles.noteContainer}
          >
            <View style={styles.note}>
              <Text>{note.split('\n\n')[0]}</Text>
              <Text style={styles.noteTimestamp}>
                {note.split('\n\n')[1]}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
       <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOuterContainer}>
          <View style={styles.modalInnerContainer}>
            <TextInput
              style={styles.input}
              placeholder="Digite sua anotação"
              onChangeText={(text) => setText(text)}
              value={text}
            />
            <View style={styles.modalButtonContainer}>
              <Button title="Adicionar/Editar" onPress={addOrUpdateNote} />
              <Button title="Cancelar" onPress={() => setIsModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  notesContainer: {
    flex: 1,
    marginTop: 10,
  },
  noteContainer: {
    margin: 10,
    backgroundColor: 'white',
    elevation: 15,
    borderRadius: 8,
  },
  note: {
    padding: 10,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: 'blue',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
  },
  modalOuterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalInnerContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  noteTimestamp: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'right',
  },
});

export default App;
