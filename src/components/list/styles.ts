import styled from 'styled-components';

export const Form = styled.div`
  display: flex;
  justify-content: center;
  background: darkgrey;
  padding: 10px;
`;

export const Label = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  display: grid;
  justify-content: center;
  background: darkgrey;
  padding-left: 100px;
  padding-right: 100px;
`;

export const Input = styled.input`
  display: flex;
  width: 80%;
  justify-content: center;
  height: 20px;
`;

export const Item = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
  align-items: center;
`;

export const Number = styled.div`  
  display: flex;
  justify-content: center;
  grid-column: 1;
  padding: 5px;
`;
export const Name = styled.div`
  display: flex;
  justify-content: center;
  grid-column: 2;
  padding: 5px;
`;
export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  display: flex;
  justify-content: center;
  grid-column: 3;
  padding: 5px;
  width: 100%;
`;
