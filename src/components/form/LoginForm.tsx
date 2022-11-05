import React, { useState, FormEvent, useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../inputs/Button';
import InputText from '../inputs/Input';
import { AuthContext } from '../../contexts/AuthContext';

export default function LoginForm() {
    const [getEmail, setEmail] = useState('');
    const [getPassword, setPassword] = useState('');

    const {login} = useContext(AuthContext);

    type Errors = {
      email ?: string;
      password ?: string;
      login ?: string;
    }

    const [errors, setErrors] = useState({} as Errors);

    function validate(loginError: boolean = false) {
          const errors: Errors = {};

          if (getEmail.length <= 0) {
              errors.email = "O campo e-mail é obrigatório!";
          }

          if (!getEmail.includes('@')) {
              errors.email = "O e-mail informado é inválido!";
          }

          if (getPassword.length <= 0) {
            errors.password = "O campo senha é obrigatório!";
          }

          if (getPassword.length < 8) {
              errors.password = "A senha é inválida!";
          }

          if (loginError) {
            errors.login = "Usuário ou senha inválidos!";
        }

        return errors;
    }


    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        setErrors(validate());
        console.log(Object.keys(errors).length === 0);
        console.log(!login(getEmail, getPassword));
        if (!errors.email && !errors.password) {
          setErrors(validate(!login(getEmail, getPassword)));
        } 
    }

    return (
      <div>    
          <form onSubmit={handleSubmit} className="login-form">
          {errors.login && <span className='fieldErrorMessage'>{errors.login}</span>}
            <InputText
              id="email"
              name="email"
              value={getEmail}
              type="text"
              label="Email"
              onChange={(event) => setEmail(event.target.value)}
              required={true}
              placeholder=""
              maxLenght={60}
              />
            {errors.email && <span className='fieldErrorMessage'>{errors.email}</span>}

            <InputText
              id="password"
              name="password"
              value={getPassword}
              type="password"
              label="Senha"
              onChange={(event) => setPassword(event.target.value)}
              required={true}
              placeholder=""
              maxLenght={60}
              />
            {errors.password && <span className='fieldErrorMessage'>{errors.password}</span>}

            <Button
              id="submitRegisterButton"
              name="submitRegisterButton"
              type="submit"
              styleButton="confirm-button"
              label="Confirmar"
            />

            <Button
              id="submitGoogleButton"
              name="submitGoogleButton"
              type="button"
              styleButton="google-button"
              label="Logar com Google"
            />
            
            <div className="register-links">
              <Link className='link' to="/register" >Cadastre-se</Link>
              <Link className='link' to="" >Esqueci a senha</Link>
            </div>
          </form>
      </div>
    );
}