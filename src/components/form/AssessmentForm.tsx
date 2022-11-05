import React, { useState, FormEvent } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '../inputs/Button';
import TextArea from '../inputs/TextArea';

export default function AssessmentForm() {
    const [getRate, setRate] = useState(0);
    const [getDescription, setDescription] = useState('');

    const navigate = useNavigate();

    let obj: Errors = {};
    const [errors, setErrors] = useState(obj);

    type Errors = {
        rate ?: string;
        description ?: string;
    }

    function validate() {
        const errors: Errors = {};

        if (getRate<= 0) {
            errors.rate = "O campo rating é obrigatório.";
        }

        if (getDescription.length <= 0) {
            errors.description = "O campo comentário é obrigatório.";
        }

        return errors;
    }


    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        // data.append('name', getName);
        // data.append('about', getAbout);
        // data.append('latitude', String(latitude));
        // data.append('longitude', String(longitude));
        // data.append('instructions', getInstructions);
        // data.append('opening_hours', getOpeningHours);
        // data.append('open_on_weekends', String(getOpeningOnWeekends));

        // getImages.forEach((image) => {
        //   data.append('images', image);
        // });
        // await api.post('orphanages', data);
        // alert('Cadastro realizado com sucesso!');

        setErrors(validate());
        navigate('/touristic-point');
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
                maxLenght={300}
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