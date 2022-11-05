import React from 'react';

import './checkbox.css';

interface CheckboxProps {
    id: string;
    label: string;
    name: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    required:boolean;
  }

export default function Checkbox(props: CheckboxProps) {

    const { id, label,name, value, onChange, required } = props;
    let formatedLabel = label;

    if (required) {
      formatedLabel = label + ' *';
    }

    return (
      <div className="input-checkbox">
          <label htmlFor={id} className='checkbox-label'>{formatedLabel}</label>
          <input
              id={id}
              name={name}
              value={value}
              onChange={onChange}
              type="checkbox"
              className="switch switch--shadow" 
          />
          <label htmlFor={id}></label>
      </div>
    );
}
