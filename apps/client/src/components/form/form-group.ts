import styled from 'styled-components';

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  label {
    font-weight: 500;
  }

  > div {
    position: relative;
    width: 100%;
  }
`;
