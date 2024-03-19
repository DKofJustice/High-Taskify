import { useContext } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from './../context/AuthContext'
import PropTypes from 'prop-types'


export default function NewReminder({ isNewReminderWindowOpen, setIsNewReminderWindowOpen,
  fetchAllTasks }) {

  const { user } = useContext(AuthContext);

  //Items from React Hook Form
  const { 
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  const addTask = async (data) => {
    try {
      //Displaying various error message for each input field
      if (errors.title && errors.title.message) {
        return toast.error(errors.title.message);
      } else if (errors.notes && errors.notes.message) {
        return toast.error(errors.notes.message);
      } else if (errors.date && errors.date.message) {
        return toast.error(errors.date.message);
      } else if (errors.time && errors.time.message) {
        return toast.error(errors.time.message);
      }

      //Submitting the data to the database
      const response = await axios.post(`${import.meta.env.VITE_SERVER_API}/add_task`, {
        userId: user.userID,
        title: data.title,
        notes: data.notes,
        date: data.date,
        time: data.time,
        flag: data.flag
      });

      console.log(response);

      toast.success('Reminder added successfuly');
      fetchAllTasks();

      //Reset the input fields to empty
      reset();

    } catch(error) {
      console.log(error);
      toast.error('An internal error has occured. Please try again');
    }
  }

  return (
    <div className={`${isNewReminderWindowOpen ? 'block' : 'hidden'} z-100 overflow-x-hidden overflow-y-auto
    pb-[10rem]`}>
        <div className="w-full px-[3rem] py-[1rem] md:py-[2rem]">
            <p className="text-[1.3rem] md:text-[1.8rem] font-bold dark:text-white">New Reminder</p>
        </div>

        {/* Form to add a new reminder */}
        <form 
        onSubmit={handleSubmit(addTask)}
        className="flex flex-col px-[3rem] gap-y-[1rem]"
        >
            <input type="text" name="title" id="title"
             className='w-full max-w-[20rem] pl-[1rem] text-[0.9rem] font-roboto py-[0.8rem] border-none rounded-[7px]
             dark:bg-dark-300 dark:placeholder:text-white/60 dark:text-white focus:outline-none focus:border-none'
            placeholder="Title"
            maxLength={50}
            {...register('title', {
              required: {
                value: true,
                message: 'Title is required',
              },
            })}
            />
            <textarea name="notes" id="notes" cols="30" rows="10"
            placeholder="Notes"
            className='w-full max-w-[20rem] pl-[1rem] text-[0.9rem] font-roboto py-[0.8rem] border-none rounded-[7px]
            dark:bg-dark-300 dark:placeholder:text-white/60 dark:text-white focus:outline-none 
            focus:border-none resize-none'
            maxLength={2000}
            {...register('notes')}
            ></textarea>

            <div className='flex flex-col mb-[0.5rem] md:mb-[2rem]'> 

              {/* Date checkbox */}
              <label htmlFor="date" className="group flex flex-col gap-x-[1rem]">
                <p className="text-black/60 dark:text-white/60 peer-checked:text-black dark:peer-checked:text-white">Date</p>
                <input type="date" name="date" id="date"
                  className='w-full max-w-[19rem] px-[1rem] text-[0.9rem] font-roboto py-[0.8rem] border-none rounded-[7px]
                  dark:bg-dark-300 dark:placeholder:text-white/60 dark:text-white focus:outline-none focus:border-none'
                  {...register('date', {
                    required: 'Please add a date',
                  })}
                />
              </label>

              {/* Time checkbox */}
              <label htmlFor="time" className="group flex flex-col gap-x-[1rem]">
                <p className="text-black/60 dark:text-white/60 peer-checked:text-black dark:peer-checked:text-white">Time</p>
                <input type="time" name="time" id="time"
                  className='w-full max-w-[19rem] px-[1rem] text-[0.9rem] font-roboto py-[0.8rem] border-none rounded-[7px]
                  dark:bg-dark-300 dark:placeholder:text-white/60 dark:text-white focus:outline-none focus:border-none'
                  {...register('time', {
                    required: 'Please add a time',
                  })}
                />
              </label>

              {/* Flag checkbox */}
              <label htmlFor="flag" className="group flex flex-row items-center gap-x-[1rem]">
                <input type="checkbox" name="flag" id="flag"
                className="peer hidden"
                {...register('flag')}
                />
                <span className="relative group w-4 h-4 border-solid border-4 rounded-md border-black/60 dark:border-white/60
                peer-checked:bg-primary-red peer-checked:border-primary-red">
                  <CheckIcon 
                  className='text-white absolute -left-1 -top-1 opacity-0 group-has-[:checked]:opacity-100'
                  />
                </span>
                <p className="text-black/60 dark:text-white/60 peer-checked:text-black dark:peer-checked:text-white">Flag</p>
              </label>

              {/* List checkbox */}
              <label htmlFor="list" className="group flex flex-row items-center gap-x-[1rem]">
                <input type="checkbox" name="list" id="list"
                className="peer hidden"
                />
                <span className="relative group w-4 h-4 border-solid border-4 rounded-md border-black/60 dark:border-white/60
                peer-checked:bg-primary-red peer-checked:border-primary-red">
                  <CheckIcon 
                  className='text-white absolute -left-1 -top-1 opacity-0 group-has-[:checked]:opacity-100'
                  />
                </span>
                <p className="text-black/60 dark:text-white/60 peer-checked:text-black dark:peer-checked:text-white">List</p>
              </label>

              <div>
                
              </div>
            </div>

            <button type='submit'
            onClick={() => setIsNewReminderWindowOpen(false)}
            className={`bg-primary-red w-32 border-none text-white py-[0.4rem] rounded-md
            cursor-pointer ${ isSubmitting ? 'opacity-40' : 'opacity-100' }`}
            disabled={isSubmitting}
            >
              Save
            </button>
            
            <button 
            onClick={() => setIsNewReminderWindowOpen(false)}
            className='bg-dark-300/60 w-32 border-none text-white py-[0.4rem] rounded-md
            cursor-pointer'>Cancel</button>
        </form>
    </div>
  )
}

NewReminder.propTypes = {
  isNewReminderWindowOpen: PropTypes.bool,
  setIsNewReminderWindowOpen: PropTypes.func,
  fetchAllTasks: PropTypes.func,
}