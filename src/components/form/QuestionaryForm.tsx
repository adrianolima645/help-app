import { FormEvent} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../inputs/Button';
import QuestionList from '../QuestionList';

export default function QuestionaryForm() {
    const navigate = useNavigate();

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        navigate('/app');
    }

    return (
    <div>    
        <form onSubmit={handleSubmit} className="questionary-form">
            <fieldset>
                <legend>Questionário</legend>

                <QuestionList></QuestionList>

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