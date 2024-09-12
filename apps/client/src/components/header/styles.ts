import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: ${({ theme }) => theme['gray-600']};
`;

export const Title = styled.div`
  h1 {
    font-size: 24px;
    color: ${({ theme }) => theme['gray-100']};

    span {
      color: ${({ theme }) => theme['violet-500']};
    }
  }
`;

export const LogoutButton = styled.button`
  background-color: ${({ theme }) => theme['red-500']};
  color: ${({ theme }) => theme['white']};
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme['red-600']};
  }
`;
