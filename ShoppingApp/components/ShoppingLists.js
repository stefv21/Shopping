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
  Platform,
} from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function ShoppingLists() {
  const [lists, setLists] = useState([]);

  // new state for your form inputs
  const [listName, setListName] = useState('');
  const [item1, setItem1] = useState('');
  const [item2, setItem2] = useState('');

  const fetchShoppingLists = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'shoppinglists'));
      const newLists = [];
      snapshot.forEach(doc => newLists.push({ id: doc.id, ...doc.data() }));
      setLists(newLists);
    } catch (e) {
      console.error('Error fetching shopping lists:', e);
    }
  };

  useEffect(() => {
    fetchShoppingLists();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listsContainer}
        data={lists}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>
              {item.name}: {item.items.join(', ')}
            </Text>
          </View>
        )}
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
        <TouchableOpacity style={styles.addButton} onPress={() => { /* TODO: add list */ }}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null}
    </View>
  );
}  // ← close your component here

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    marginRight: 50,
    marginBottom: 15,
    borderColor: '#555',
    borderWidth: 2,
  },
  item: {
    height: 50,
    padding: 15,
    marginLeft: 50,
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
});
