import { useState, useEffect, useReducer } from "react";
import { db } from '../firebase/config';
import { doc, updateDoc } from "firebase/firestore";

// Aqui usaremos o useReducer só para ver outra forma de fazer. Mas poderia ter sido feito com useState

// state inicial: state que vai no useReducer, normalmente é um objeto.
const initialState = {
  loading: null,
  error: null
};

// reducer: funcão que vai no useReducer. Fazendo uma analogia ao Redux, seria uma Storege
const updateReducer = (state, action) => {
  switch(action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATE_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload}
    default:
      return state;

  }
};

// hook Personalizado
export const useUpdateDocument = (docCollection, id) => {

  const [response, dispatch] = useReducer(updateReducer, initialState);

  // deal with memory leak -------------------------
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action)
    }
  };
  // -----------------------------------------------

  // funcão de atualizar/editar post
  const updateDocument = async (id, data) => {

    // Esse objeto, seria como a Action do Redux
    checkCancelBeforeDispatch({
      type: 'LOADING',
    })

    try {

      const docRef = doc(db, docCollection, id);

      const updateDocument = updateDoc(docRef, data);

      checkCancelBeforeDispatch({
        type: "UPDATE_DOC",
        payload: updateDocument,
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
    updateDocument,
    response
  };

};