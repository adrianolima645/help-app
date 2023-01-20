import { useState, FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../inputs/Button';
import Checkbox from '../inputs/Checkbox';
import InputText from '../inputs/Input';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';

export default function RegisterForm() {
    const [getName, setName] = useState('');
    const [getLastName, setLastName] = useState('');
    const [getEmail, setEmail] = useState('');
    const [getDateOfBirth, setDateOfBirth] = useState('');
    const [getPhoneNumber, setPhoneNumber] = useState('');
    const [getCity, setCity] = useState('');
    const [getState, setState] = useState('');
    const [getPassword, setPassword] = useState('');
    const [getTerms, setTerms] = useState(false);
    const {login} = useContext(AuthContext);

    const navigate = useNavigate();

    let obj: Errors = {};
    const [errors, setErrors] = useState(obj);

    type Errors = {
        firstName ?: string;
        lastName ?: string;
        email ?: string;
        dateOfBirth ?: string;
        phoneNumber ?: string;
        city ?: string;
        state ?: string;
        password ?: string;
        terms ?: string;
    }

    function validate() {
        const errors: Errors = {};
        let check = false;

        if (getName.length <= 0) {
            errors.firstName = "O campo nome é obrigatório.";
            check = true;
        }

        if (getLastName.length <= 0) {
            errors.lastName = "O campo nome é obrigatório.";
            check = true;
        }

        if (!getEmail.includes('@')) {
            errors.email = "O e-mail informado é inválido.";
            check = true;
        }

        if (getEmail.length <= 0) {
            errors.email = "O campo e-mail é obrigatório.";
            check = true;
        }

        if (getDateOfBirth.length <= 0) {
            errors.dateOfBirth = "O campo data de nascimento é obrigatório.";
            check = true;
        }

        if (getPhoneNumber.length <= 0) {
            errors.phoneNumber = "O campo telefone é obrigatório.";
            check = true;
        }

        if (getCity.length <= 0) {
            errors.city = "O campo cidade é obrigatório.";
            check = true;
        }

        if (getState.length <= 0) {
            errors.state = "O campo estado é obrigatório.";
            check = true;
        }

        if (getPassword.length < 8) {
            errors.password = "O campo senha é obrigatório e deve ter entre 8 e 15 caracteres.";
            check = true;
        }

        if (!getTerms) {
            errors.terms = "Aceite os termos de uso para se registrar.";
            check = true;
        }

        setErrors(errors);
        return check;
    }


    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (!validate()) {
            const data = {
                'firstName': getName,
                'lastName': getLastName,
                'email': getEmail,
                'dateOfBirth': getDateOfBirth,
                'phone': getPhoneNumber,
                'city': getCity,
                'state': getState,
                'password': getPassword,
                'termsOfUse': getTerms.toString(),
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

    return (
    <div>    
        <form onSubmit={handleSubmit} className="register-form">
            <fieldset>
                <legend>Registro</legend>

                <InputText
                    id="firstName"
                    name="firstName"
                    value={getName}
                    type="text"
                    label="Nome"
                    onChange={(event) => setName(event.target.value)}
                    required={true}
                    placeholder=""
                    maxLength={60}
                    />
                {errors.firstName && <span className='fieldErrorMessage'>{errors.firstName}</span>}

                <InputText
                    id="lastName"
                    name="lastName"
                    value={getLastName}
                    type="text"
                    label="Sobrenome"
                    onChange={(event) => setLastName(event.target.value)}
                    required={true}
                    placeholder=""
                    maxLength={80}
                    />
                {errors.lastName && <span className='fieldErrorMessage'>{errors.lastName}</span>}

                <InputText
                    id="email"
                    name="email"
                    value={getEmail}
                    type="text"
                    label="E-mail"
                    onChange={(event) => setEmail(event.target.value)}
                    required={true}
                    placeholder=""
                    maxLength={80}
                    />
                {errors.email && <span className='fieldErrorMessage'>{errors.email}</span>}

                <InputText
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={getDateOfBirth}
                    type="date"
                    label="Data de Nascimento"
                    onChange={(event) => setDateOfBirth(event.target.value)}
                    required={true}
                    placeholder=""
                    maxLength={10}
                    />
                {errors.dateOfBirth && <span className='fieldErrorMessage'>{errors.dateOfBirth}</span>}

                <InputText
                    id="phoneNumber"
                    name="phoneNumber"
                    value={getPhoneNumber}
                    type="tel"
                    label="Telefone"
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    required={true}
                    placeholder=""
                    maxLength={11}
                    />
                {errors.phoneNumber && <span className='fieldErrorMessage'>{errors.phoneNumber}</span>}

                <InputText
                    id="city"
                    name="city"
                    value={getCity}
                    type="text"
                    label="Cidate"
                    onChange={(event) => setCity(event.target.value)}
                    required={true}
                    placeholder=""
                    maxLength={60}
                    />
                {errors.city && <span className='fieldErrorMessage'>{errors.city}</span>}

                <InputText
                    id="state"
                    name="state"
                    value={getState}
                    type="text"
                    label="Estado"
                    onChange={(event) => setState(event.target.value)}
                    required={true}
                    placeholder=""
                    maxLength={2}
                    />
                {errors.state && <span className='fieldErrorMessage'>{errors.state}</span>}

                <InputText
                    id="password"
                    name="password"
                    value={getPassword}
                    type="password"
                    label="Senha"
                    onChange={(event) => setPassword(event.target.value)}
                    required={true}
                    placeholder=""
                    maxLength={15}
                    />
                {errors.password && <span className='fieldErrorMessage'>{errors.password}</span>}

                <Checkbox 
                    id="termsOfUse"
                    name="termsOfUse"
                    value={getTerms === true ? 'checked' : ''}
                    label="Termos de Uso"
                    onChange={(event) => setTerms(event.target.checked)}
                    required={true}
                    />
                {errors.terms && <span className='fieldErrorMessage'>{errors.terms}</span>}

                <Button
                    id="submitRegisterButton"
                    name="submitRegisterButton"
                    type="submit"
                    styleButton="confirm-button"
                    label="Confirmar"
                />
            </fieldset>
        </form>
    </div>
    );
}