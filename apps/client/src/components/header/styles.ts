import styled from 'styled-components';

export const HeaderContainer = styled.header`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme['violet-400']};
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  h1 {
    font-size: 40px;
    font-weight: 900;
    color: ${({ theme }) => theme['violet-500']};

    span {
      color: ${({ theme }) => theme['violet-700']};
    }
  }
`;
