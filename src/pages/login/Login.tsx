import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { LoginFormValues } from '../../interfaces';
import { AuthRepository } from '../../services';
import { AppStore } from '../../redux';
import { createUser } from '../../redux/states/user';


const Login = () => {
  // Variables
  const authRepo = useMemo(() => new AuthRepository(), []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store: AppStore) => store.user);

  const [error, setError] = useState('')

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const { register, handleSubmit, formState, reset } = form;

  const { errors, isSubmitSuccessful, isSubmitting } = formState;

  // functions
  const login = async (data: LoginFormValues) => {
    if (isSubmitSuccessful) {
      try {
        const user = await authRepo.login(data);
        dispatch(createUser(user));
        navigate('/private/dashboard', { replace: true });
      } catch (error) {
        // @ts-ignore
        setError(error.data.msg);

        setTimeout(() => { setError('') }, 3000);
        reset({
          email: '',
          password: ''
        })
      }
    }

  }

  useEffect(() => {
    const redirect = () => {
      if (user.token) {
        navigate('/private/dashboard', { replace: true })
      }
    }
    redirect();
  }, [navigate, user, authRepo])
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" >
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">

          {/* header */}
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <img src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" width="150" alt="" />
              <h1 className="mb-2 text-2xl">Movies</h1>
              <span className="text-gray-300">Sign In</span>
            </div>

            <form onSubmit={handleSubmit(login)} noValidate autoComplete='off'>
              <h2 className='text-center mb-2 text-red-600 font-semibold'>{error}</h2>
              <div className="mb-4 text-lg" >
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="email"
                  placeholder="email@email.com"
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'The email field is required'
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: 'You have to provide a valid email',
                    },
                    minLength: {
                      value: 8,
                      message: 'type at least 8 characters'
                    }
                  })}
                />
                <p className='text-lg font-semibold text-red-600'>{errors.email?.message}</p>
              </div>

              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="password"
                  placeholder="*********"
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'The password field is required'
                    },
                    minLength: {
                      value: 8,
                      message: 'type at least 8 characters'
                    }
                  })}
                />
                <p className='text-lg font-semibold text-red-600'>{errors.password?.message}</p>
              </div>
              <div className="mt-8 flex justify-left text-lg text-black">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>

  )
}
export default Login