import React from 'react';

import './textarea.css';

interface TextAreaProps {
    id: string;
    label: string;
    helpText: string;
    name: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    required:boolean;
    placeholder: string;
    maxLength?: number;
    rows?: number
  }

export default function TextArea(props: TextAreaProps) {

    const { id, label, helpText, name, value, onChange, required, placeholder, maxLength, rows} = props;
    let formatedLabel = label;

    if (required) {
      formatedLabel = label + ' *';
    }

    return (
      <div className="input-block">
        <label htmlFor={id}>
        {formatedLabel} <span>{helpText}</span>
        </label>
        <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={maxLength}
            rows={rows}
        />
      </div>
    );
}