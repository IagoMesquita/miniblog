import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search])
};

//Muito legal o "URLSearchParams" ele gera vários métodos baseado na url