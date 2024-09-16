import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { HeaderContainer, LogoutButton, Title } from './styles';
export const Header = () => {
  const { logout } = useContext(AuthContext);

  return (
    <HeaderContainer>
      <Title>
        <h1>
          task<span>flow 🎯</span>
        </h1>
      </Title>
      <LogoutButton onClick={logout}>Sair</LogoutButton>
    </HeaderContainer>
  );
};
