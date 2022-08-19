import { useParams } from 'react-router-dom';

// hook
import { useFetchDocument } from '../../hooks/useFetchDocument';

function Post() {
  const { id } = useParams();
  
  const { document: post } = useFetchDocument('posts', id);

  return (

    <div>
      
      { post && (
        <h1>{post.title}</h1>
      )}
    </div>

  )
}

export default Post