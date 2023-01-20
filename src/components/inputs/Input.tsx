import React from 'react';

import './input.css';

interface InputTextProps {
    id: string;
    label: string;
    name: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    type: string;
    required:boolean;
    placeholder: string;
    maxLength?: number;
    helpText ?: string;
  }

export default function InputText(props: InputTextProps) {

    const { id, label, helpText, name, value, onChange, type, required, placeholder, maxLength} = props;

    let formatedLabel = label;

    if (required) {
      formatedLabel = label + ' *';
    }

    return (
      <div className="input-block">
          <label htmlFor={id}>{formatedLabel}<span>{helpText}</span></label>
          <input
              id={id}
              name={name}
              value={value}
              onChange={onChange}
              type={type}
              placeholder={placeholder}
              maxLength={maxLength}
          />
      </div>
    );
}