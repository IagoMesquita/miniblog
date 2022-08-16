import { useState, useEffect, useReducer } from "react";
import { db } from '../firebase/config';
import { collection, addDoc, Timestamp } from "firebase/firestore";

// Aqui usaremos o useReducer só para ver outra forma de fazer. Mas poderia ter sido feito com useState

// state inicial: state que vai no useReducer, normalmente é um objeto.
const initialState = {
  loading: null,
  error: null
};

// reducer: funcão que vai no useReducer. Fazendo uma analogia ao Redux, seria uma Storege
const insertReducer = (state, action) => {
  switch(action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload}
    default:
      return state;

  }
};

// hook Personalizado
export const useInsertDocument = (docCollection) => {

  const [response, dispatch] = useReducer(insertReducer, initialState);

  // deal with memory leak -------------------------
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action)
    }
  };
  // -----------------------------------------------

  // funcão de adicionar post
  const insertDocument = async (document) => {

    // Esse objeto, seria como a Action do Redux
    checkCancelBeforeDispatch({
      type: 'LOADING',
    })

    try {

      // aqui começamos a usar o methodos do Firebase
      const newDocument = {...document, createdAt: Timestamp.now()};

      const insertDocument = await addDoc(
        collection(db, docCollection),
        newDocument,
      );

      checkCancelBeforeDispatch({
        type: "INSERT_DOC",
        payload: insertDocument,
      });

    } catch (error) {
      
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });

    }
  };

  useEffect(() => {
    setCancelled(true);
  }, []);

  return {
    insertDocument,
    response
  };

};