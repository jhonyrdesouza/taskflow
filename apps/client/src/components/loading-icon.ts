import { Loader2 } from 'lucide-react';
import styled from 'styled-components';

export const LoadingIcon = styled(Loader2)`
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
