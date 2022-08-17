import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';

export const useFetchDocuments = (docCollection, search=null, uid=null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {

    async function loadingData() {
      if(cancelled) return;

      setLoading(true);

      const collectionRef = await collection(db, docCollection);
      console.log("Collection", collectionRef);

      try {
        let q;

        // busca
        // dashboard

        // methodos do Firebase
        q = await query(collectionRef, orderBy("createdAt", "desc"));

        // onSnapshot: mapeia os dados, sempre que um dado for alterado, ele traz esses dados atualizados.
        await onSnapshot(q, (querySnapshot) => {

          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
        });
        
        setLoading(false);

      } catch (error) {
        console.log(error);

        setError(error.message)

        setLoading(false);
      }
    };

    loadingData();

  }, [docCollection, search, uid, cancelled])

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    documents, 
    loading, 
    error
  }
  
};