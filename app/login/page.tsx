import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { login, signup } from './actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  return (
    <Card className="mx-auto max-w-sm">
      <form>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              {/* <input id="email" name="email" type="email" required /> */}
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline" prefetch={false}>
                  Forgot your password?
                </Link>
              </div>
              {/* <input id="password" name="password" type="password" required /> */}
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" formAction={login}>
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline" prefetch={false}>
              Sign up
            </Link>
          </div>
          <button formAction={signup}>Sign up</button>
        </CardContent>
      </form>
    </Card>
  )
  // <Card>
  //     <label htmlFor="email">Email:</label>
  //     <input id="email" name="email" type="email" required />
  //     <label htmlFor="password">Password:</label>
  //     <input id="password" name="password" type="password" required />
  //     <button formAction={login}>Log in</button>
  //     <button formAction={signup}>Sign up</button>
  //   </form>
  // </Card>
}