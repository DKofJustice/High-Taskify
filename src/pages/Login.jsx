import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form' 
import toast from 'react-hot-toast';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from './../context/AuthContext'


export default function Login() {

  const { setUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      if (errors.email && errors.email.message) {
        return toast.error(errors.email.message);
      } else if (errors.password && errors.password.message) {
        return toast.error(errors.password.message);
      }
  
      const response = await axios.post(`${import.meta.env.VITE_SERVER_API}/login`, {
        email: data.email,
        password: data.password,
      });

      toast.success('Login successful')
      reset();

      const token = response.data.existingUser.accessToken;
      const email = response.data.existingUser.email;
      const userID = response.data.existingUser._id;
      const name = response.data.existingUser.name;

      setUser({ token, email, userID, name });

      localStorage.setItem('user', JSON.stringify({token, email, userID, name}));

      navigate('/main')

    } catch(error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='w-full h-full bg-[#CBCBCB] dark:bg-dark-100 flex flex-col justify-center 
    items-center'>
        <div className='w-full max-w-[30rem] flex flex-col items-center dark:bg-dark-200 
        -translate-y-[5rem] px-[1rem] py-[2rem] gap-y-[1rem] rounded-[10px]'>
            <div>
                <h2 className="dark:text-white">Logo</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col items-center gap-y-[3rem]'>
                <label className='flex flex-row items-center gap-x-[1.5rem] cursor-pointer'>
                    <EmailIcon className='text-white/60 focus:text-white'/>
                    <input
                    {...register('email', {
                        required: 'Email is required',
                    })}
                    type="text" 
                    name="email" 
                    placeholder='Email'
                    className='w-full md:w-[15rem] bg-transparent border border-white/60 outline-none rounded-[4px]
                    px-[1rem] py-[0.4rem] dark:text-white focus:border-white focus:border-3' 
                    />
                </label>

                <label className='flex flex-row items-center gap-x-[1.5rem] cursor-pointer'>
                    <PasswordIcon className='text-white/60'/>
                    <input
                    {...register('password', {
                        required: 'Password is required',
                    })}
                    type="password" 
                    name="password" 
                    placeholder='Password'
                    className='w-full md:w-[15rem] bg-transparent border border-white/60 outline-none rounded-[4px]
                    px-[1rem] py-[0.4rem] dark:text-white focus:border-white focus:border-3'
                    />
                </label>

                <button 
                type="submit"
                disabled={isSubmitting}
                className={`relative w-[7rem] md:w-[9rem] bg-primary-red border-0 text-white px-[0.5rem] 
                py-[0.5rem] cursor-pointer flex flex-row items-center justify-center ${isSubmitting ? 'opacity-40' : 'opacity-100'}`}
                >
                Login
                <ArrowForwardIcon className='text-white absolute right-3'/>
                </button>
            </form>

            <div className='mt-[2rem] flex flex-row gap-x-[4rem]'>
                <button 
                className='bg-transparent border-0 dark:text-white/60 dark:hover:text-white
                cursor-pointer text-[1rem]'
                >
                    Forgot password?
                </button>

                <button
                className='bg-transparent border-0
                cursor-pointer text-[1rem]'
                >
                <Link to='/register' className='no-underline dark:text-white/60 
                dark:hover:text-white'>
                    Register
                </Link>
                </button>
            </div>
        </div>
    </div>
  )
}
