import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { useAuthValue } from '../../context/AuthContext'

import { useInsertDocument }from '../../hooks/useInsertDocument';

import styles from './CreatePost.module.css';

function CreatePost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { insertDocument, response } = useInsertDocument("posts");

  // ContextApi 
  const { user } = useAuthValue();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setFormError("");

    // validate image URL

    // criar o array de tags

    // checar todos os valores
    const post = {
      title,
      image,
      body,
      tags,
      uid: user.uid,
      createdBy: user.displayName,
    };

    insertDocument(post);

    // redirect to home page
    
  };

  return (
    <div className={ styles.create_post }>
      <h2>Criar Post</h2>
      <p>Excreva sobre o que você quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={ handleSubmit } >
        <label>
          <span>Título:</span>
          <input
            type="text"
            placeholder="Pense num bom título..."
            name="title"
            value={ title }
            onChange={ (e) => setTitle(e.target.value) }
            required
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            placeholder="Insira uma imagem que representa o seu post."
            name="image"
            value={ image }
            onChange={ (e) => setImage(e.target.value) }
            required
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            placeholder="Insira o conteúdo do post."
            value={ body }
            onChange={ (e) => setBody(e.target.value) }
            required
          />
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            placeholder="Insira as Tags separadas por vírgula."
            name="tags"
            value={ tags }
            onChange={ (e) => setTags(e.target.value) }
            required
          />
        </label>
        {
          !response.loading && <button className='btn'>Cadastrar</button>
        }
        {
          response.loading && <button disabled="true" className='btn'>Aguarde...</button>
        }
        { response.error && <p className='error'>{response.error}</p> }
      </form>
    </div>
  )
}

export default CreatePost;