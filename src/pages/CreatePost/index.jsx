import { useState } from 'react';

import styles from './CreatePost.module.css';

function CreatePost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
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
        <button className='btn'>Criar</button>
        {/* {
          !loading && <button className='btn'>Cadastrar</button>
        }
        {
          loading && <button disabled="true" className='btn'>Aguarde...</button>
        }
        { error && <p className='error'>{error}</p> } */}
      </form>
    </div>
  )
}

export default CreatePost;