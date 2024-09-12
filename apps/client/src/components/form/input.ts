import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  padding: 0.85rem 1rem;
  background-color: ${({ theme }) => theme['zinc-900']};
  border: 1px solid ${({ theme }) => theme['zinc-800']};
  border-radius: 6px;
  color: ${({ theme }) => theme['zinc-50']};

  &:placeholder {
    color: ${({ theme }) => theme['zinc-500']};
  }
`;
