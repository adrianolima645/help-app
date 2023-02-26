import { FormEvent, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Button from '../inputs/Button';

type User = {
    id: string;
    email: string;
    userType: string;
}

interface Question {
    id: string;
    description: string;
    questionStatus: boolean;
}

export default function QuestionaryForm() {
    const navigate = useNavigate();
    const [user, setUser] = useState({} as User);
    const [getQuestions, setQuestions] = useState<Question[]>([]);
    const [checkedState, setCheckedState] = useState(
        new Array(20).fill(false)
    );

    useEffect(() => {
        api.get('question/findByStatus?questionStatus=true').then((response) => {
            setQuestions(response.data.schema);
        });
        const recoveredUser = localStorage.getItem('user');
    
        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser));
        }
    }, []);

    function handleOnchangeCheckbox(position: number) {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const answerUrl = `answer`;

        getQuestions.map(async (question, index) => {
            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);
            const data = {
                "answer": checkedState[index],
                "dateOfAnswer": today.toISOString(),
                "userId": user.id,
                "questionId": question.id
            };
            
            const response = await api.post(answerUrl, data);
        });
        navigate('/app');
    }


    return (
    <div>    
        <form onSubmit={handleSubmit} className="questionary-form">
            <fieldset>
                <legend>Questionário</legend>

                <div className='questionList'>
                {getQuestions.map((question, index) => {
                    return (
                        <div key={question.id} className="input-checkbox">
                            <label htmlFor={question.id} className='checkbox-label'>{question.description}</label>
                            <input
                                id={question.id}
                                name={question.id}
                                value={'value'}
                                onChange={() => handleOnchangeCheckbox(index)}
                                type="checkbox"
                                className="switch switch--shadow" 
                            />
                            <label htmlFor={question.id}></label>
                        </div>
                    )}
                )}
                </div>

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