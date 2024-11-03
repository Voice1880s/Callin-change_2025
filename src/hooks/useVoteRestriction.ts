import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { generateDeviceFingerprint } from '../utils/deviceFingerprint';
import { useFirebase } from '../contexts/FirebaseContext';

interface VoteStatus {
  canVote: boolean;
  reason?: string;
}

export const useVoteRestriction = () => {
  const { db } = useFirebase();
  const [voteStatus, setVoteStatus] = useState<VoteStatus>({ canVote: true });
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkVoteEligibility = async () => {
      try {
        // Check localStorage
        const localVoteRecord = localStorage.getItem('hasVoted');
        if (localVoteRecord) {
          setVoteStatus({
            canVote: false,
            reason: 'You have already voted from this device.'
          });
          setChecking(false);
          return;
        }

        // Generate device fingerprint
        const deviceId = generateDeviceFingerprint();
        
        // Check Firestore for device fingerprint
        const deviceRef = doc(db, 'devices', deviceId);
        const deviceDoc = await getDoc(deviceRef);

        if (deviceDoc.exists()) {
          setVoteStatus({
            canVote: false,
            reason: 'A vote has already been recorded from this device.'
          });
          localStorage.setItem('hasVoted', 'true');
        } else {
          setVoteStatus({ canVote: true });
        }
      } catch (error) {
        console.error('Error checking vote eligibility:', error);
        setVoteStatus({
          canVote: false,
          reason: 'Unable to verify voting eligibility. Please try again later.'
        });
      } finally {
        setChecking(false);
      }
    };

    checkVoteEligibility();
  }, [db]);

  const recordVote = async () => {
    try {
      const deviceId = generateDeviceFingerprint();
      await setDoc(doc(db, 'devices', deviceId), {
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('hasVoted', 'true');
    } catch (error) {
      console.error('Error recording device vote:', error);
      throw new Error('Failed to record vote');
    }
  };

  return { voteStatus, checking, recordVote };
};