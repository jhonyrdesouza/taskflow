import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'styled-components';
import { Router } from '../routes/router';
import { GlobalStyle } from '../styles/global';
import { defaultTheme } from '../styles/theme/default';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Toaster
        toastOptions={{
          style: {
            borderRadius: '8px',
            padding: '1rem',
            fontWeight: 500,
            backgroundColor: defaultTheme['zinc-950'],
            color: defaultTheme['zinc-50'],
            border: `1px solid ${defaultTheme['zinc-900']}`,
            boxShadow: `0 0 6px ${defaultTheme['zinc-900']}`,
          },
        }}
      />

      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}
