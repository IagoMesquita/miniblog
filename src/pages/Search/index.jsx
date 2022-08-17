// hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';

function Search() {
  const query = useQuery();
  // O metodo "get" veio do estânciamento do "URLSearchParams"
  // Onde "q" vem da queryStrig "/search?q=value"
  const search = query.get("q")

  return (
    <div>
      <h2>Search</h2>
      <p>{search}</p>
    </div>
  )
}

export default Search