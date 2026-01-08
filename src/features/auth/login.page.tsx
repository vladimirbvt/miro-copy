// import { rqClient } from '@/shared/api/instance'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/kit/card.tsx'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/model/routes'
import { Button } from '@/shared/ui/kit/button.tsx'

function LoginPage() {
  // const loginMutation = rqClient.useMutation('post', '/auth/login')

  return (
    <main className="grow flex pt-[200px] items-center justify-center">
      <Card className="w-[400px] max-w-full border-neutral-300">
        <CardHeader>
          <CardTitle className="text-2xl">Вход в систему</CardTitle>
          <CardDescription className="text-gray-400">
            Введите ваш email и пароль
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="text-gray-700 text-sm">
          <p>
            Нет аккаунта?{' '}
            <Button asChild variant="link">
              <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}

export const Component = LoginPage
