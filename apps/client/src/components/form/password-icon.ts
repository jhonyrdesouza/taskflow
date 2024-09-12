import styled from 'styled-components';

export const PasswordIcon = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-10px);
  background-color: transparent;
  border: 0;

  > svg {
    color: ${({ theme }) => theme['zinc-50']};
  }
`;
