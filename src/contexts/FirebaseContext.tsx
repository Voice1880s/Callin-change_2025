import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBxJvRZTF9gxKqnrHYvDrqHVt-UVyQgQRw",
  authDomain: "cameroon-election-2025.firebaseapp.com",
  projectId: "cameroon-election-2025",
  storageBucket: "cameroon-election-2025.appspot.com",
  messagingSenderId: "458794575633",
  appId: "1:458794575633:web:5a8d8f3f9c9b9b9b9b9b9b"
};

interface FirebaseContextType {
  db: any;
  votes: Record<string, any>;
  loading: boolean;
  error: Error | null;
}

const FirebaseContext = createContext<FirebaseContextType>({
  db: null,
  votes: {},
  loading: true,
  error: null
});

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [votes, setVotes] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [db, setDb] = useState<any>(null);

  useEffect(() => {
    try {
      const app = initializeApp(firebaseConfig);
      const firestore = getFirestore(app);
      setDb(firestore);

      const votesRef = collection(firestore, 'votes');
      const unsubscribe = onSnapshot(votesRef, 
        (snapshot) => {
          const votesData: Record<string, any> = {};
          snapshot.forEach((doc) => {
            votesData[doc.id] = doc.data();
          });
          setVotes(votesData);
          setLoading(false);
        },
        (error) => {
          console.error('Error fetching votes:', error);
          setError(error as Error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error('Error initializing Firebase:', error);
      setError(error as Error);
      setLoading(false);
    }
  }, []);

  return (
    <FirebaseContext.Provider value={{ db, votes, loading, error }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;