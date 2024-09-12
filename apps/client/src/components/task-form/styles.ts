import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  color: inherit;
  background-color: ${({ theme }) => theme['gray-500']};
  border: 1px solid ${({ theme }) => theme['gray-700']};

  ::placeholder {
    color: ${({ theme }) => theme['gray-300']};
  }

  &:focus,
  &:focus-visible {
    border: 1px solid ${({ theme }) => theme['purple-500']};
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  color: inherit;
  background-color: ${({ theme }) => theme['gray-500']};
  border: 1px solid ${({ theme }) => theme['gray-700']};
  resize: vertical;

  ::placeholder {
    color: ${({ theme }) => theme['gray-300']};
  }

  &:focus,
  &:focus-visible {
    border: 1px solid ${({ theme }) => theme['purple-500']};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  color: inherit;
  background-color: ${({ theme }) => theme['gray-500']};
  border: 1px solid ${({ theme }) => theme['gray-700']};

  &:focus,
  &:focus-visible {
    border: 1px solid ${({ theme }) => theme['purple-500']};
  }
`;

export const Button = styled.button`
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme['violet-700']};
  color: inherit;
  font-size: 14px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 100ms ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme['blue-500']};
  }

  svg {
    margin-left: 8px;
  }
`;
