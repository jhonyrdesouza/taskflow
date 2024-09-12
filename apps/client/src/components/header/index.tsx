import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth'; // Ajuste o caminho conforme necessário
import { HeaderContainer, LogoutButton, Title } from './styles'; // Adicione o LogoutButton aos estilos

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
