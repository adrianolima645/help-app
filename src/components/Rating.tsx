import React from 'react';
import { FaStar } from 'react-icons/fa';

interface RatingProps {
    color: string;
    rate: number;
  }

export default function Rating(props: RatingProps) {

    const { color, rate} = props;

    const stars = [1,2,3,4,5];
    return (
      <>
        {stars.map((item, index) => {
          const givenRating = index + 1;
          return (
            <FaStar key={index}
              color={
                givenRating < rate || givenRating === rate
                  ? color
                  : "C4C4C4"
              }
            />
          )}
        )}
      </>
    );
}