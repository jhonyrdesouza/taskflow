import styled from 'styled-components';

export const Container = styled.main`
  height: 100%;
  max-width: 40rem;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2.5rem;
  border: 1px solid ${({ theme }) => theme['zinc-900']};
  border-radius: 8px;

  h1 {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -5%;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme['red-500']};
`;

export const CTALink = styled.p`
  color: ${({ theme }) => theme['zinc-500']};
  text-align: center;

  a {
    font-weight: 500;
    color: ${({ theme }) => theme['zinc-50']};
    display: inline-flex;
    align-items: center;

    &:hover {
      text-decoration: underline;
    }

    > svg {
      margin-left: 6px;
    }
  }
`;
