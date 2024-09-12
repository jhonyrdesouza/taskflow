import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import * as z from 'zod';
import { Button } from '../../components/button';
import { FormGroup } from '../../components/form/form-group';
import { Input } from '../../components/form/input';
import { PasswordIcon } from '../../components/form/password-icon';
import { LoadingIcon } from '../../components/loading-icon';
import { Separator } from '../../components/separator';
import { AuthContext } from '../../contexts/auth';
import { useHandlePasswordIcon } from '../../hooks/useHandlePasswordIcon';
import { delay } from '../../utils/delay';
import { CTALink, Container, ErrorMessage, FormContainer } from './styles';

type LoginSchema = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Campo obrigatório').max(12, 'Máximo de caracteres atingido'),
});

export const SignIn = () => {
  const { login } = useContext(AuthContext);
  const { handlePassword, typeInput, togglePassword } = useHandlePasswordIcon();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: LoginSchema) {
    await delay(2000);

    try {
      await toast.promise(login(values), {
        loading: 'Realizando o login...',
        success: 'Login efetuado com sucesso',
        error: (error) => error.message,
      });

      reset();
      navigate('/task');
    } catch (error) {
      const err = error as Error;
      console.error(err.message);
    }
  }

  return (
    <Container>
      <FormContainer>
        <h1>Acesse sua em taskflow 🎯</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <label htmlFor="email">E-mail</label>
            <Input id="email" placeholder="exemplo@dominio.com" {...register('email')} />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Senha</label>
            <div>
              <Input id="password" placeholder="Digite sua senha" type={typeInput} {...register('password')} />
              <PasswordIcon onClick={togglePassword} type="button">
                {handlePassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </PasswordIcon>
            </div>
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </FormGroup>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <LoadingIcon /> : 'Entrar'}
          </Button>
        </form>

        <Separator />

        <CTALink>
          Não possui uma conta?{' '}
          <Link to="/sign-up">
            Cadastre-se agora!
            <ArrowRight size={18} />
          </Link>
        </CTALink>
      </FormContainer>
    </Container>
  );
};
