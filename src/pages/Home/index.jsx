// CSS
import styles from './Home.module.css';

// hooks
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

// componets
import PostDetail from '../../components/PostDetail';

function Home() {
  const [query, setQuery] = useState("");

  const { documents: posts, loading, error } = useFetchDocuments("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(query) {
      return navigate(`/search?q=${query}`)
    }

  };

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={ handleSubmit } className={ styles.search_form }>
        <input
          type="text"
          placeholder='Ou busque por tags...'
          name="query"
          onChange={ (e) => setQuery(e.target.value) }
          value={ query }
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        { loading && <p>Carregando...</p> }
        {/* primeiro "posts" para verificar se veio "null" */}
        { posts && posts.map((post) => (
          <PostDetail key={ post.id } post={ post } />
        )) }
        {/* primeiro "posts" para verificar se veio "null" */}
        { posts && posts.length === 0 && (
          <div className={ styles.noposts } >
            <p>Não foram encontrados posts</p>
            <Link to='/posts/create' className='btn'>Criar primeiro post</Link>
          </div>
        ) }
      </div>
    </div>
  )
}

export default Home;