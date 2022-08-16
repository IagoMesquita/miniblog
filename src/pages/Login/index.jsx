import { useEffect, useState } from 'react';

import { useAuthentication } from '../../hooks/useAuthentication';

import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, loading, error: authError,  } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    const user = {
      email,
      password
    };

    const res = await login(user);
    console.log(res);
  };

  useEffect(() => {
    if(authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={ styles.login }>
      <h1>Entrar</h1>
      <p>Faça o login para poder utilizar o sistema</p>
      <form onSubmit={ handleSubmit }>
        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="Seu email"
            onChange={ (e) => setEmail(e.target.value) }
            value={ email }
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Digite sua senha"
            onChange={ (e) => setPassword(e.target.value) }
            value={ password }
          />
        </label>
        {
          !loading && <button className='btn'>Entrar</button>
        }
        {
          loading && <button disabled="true" className='btn'>Aguarde...</button>
        }
        { error && <p className='error'>{error}</p> }
      </form>
    </div>
  )
}
