// components/ShoppingLists.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ShoppingLists() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Shopping Lists</Text>
      {/* TODO: we’ll fetch and render Firestore data here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
