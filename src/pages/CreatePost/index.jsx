import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  // ContextApi 
  const { user } = useAuthValue();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setFormError("");

    // validate image URL
    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.")
    }
    
    // criar o array de tags
    const tagsArray = tags.split(',')
      .map((tag) => tag.toLowerCase().trim());
    
      // checar todos os valores
      if (!title || !image || !tags || !body ) {
        setFormError("Por favor, preench todos os campos.")
      }

    if (formError) return;

    const post = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    insertDocument(post);

    // redirect to home page
    navigate('/');
    
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
          response.loading && <button disabled={true} className='btn'>Aguarde...</button>
        }
        { response.error && <p className='error'>{response.error}</p> }
        { formError && <p className='error'>{formError}</p> }
      </form>
    </div>
  )
}

export default CreatePost;