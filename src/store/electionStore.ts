import create from 'zustand';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useFirebase } from '../contexts/FirebaseContext';

interface ElectionStore {
  votes: Record<string, number>;
  demographics: Record<string, any>;
  loading: boolean;
  error: string | null;
  fetchVotes: () => Promise<void>;
  fetchDemographics: () => Promise<void>;
}

export const useElectionStore = create<ElectionStore>((set) => ({
  votes: {},
  demographics: {},
  loading: false,
  error: null,
  fetchVotes: async () => {
    const { db } = useFirebase();
    set({ loading: true });
    try {
      const votesRef = collection(db, 'votes');
      const snapshot = await getDocs(votesRef);
      const votes = {};
      snapshot.forEach((doc) => {
        votes[doc.id] = doc.data();
      });
      set({ votes, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  fetchDemographics: async () => {
    const { db } = useFirebase();
    set({ loading: true });
    try {
      const demographicsRef = collection(db, 'demographics');
      const snapshot = await getDocs(demographicsRef);
      const demographics = {};
      snapshot.forEach((doc) => {
        demographics[doc.id] = doc.data();
      });
      set({ demographics, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));