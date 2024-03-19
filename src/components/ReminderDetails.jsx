import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import TitleIcon from '@mui/icons-material/Title';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FlagIcon from '@mui/icons-material/Flag';
import FlagIconCrossed from './../assets/FlagIconCrossed.svg'

export default function ReminderDetails({ isReminderDetailsOpen, setIsReminderDetailsOpen,
  reminderDetails, setReminderDetails, setIsEditReminderOpen }) {
  
  const [reminderDetailsOptions, setReminderDetailsOptions] = useState(false);
  const modalRef = useRef(null);

  // The modal closes when clicked outside of it
  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setReminderDetailsOptions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setReminderDetailsOptions]);

  return (
    <div className={`${ isReminderDetailsOpen ? 'block' : 'hidden' }`}>
      <div className="w-full max-w-[30rem] px-[2rem] pt-[2rem] flex flex-row">
        <button 
        onClick={() => {
          setIsReminderDetailsOpen(false);
          setReminderDetails({});
        }}
        className='flex flex-row items-center bg-transparent border-none text-black dark:text-white
        hover:bg-light-100 dark:hover:bg-dark-300-light active:bg-light-100/50 dark:active:bg-dark-300-active pr-[1rem] py-[0.4rem] rounded-lg cursor-pointer'>
          <ArrowBackIosNewIcon className='mr-[0.5rem] text-black dark:text-white' />
          Back
        </button>
      </div>
      <div className="w-full max-w-[30rem] px-[3rem] pt-[0.5rem] pb-[2rem] flex flex-row relative">
        <p className="text-[1.3rem] md:text-[1.8rem] font-bold dark:text-white w-full max-w-[18rem] md:max-w-[25rem]">Reminder Details</p>
        <button 
        onClick={() => setReminderDetailsOptions(true)}
        className='bg-transparent border-none cursor-pointer'>
          <MoreVertIcon className='text-black hover:text-black/80  dark:text-white/60 dark:hover:text-white/80'/>
        </button>

        <div 
        ref={modalRef}
        className={`absolute ${ reminderDetailsOptions ? 'block' : 'hidden'} flex flex-col w-[10rem]
         py-[0.5rem] bg-light-100 dark:bg-dark-300 rounded-lg gap-y-[0.5rem] shadow-xl right-[7rem] top-[4rem]`}>
          <button 
          onClick={() => {
            setIsReminderDetailsOpen(false);
            setIsEditReminderOpen(true);
          }}
          className='bg-transparent border-none dark:text-white px-[1rem] py-[0.5rem] text-start 
          uppercase hover:bg-light-200 dark:hover:bg-dark-300-light cursor-pointer active:bg-light-200/50 dark:active:bg-dark-300-active
          flex flex-row items-center'>
            <CreateIcon className='mr-[0.5rem]' />  
            Edit
          </button>
          <button className='bg-transparent border-none dark:text-white px-[1rem] py-[0.5rem] text-start 
          uppercase hover:bg-light-200 dark:hover:bg-dark-300-light cursor-pointer active:bg-light-200/50 dark:active:bg-dark-300-active
          flex flex-row items-center'>
            <DeleteIcon className='mr-[0.5rem]' />
            Delete
          </button>
        </div>
      </div>

      <div className='w-full max-w-[30rem] dark:text-white/60 flex flex-col gap-y-[0.3rem]'>
        <div className='w-full border-solid border-0 border-l-4 border-l-primary-red px-[3rem]
        py-[0.2rem] flex flex-row items-center'>
          <TitleIcon className='mr-[1.2rem] text-black dark:text-white'/>
          <p className='text-[0.9rem] md:text-[1rem]'>{reminderDetails.title}</p>
        </div>

        <div className='w-full border-solid border-0 border-l-4 border-l-primary-red px-[3rem]
        py-[0.2rem] flex flex-row items-center'>
          <TextSnippetIcon className='mr-[1.2rem] text-black dark:text-white' />
          <p className='text-[0.9rem] md:text-[1rem]'>{reminderDetails.notes}</p>
        </div>

        <div className='w-full border-solid border-0 border-l-4 border-l-primary-red px-[3rem]
        py-[0.2rem] flex flex-row items-center'>
          <DateRangeIcon className='mr-[1.2rem] text-black dark:text-white' />
          <p className='text-[0.9rem] md:text-[1rem]'>{reminderDetails.date?.replace("T00:00:00.000Z", "")}</p>
        </div>

        <div className='w-full border-solid border-0 border-l-4 border-l-primary-red px-[3rem]
        py-[0.2rem] flex flex-row items-center'>
          <AccessTimeIcon className='mr-[1.2rem] text-black dark:text-white' />
          <p className='text-[0.9rem] md:text-[1rem]'>{reminderDetails.time}</p>
        </div>

        <div className='w-full border-solid border-0 border-l-4 border-l-primary-red px-[3rem]
        py-[0.2rem] flex flex-row items-center'>
          {reminderDetails.flag === true ? <FlagIcon className='mr-[1.2rem] text-black dark:text-white' /> : <img src={FlagIconCrossed} className='mr-[0.8rem] text-black dark:text-white'/>}
          <p className='text-[0.9rem] md:text-[1rem]'>{reminderDetails.flag === true ? 'Flagged' : 'Not flagged'}</p>
        </div>
      </div>
    </div>
  )
}

ReminderDetails.propTypes = {
  isReminderDetailsOpen: PropTypes.bool,
  setIsReminderDetailsOpen: PropTypes.func,
  reminderDetails: PropTypes.object,
  setReminderDetails: PropTypes.func,
  setIsEditReminderOpen: PropTypes.func,
}