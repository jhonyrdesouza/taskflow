import { setCookie } from 'nookies';
import { redirect } from 'react-router-dom';
import type { z } from 'zod';
import { signUpSchema } from '../pages/sign-up';
import api from './axios';
import { loginSchema } from '../pages/sign-in';

export async function createNewAccount(data: z.infer<typeof signUpSchema>) {
  const { fullname, email, password } = data;
  try {
    const { data } = await api.post('/auth/register', { fullname, email, password });

    setCookie(undefined, '@taskflow.token', data.token, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });

    redirect('/dashboard');
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function login(data: z.infer<typeof loginSchema>) {
  const { email, password } = data;
  try {
    const { data } = await api.post('/auth/login', { email, password });

    setCookie(undefined, '@taskflow.token', data.token, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });

    redirect('/dashboard');
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
