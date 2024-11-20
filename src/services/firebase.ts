// src/services/firebase.ts
import { db } from '../config/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  query, 
  where, 
  getDocs, 
  serverTimestamp 
} from 'firebase/firestore';

export interface UserData {
  id?: string;
  firstName: string;
  birthDate: Date;
  pet?: {
    has: boolean;
    type?: 'dog' | 'cat';
    name?: string;
  };
  lastMood?: {
    mood: string;
    timestamp: Date;
  };
  createdAt?: Date;
  lastLogin?: Date;
}

export const firebaseService = {
  async loginUser(firstName: string, birthDate: Date): Promise<UserData> {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, 
        where('firstName', '==', firstName),
        where('birthDate', '==', birthDate)
      );
      
      const querySnapshot = await getDocs(q);
      let userId: string;
      let userData: UserData;

      if (querySnapshot.empty) {
        const newUserRef = doc(collection(db, 'users'));
        userId = newUserRef.id;
        userData = {
          id: userId,
          firstName,
          birthDate,
          createdAt: new Date(),
          lastLogin: new Date()
        };
        await setDoc(newUserRef, userData);
      } else {
        userId = querySnapshot.docs[0].id;
        userData = { ...querySnapshot.docs[0].data(), id: userId } as UserData;
        await updateDoc(doc(db, 'users', userId), {
          lastLogin: serverTimestamp()
        });
      }

      return userData;
    } catch (error) {
      console.error('Error in loginUser:', error);
      throw error;
    }
  },

  async updateUser(userData: UserData): Promise<void> {
    try {
      if (!userData.id) {
        throw new Error('User ID is required for update');
      }

      const userRef = doc(db, 'users', userData.id);
      
      const updateData = {
        ...userData,
        lastUpdated: serverTimestamp(),
        // Convertir les dates en timestamps Firestore si nécessaire
        birthDate: userData.birthDate,
        pet: userData.pet || null, // Assure que undefined devient null
        lastMood: userData.lastMood || null
      };

      // Supprimer l'ID de l'objet avant la mise à jour
      delete updateData.id;

      await updateDoc(userRef, updateData);
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  async updateMood(userId: string, mood: string): Promise<void> {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        lastMood: {
          mood,
          timestamp: serverTimestamp()
        }
      });
    } catch (error) {
      console.error('Error updating mood:', error);
      throw error;
    }
  }
};