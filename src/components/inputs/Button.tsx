import React from 'react';

import './button.css';

interface ButtonProps {
    id: string;
    label: string;
    name: string;
    type: "button" | "submit" | "reset" | undefined;
    styleButton: string;
  }

export default function Button(props: ButtonProps) {

    const { id, label,name, styleButton, type} = props;

    return (
        <button name={name} id={id} className={styleButton} type={type}>
          {label}
        </button>
    );
}