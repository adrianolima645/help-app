import React, { useState, FormEvent, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import Button from '../inputs/Button';
import TextArea from '../inputs/TextArea';

type AssessmentParams = {
  id: string;
}

type User = {
  id: string;
  email: string;
  userType: string;
  fullName: string;
}

export default function AssessmentForm() {
    const params = useParams<AssessmentParams>();
    const [getRate, setRate] = useState(0);
    const [getDescription, setDescription] = useState('');
    const [getTouristicPointId, setTouristicPointId] = useState('');
    const [user, setUser] = useState({} as User);

    useEffect(() => {
      const recoveredUser = localStorage.getItem('user');

      if (recoveredUser) {
        setUser(JSON.parse(recoveredUser));
      }

      if (params.id) {
        setTouristicPointId(params.id);
      }
    }, []);

    const navigate = useNavigate();

    let obj: Errors = {};
    const [errors, setErrors] = useState(obj);

    type Errors = {
        rate ?: string;
        description ?: string;
        validate?: boolean;
    }

    function validate() {
        const errors: Errors = {};
        errors.validate = true;

        if (getRate<= 0) {
            errors.rate = "O campo rating é obrigatório.";
            errors.validate = false;
        }

        if (getDescription.length <= 0) {
            errors.description = "O campo comentário é obrigatório.";
            errors.validate = false;
        }
        setErrors(errors);

        return errors.validate;
    }


    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (validate()) {
          const timeElapsed = Date.now();
          const today = new Date(timeElapsed);
          const data = {
            'touristicPointId': getTouristicPointId,
            'description': getDescription,
            'rating': String(getRate),
            'assessmentDate': today.toISOString(),
            'author': user.fullName,
            'userId': user.id,
          };

          const createAssessmentUrl = `assessment`;
          const response = await api.post(createAssessmentUrl, data);

          navigate(`/touristic-point/${getTouristicPointId}`);
        }
    }

    return (
      <div>    
          <form onSubmit={handleSubmit} className="assessment-form">
            <fieldset>
              <legend>Avalie esse local</legend>

              <p className='description'>Aqui você pode nos contar um pouco mais sobre a sua experiência nesse local e deixar sua avaliação para que outros usuários possam visualizar e conhecer um pouco mais sobre a experiência desse local.</p>

              <div className='rating-block'>
                <label className='label-rating'>Rating *</label>

                {[...Array(5)].map((item, index) => {
                  const givenRating = index + 1;
                  return (
                    <label key={index}>
                      <input
                        className='radio'
                        type="radio"
                        value={givenRating}
                        onClick={() => {
                          setRate(givenRating);
                        }}
                      />
                      <FaStar
                        key={index+10}
                        color={
                          givenRating < getRate || givenRating === getRate
                            ? '#FFE604'
                            : "C4C4C4"
                        }
                      />
                    </label>
                  );
                })}
              </div>
              {errors.rate && <span className='fieldErrorMessage'>{errors.rate}</span>}

              <TextArea
                id="description"
                name="description"
                value={getDescription}
                label="Comentário"
                helpText='Máximo de 300 caracteres'
                onChange={(event) => setDescription(event.target.value)}
                required={true}
                placeholder=""
                maxLength={300}
                rows={8}
              />
              {errors.description && <span className='fieldErrorMessage'>{errors.description}</span>}

              <Button
                id="submitAssessmentButton"
                name="submitAssessmentButton"
                type="submit"
                styleButton="confirm-button"
                label="Confirmar"
              />
            </fieldset>
          </form>
      </div>
    );
}