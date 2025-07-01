// components/ShoppingLists.js
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {
  collection,
  addDoc,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../firebase';

export default function ShoppingLists() {
  const [lists, setLists]       = useState([]);
  const [listName, setListName] = useState('');
  const [item1, setItem1]       = useState('');
  const [item2, setItem2]       = useState('');

  // Real-time listener
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'shoppinglists'),
      snapshot => {
        const newLists = [];
        snapshot.forEach(doc =>
          newLists.push({ id: doc.id, ...doc.data() })
        );
        setLists(newLists);
      },
      error => {
        console.error('Listener error:', error);
      }
    );

    // Cleanup on unmount
    return () => unsub();
  }, []);

  // Add a new list
  const addShoppingList = async newList => {
    try {
      const ref = await addDoc(collection(db, 'shoppinglists'), newList);
      if (ref.id) {
        Alert.alert(`The list "${listName}" has been added.`);
        // inputs will reset when real-time listener updates `lists`
        setListName('');
        setItem1('');
        setItem2('');
      } else {
        Alert.alert('Unable to add. Please try later');
      }
    } catch (e) {
      console.error('Error adding list:', e);
      Alert.alert('Error adding list. See console for details.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={lists}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>
              {item.name}: {Array.isArray(item.items) ? item.items.join(', ') : ''}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No lists found</Text>}
      />

      <View style={styles.listForm}>
        <TextInput
          style={styles.listName}
          placeholder="List Name"
          value={listName}
          onChangeText={setListName}
        />
        <TextInput
          style={styles.item}
          placeholder="Item #1"
          value={item1}
          onChangeText={setItem1}
        />
        <TextInput
          style={styles.item}
          placeholder="Item #2"
          value={item2}
          onChangeText={setItem2}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            const newList = { name: listName, items: [item1, item2] };
            addShoppingList(newList);
          }}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {Platform.OS === 'ios' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  listItem: {
    height: 70,
    justifyContent: 'center',
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#AAA',
  },
  listForm: {
    flexBasis: 275,
    margin: 15,
    padding: 15,
    backgroundColor: '#CCC',
  },
  listName: {
    height: 50,
    padding: 15,
    fontWeight: '600',
    marginBottom: 15,
    borderColor: '#555',
    borderWidth: 2,
  },
  item: {
    height: 50,
    padding: 15,
    marginBottom: 15,
    borderColor: '#555',
    borderWidth: 2,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#000',
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 20,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});
