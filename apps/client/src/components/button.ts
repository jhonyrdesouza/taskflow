import styled from 'styled-components';

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${({ theme }) => theme['violet-500']};
  color: ${({ theme }) => theme['zinc-50']};
  padding: 0 2rem;
  height: 3rem;
  transition: background-color 0.2s;
  font-weight: 600;
  border: 0;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme['violet-400']};
  }
`;
