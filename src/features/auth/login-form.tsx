import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/kit/form.tsx'
import { useForm } from 'react-hook-form'
import { Input } from '@/shared/ui/kit/input.tsx'
import { Button } from '@/shared/ui/kit/button.tsx'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLogin } from '@/features/auth/use-login.ts'

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Введите email')
    .pipe(z.email({ message: 'Неверный email' })),

  password: z
    .string()
    .min(1, 'Введите пароль')
    .min(6, 'Пароль должен быть не менее 6 символов'),
})

export const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const { login, isPending, errorMessage } = useLogin()

  const onSubmit = form.handleSubmit((data) => {
    console.log(data)
  })

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="admin@gmail.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input placeholder="******" type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Войти</Button>
      </form>
    </Form>
  )
}
