import React from 'react';
import styled from 'styled-components';

export default function InputTextAddSubscriber({
  id,
  name,
  label,
  value,
  onChange,
}) {
  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>
      <InputText
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;

const Label = styled.label`
  padding-bottom: 10px;
  font-size: 16px;
`;

const InputText = styled.input`
  width: 200px;
  height: 30px;
  padding: 0 7px;
  border: none;
  border-radius: 5px;
  outline: 1px solid #bdbdbd;
  font-size: 14px;
  &:focus {
    outline: 1px solid #3e81f6;
    box-shadow: 0 0 5px #3e81f6;
  }
  &:hover {
    outline: 1px solid #3e81f6;
  }
`;
