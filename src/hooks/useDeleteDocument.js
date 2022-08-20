import { useState, useEffect, useReducer } from "react";
import { db } from '../firebase/config';
import { doc, deleteDoc } from "firebase/firestore";

// Aqui usaremos o useReducer só para ver outra forma de fazer. Mas poderia ter sido feito com useState

// state inicial: state que vai no useReducer, normalmente é um objeto.
const initialState = {
  loading: null,
  error: null
};

// reducer: funcão que vai no useReducer. Fazendo uma analogia ao Redux, seria uma Storege
const deleteReducer = (state, action) => {
  switch(action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload}
    default:
      return state;

  }
};

// hook Personalizado
export const useDeleteDocument = (docCollection) => {

  const [response, dispatch] = useReducer(deleteReducer, initialState);

  // deal with memory leak -------------------------
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action)
    }
  };
  // -----------------------------------------------

  // funcão de deletar post
  const deleteDocument = async (id) => {

    // Esse objeto, seria como a Action do Redux
    checkCancelBeforeDispatch({
      type: 'LOADING',
    })

    try {

      const documentRef = doc(db, docCollection, id);

      const deletedDocument = await deleteDoc(documentRef);

      checkCancelBeforeDispatch({
        type: "DELETED_DOC",
        payload: deletedDocument,
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
    deleteDocument,
    response
  };

};