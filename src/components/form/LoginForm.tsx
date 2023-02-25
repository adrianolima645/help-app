import { useState, FormEvent, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../inputs/Button';
import InputText from '../inputs/Input';
import { AuthContext } from '../../contexts/AuthContext';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { gapi } from 'gapi-script';
import api from '../../services/api';


export default function LoginForm() {
    const [getEmail, setEmail] = useState('');
    const [getPassword, setPassword] = useState('');

    const {login} = useContext(AuthContext);

    type Errors = {
      email ?: string;
      password ?: string;
      login ?: string;
    }

    const clientId = "671572362786-g7s2p7tupvguvlu0od7314rojfl7sj4l.apps.googleusercontent.com";

    useEffect(() => {
      const initClient = () => {
            gapi.client.init({
            clientId: clientId,
            scope: ''
          });
       };
       gapi.load('client:auth2', initClient);
    });

    const [errors, setErrors] = useState({} as Errors);
    const [givenName, setGivenName] = useState('');
    const [familyName, setFamilyName] = useState('');


    function validate(loginError: boolean = false) {
          const errors: Errors = {};
          let check = false;

          if (getEmail.length <= 0) {
              errors.email = "O campo e-mail é obrigatório!";
              check = true;
          }

          if (!getEmail.includes('@')) {
              errors.email = "O e-mail informado é inválido!";
              check = true;
          }

          if (getPassword.length <= 0) {
            errors.password = "O campo senha é obrigatório!";
            check = true;
          }

          if (getPassword.length < 8) {
              errors.password = "A senha é inválida!";
              check = true;
          }

          if (loginError) {
            errors.login = "Usuário ou senha inválidos!";
            check = true;
          }
          setErrors(errors);

          return check;
    }


    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const check = validate(false);
        if (!check) {
          const result = await login(getEmail, getPassword, '/app');
          if (!result) {
            validate(true);
          }
        }
    }

    async function handleSubmitGoogleLogin(email: string, password: string) {
      const result = await login(email, password, '/app');

      if (!result) {
        const data = {
          'firstName': givenName,
          'lastName': familyName,
          'email': getEmail,
          'dateOfBirth': "2000/12/07",
          'phone': "11111111111",
          'city': "Socorro",
          'state': "SP",
          'password': getPassword,
          'termsOfUse': true,
          'userType': "normal",
          'userStatus': true
        };

        const registerUrl = `user`;

        const response = await api.post(registerUrl, data);

        if (response.status === 200) {
            login(response.data.schema.email, response.data.schema.password, '/questionary');
        }
      }
    }

    const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      if ("profileObj" in res && res.profileObj !== undefined) { 
        const response = res.profileObj; 
        setGivenName(response.givenName);
        setFamilyName(response.familyName);
        setEmail(response.email);
        setPassword(response.googleId);
        handleSubmitGoogleLogin(response.email, response.googleId);
      }
    }

    const onFailure = (res: GoogleLoginResponse) => {
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
              maxLength={60}
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
              maxLength={60}
              />
            {errors.password && <span className='fieldErrorMessage'>{errors.password}</span>}

            <Button
              id="submitRegisterButton"
              name="submitRegisterButton"
              type="submit"
              styleButton="confirm-button"
              label="Confirmar"
            />

            <GoogleLogin
              clientId={clientId}
              buttonText="Logar com Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
              render={renderProps => (
                <button className='google-button'
                  id="submitGoogleButton"
                  name="submitGoogleButton"
                  type="button"
                  onClick={renderProps.onClick}
                >Logar com Google</button>
              )}
            />
            
            
            <div className="register-links">
              <Link className='link' to="/register" >Cadastre-se</Link>
              <Link className='link' to="" >Esqueci a senha</Link>
            </div>
          </form>
      </div>
    );
}