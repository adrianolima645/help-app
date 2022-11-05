import React from 'react';

import '../styles/components/assessment.css';
import AssessmentComponent from './Assessment';

type Assessment = {
    id: string;
    author: string;
    description: string;
    rating: number;
}

interface AssessmentListProps {
    assessmentList: Array<Assessment>;
  }

export default function AssessmentList(props: AssessmentListProps) {

    const { assessmentList } = props;

    return (
        <div className='assesmentList'>
            {assessmentList.map((assessment, index) => {
                return (
                    <AssessmentComponent key={index} id={assessment.id} description={assessment.description} rating={assessment.rating} author={assessment.author}/>
                )}
            )}
        </div>
    );
}