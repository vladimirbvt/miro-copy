// import { rqClient } from '@/shared/api/instance'

import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/model/routes'
import { Button } from '@/shared/ui/kit/button.tsx'
import { AuthLayout } from '@/features/auth/ui/auth-layout.tsx'
import { LoginForm } from '@/features/auth/ui/login-form.tsx'

function LoginPage() {
  // const loginMutation = rqClient.useMutation('post', '/auth/login')

  return (
    <AuthLayout
      title="Вход в систему"
      description="Введите ваш email и пароль"
      footerText={
        <>
          Нет аккаунта?{' '}
          <Button asChild variant="link">
            <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link>
          </Button>
        </>
      }
      form={<LoginForm />}
    />
  )
}

export const Component = LoginPage
