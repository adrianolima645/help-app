import React from 'react';

import '../styles/components/assessment.css';
import Rating from './Rating';

interface AssessmentOnlyProps {
    id: string;
    author: string;
    description: string;
    rating: number;
  }

export default function AssessmentComponent(props: AssessmentOnlyProps) {

    const { id, description, rating, author} = props;

    return (
      <div className='assessment'>
        <label>{author}</label>
        <Rating rate={rating} color='#FFE604' key={id}/>
        <p>{description}</p>
      </div>

    );
}