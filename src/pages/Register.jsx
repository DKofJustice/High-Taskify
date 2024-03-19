import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Register() {

  //Items from React Hook Form
  const { 
    register,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  //Mail Validation Format
  const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  //React Router useNavigate function
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      //Displaying various error message for each input field
      if (errors.userName && errors.userName.message) {
        return toast.error(errors.userName.message);
      } else if (errors.email && errors.email.message) {
        return toast.error(errors.email.message);
      } else if (errors.password && errors.password.message) {
        return toast.error(errors.password.message);
      } else if (errors.confirmPassword && errors.confirmPassword.message) {
        return toast.error(errors.confirmPassword.message);
      }

      //Submitting the data to the database
      await axios.post(`${import.meta.env.VITE_SERVER_API}/register`, {
        name: data.userName,
        email: data.email,
        password: data.password,
      });

      toast.success('Registration successful');
      navigate('/login');

      //Reset the input fields to empty
      reset();

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
                    {...register('userName', {
                        required: 'Name is required',
                      })}
                    type="text" 
                    name="userName" 
                    id="userName" 
                    placeholder='Name'
                    className='w-full md:w-[15rem] bg-transparent border border-white/60 outline-none rounded-[4px]
                    px-[1rem] py-[0.4rem] dark:text-white focus:border-white focus:border-3' 
                    />
                </label>

                <label className='flex flex-row items-center gap-x-[1.5rem] cursor-pointer'>
                    <EmailIcon className='text-white/60 focus:text-white'/>
                    <input
                    {...register('email', {
                        required: 'Email is required',
                        validate: (value) => 
                          value.match(mailformat) || 'Please enter a valid email'
                      })}
                    type="text" 
                    name="email"
                    id="email"  
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
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters"
                        }
                      })}
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder='Password'
                    className='w-full md:w-[15rem] bg-transparent border border-white/60 outline-none rounded-[4px]
                    px-[1rem] py-[0.4rem] dark:text-white focus:border-white focus:border-3'
                    />
                </label>

                <label className='flex flex-row items-center gap-x-[1.5rem] cursor-pointer'>
                    <PasswordIcon className='text-white/60'/>
                    <input
                    {...register('confirmPassword', {
                        required: 'Please confirm password',
                        validate: (value) => 
                          value === getValues().password || 'Please enter a valid email'
                      })}
                    type="password" 
                    name="confirmPassword" 
                    id="confirmPassword" 
                    placeholder='Confirm Password'
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
                Register
                <ArrowForwardIcon className='text-white absolute right-3'/>
                </button>
            </form>

            <div className='mt-[2rem] flex flex-row gap-x-[4rem]'>
                <button 
                className='bg-transparent border-0 dark:text-white/60 dark:hover:text-white
                cursor-pointer text-[1rem]'
                >
                <Link to='/login' className='no-underline dark:text-white/60 
                dark:hover:text-white'>Back to Login</Link>
                </button>
            </div>
        </div>
    </div>
  )
}
