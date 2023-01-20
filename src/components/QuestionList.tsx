import { ChangeEvent, useEffect, useState } from 'react';
import api from '../services/api';

import '../styles/components/assessment.css';
import Checkbox from './inputs/Checkbox';

interface Question {
    id: string;
    description: string;
    questionStatus: boolean;
}

interface Answer {
    questionId: string;
    answer: boolean;
}

export default function QuestionList() {
    const [getQuestions, setQuestions] = useState<Question[]>([]);
    const [getAnswers, setAnswers] = useState<Answer[]>([]);
    const [checkedState, setCheckedState] = useState(
        new Array(5).fill(false)
    );

    useEffect(() => {
      api.get('question/findByStatus').then((response) => {
        setQuestions(response.data);
      });


    }, []);

    useEffect(() => {
        let answers = getQuestions.map((question) => {
            return {
                questionId: question.id,
                answer: false,
            };
          });
          setAnswers(answers);
          localStorage.setItem('answers', JSON.stringify(getAnswers));
      }, []);

    function handleOnchangeCheckbox(position: number) {
         const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);
    }


    return (
        <div className='questionList'>
            {getQuestions.map((question, index) => {
                return (
                    <div className="input-checkbox">
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
    );
}