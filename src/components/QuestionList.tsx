import { ChangeEvent, useEffect, useState } from 'react';
import api from '../services/api';

import '../styles/components/assessment.css';
import Checkbox from './inputs/Checkbox';

interface Question {
    id: string;
    description: string;
    questionStatus: boolean;
}

export default function QuestionList() {
    const [getQuestions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
      api.get('question/findByStatus').then((response) => {
        setQuestions(response.data);
      });
    }, []);

    function handleOnchangeCheckbox(event: ChangeEvent<HTMLInputElement>) {
        console.log(event.target.attributes);
    }

    return (
        <div className='questionList'>
            {getQuestions.map((question) => {
                return (
                    <Checkbox
                        key={question.id}
                        id={question.id}
                        name={question.id}
                        value={question.questionStatus === true ? 'checked' : ''}
                        label={question.description}
                        onChange={(event) => handleOnchangeCheckbox(event)}
                        required={false}
                    />
                )}
            )}
        </div>
    );
}