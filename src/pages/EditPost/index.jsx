import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// context
import { useAuthValue } from '../../context/AuthContext'
//hook
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

import styles from './EditPost.module.css';

function EditPost() {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {

    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);
      
      const textTags = post.tagsArray.join(", ");
      setTags(textTags);
    }


  }, [post]);

  const navigate = useNavigate();

  // ContextApi 
  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument("posts");

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

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    updateDocument(id, data);
    
    // redirect to home page
    navigate('/dashboard');
    
  };

  return (
    <div className={ styles.edit_post }>
      { post && (
        <>
          <h2>Editando Post: {post.title} </h2>
          <p>Altere os dados do post como desejar.</p>
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
            <p className={ styles.preview_title }>Preview da imagem atual:</p>
            <img className={ styles.image_preview } src={ post.image } alt={ post.title } />
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
              !response.loading && <button className='btn'>Editar</button>
            }
            {
              response.loading && <button disabled="true" className='btn'>Aguarde...</button>
            }
            { response.error && <p className='error'>{response.error}</p> }
            { formError && <p className='error'>{formError}</p> }
          </form>
        </>
      ) }
    </div>
  )
}

export default EditPost;