import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
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
import { useHandlePasswordIcon } from '../../hooks/useHandlePasswordIcon';
import { createNewAccount } from '../../lib/action';
import { delay } from '../../utils/delay';
import { CTALink, Container, ErrorMessage, FormContainer } from './styles';

type SignUpSchema = z.infer<typeof signUpSchema>;

export const signUpSchema = z
  .object({
    fullname: z.string().min(1, 'Campo obrigatório').max(24, 'Nome inválido'),
    email: z.string().email('Email invalido'),
    password: z.string().min(1, 'Campo obrigatório').max(24, 'Máximo de caracteres atingido'),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: 'As senhas não coincidem',
      path: ['confirmPassword'],
    },
  );

export const SignUp = () => {
  const { handlePassword, typeInput, togglePassword } = useHandlePasswordIcon();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: SignUpSchema) {
    await delay(2000);

    try {
      toast.promise(createNewAccount({ ...values }), {
        loading: 'Criando a sua conta...',
        success: 'Cadastro efetuado com sucesso',
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
        <h1>Crie sua conta em Taskflow</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <label htmlFor="name">Nome</label>
            <Input id="fullname" placeholder="Digite seu nome" {...register('fullname')} />
            {errors && <ErrorMessage>{errors.fullname?.message}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <label htmlFor="email">E-mail</label>
            <Input id="email" placeholder="exemplo@dominio.com" {...register('email')} />
            {errors && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Senha</label>
            <div>
              <Input id="password" placeholder="Digite sua senha" type={typeInput} {...register('password')} />
              <PasswordIcon onClick={togglePassword} type="button">
                {handlePassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </PasswordIcon>
            </div>
            {errors && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <label htmlFor="confirmPassword">Confirmar senha</label>
            <div>
              <Input
                id="confirmPassword"
                placeholder="Digite sua senha novamente"
                type={typeInput}
                {...register('confirmPassword')}
              />
              <PasswordIcon onClick={togglePassword} type="button">
                {handlePassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </PasswordIcon>
            </div>
            {errors && <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>}
          </FormGroup>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <LoadingIcon /> : 'Criar conta'}
          </Button>
        </form>

        <Separator />

        <CTALink>
          Já possui uma conta?{' '}
          <Link to="/">
            Voltar para o login
            <ArrowRight size={18} />
          </Link>
        </CTALink>
      </FormContainer>
    </Container>
  );
};
