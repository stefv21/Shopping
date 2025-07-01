// app/shoppinglists.tsx
import React from 'react';
import ShoppingLists from '../components/ShoppingLists';
import { useSearchParams } from 'expo-router';

export default function ShoppingListsPage() {
  const { userID } = useSearchParams();
  return <ShoppingLists userID={userID} />;
}
