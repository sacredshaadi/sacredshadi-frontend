'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
// import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import GoogleSignInButton from '../github-auth-button';
import { useLoginUserMutation, useRegisterUserMutation } from '../api';
import { RegisterUser } from '@/types/auth.types';
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import { useToast } from '../ui/use-toast';
// import auth from '@/auth';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters'
  })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserLoginForm() {
  const { toast } = useToast();

  const router = useRouter();

  const { mutate: loginUserFn, error, isPending } = useLoginUserMutation();

  const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get('callbackUrl');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const disabled = isPending || loading;
  const defaultValues = {
    email: 'demo@gmail.com',
    name: 'Demo User'
    // password: 'password'
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  // useEffect(() => {
  //   console.log('env base url', process.env.NEXT_API_BASE_URL);
  // }, []);

  const onSubmit = async (data: UserFormValue) => {
    // signIn('credentials', {
    //   email: data.email,
    //   callbackUrl: callbackUrl ?? '/dashboard'
    // });
    console.log('data for login', data);
    // return;

    try {
      loginUserFn(data, {
        onSuccess: (data) => {
          toast({
            title: 'Success',
            description: 'User logged in successfully',
            variant: 'default'
          });
          // console.log('data from lo', data);
          // console.log('User registered successfully');
          localStorage.setItem('user', JSON.stringify(data));
          console.log("redirecting to '/dashboard'");
          router.push('/dashboard');
        },
        onError: (error) => {
          console.error(error);
          toast({
            title: 'Error message',
            description: error.message,
            variant: 'destructive'
          });
        }
      });
    } catch (err: any) {
      console.error(`Error : ${err.message}`);
      toast({
        title: 'Redirect error',
        description: err.message,
        variant: 'destructive'
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <section className="flex items-center justify-between gap-2">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder=""
                      disabled={loading}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      // className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => {
                        console.log('clicked');

                        setShowPassword((prev) => !prev);
                      }}
                      // disabled={disabled}
                    >
                      {showPassword ? (
                        <EyeIcon className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                      )}
                    </Button>
                  </section>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isPending} className="ml-auto w-full" type="submit">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <span>{isPending ? 'Logging in..' : 'Login'}</span>
          </Button>
        </form>
      </Form>
    </>
  );
}
