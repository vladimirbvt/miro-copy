import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/kit/card.tsx'
import type { ReactNode } from 'react'

interface AuthLayoutProps {
  form: ReactNode
  title: ReactNode
  description: ReactNode
  footerText: ReactNode
}

export const AuthLayout = ({
  form,
  title,
  description,
  footerText,
}: AuthLayoutProps) => {
  return (
    <main className="grow flex pt-50 items-center justify-center">
      <Card className="w-100 max-w-full border-neutral-300">
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-gray-400">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>{form}</CardContent>
        <CardFooter className="text-sm">
          <p className="text-muted-foreground [&_a]:text-primary [&_a: underline]">
            {footerText}
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}
