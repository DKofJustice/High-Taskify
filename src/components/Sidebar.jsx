import { useEffect, useRef } from 'react';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import toast from 'react-hot-toast';

export default function Sidebar({ isSidebarOpenMobile, setIsSidebarOpenMobile, isTodayBtnOpen, setIsTodayBtnOpen,
  isAllTasksBtnOpen, setIsAllTasksBtnOpen, isFlaggedBtnOpen, setIsFlaggedBtnOpen, isCompletedBtnOpen, setIsCompletedBtnOpen,
  fetchTodayTasks, fetchAllTasks, getFlaggedTasks, getCompletedTasks}) {

  const modalRef = useRef(null);

  // The modal closes when clicked outside of it
  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsSidebarOpenMobile(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsSidebarOpenMobile]);

  // Fetch all tasks when clicking the All Tasks button
  const handleAllTasksClick = () => {
    try {
      setIsAllTasksBtnOpen(true);
      setIsTodayBtnOpen(false);
      setIsFlaggedBtnOpen(false);
      setIsCompletedBtnOpen(false);
      setIsSidebarOpenMobile(false);
      fetchAllTasks();
    } catch(error) {
      toast.error('Interal Error')
    }
  }

  //Fetch all tasks for today when clicking the Today button
  const handleTodayClick = () => {
    try {
      setIsTodayBtnOpen(true);
      setIsAllTasksBtnOpen(false);
      setIsFlaggedBtnOpen(false);
      setIsCompletedBtnOpen(false);
      setIsSidebarOpenMobile(false);
      fetchTodayTasks();
    } catch(error) {
      toast.error('Interal Error')
    }
  };

  const handleFlaggedClick = () => {
    try {
      setIsFlaggedBtnOpen(true);
      setIsTodayBtnOpen(false);
      setIsAllTasksBtnOpen(false);
      setIsCompletedBtnOpen(false);
      setIsSidebarOpenMobile(false);
      getFlaggedTasks();
    } catch(error) {
      toast.error('Internal error')
    }
  };

  const handleCompletedClick = () => {
    try {
      setIsCompletedBtnOpen(true);
      setIsFlaggedBtnOpen(false);
      setIsTodayBtnOpen(false);
      setIsAllTasksBtnOpen(false);
      setIsSidebarOpenMobile(false);
      getCompletedTasks();
    } catch(error) {
      toast.error('Internal error')
    }
  };

  return (
    <div className={`bg-dark-100/70 w-full md:max-w-[20rem] h-full ${isSidebarOpenMobile && window.innerWidth <= '900' ? 'absolute z-[60] left-0' : 'absolute -left-[50rem]'}
    min-[900px]:relative min-[900px]:left-0`}>
        <div 
        ref={modalRef}
        className='overflow-y-auto w-full h-full max-w-[20rem] bg-light-300 dark:bg-dark-200'>
          <div className='pt-[2rem] pl-[1.5rem]'>
            <button 
            onClick={() => setIsSidebarOpenMobile(false)}
            className='bg-transparent border-none cursor-pointer min-[900px]:hidden'
            >
              <ArrowBackIcon className='text-white'/>
            </button>
          </div>

          <ul className="w-full list-none dark:text-white ps-0 border-0 border-b border-solid border-b-white/10">
              <li
              onClick={handleTodayClick}
              className={`${isTodayBtnOpen ? 'bg-light-200/50 dark:bg-dark-400 border-solid border-0 border-l-4 border-l-primary-red dark:text-white' : 'text-white/50'} 
              py-[1.2rem] px-[3rem] cursor-pointer`}
              >
                Today
              </li>
              <li 
              onClick={handleFlaggedClick}
              className={`${isFlaggedBtnOpen ? 'bg-light-200/50 dark:bg-dark-400 border-solid border-0 border-l-4 border-l-primary-red dark:text-white' : 'text-white/50'} 
              py-[1.2rem] px-[3rem] cursor-pointer`}
              >
                Important
              </li>
              <li
              onClick={handleAllTasksClick} 
              className={`${isAllTasksBtnOpen ? 'bg-light-200/50 dark:bg-dark-400 border-solid border-0 border-l-4 border-l-primary-red dark:text-white' : 'text-white/50'} 
              py-[1.2rem] px-[3rem] cursor-pointer`}
              >
                All Tasks
              </li>
              <li 
              onClick={handleCompletedClick}
              className={`${isCompletedBtnOpen ? 'bg-light-200/50 dark:bg-dark-400 border-solid border-0 border-l-4 border-l-primary-red dark:text-white' : 'text-white/50'} 
              py-[1.2rem] px-[3rem] cursor-pointer`}
              >
                Completed
              </li>
          </ul>

          <ul className="w-full list-none dark:text-white ps-0">
              <li className="py-[1.2rem] px-[3rem] text-white/50 cursor-pointer">Work</li>
              <li className="py-[1.2rem] px-[3rem] text-white/50 cursor-pointer">Work</li>
              <li className="py-[1.2rem] px-[3rem] text-white/50 cursor-pointer">Work</li>
              <li className="py-[1.2rem] px-[3rem] text-white/50 cursor-pointer">Work</li>
          </ul>

          <button className='w-full px-[3rem] bg-transparent border-none text-white/50 flex flex-row items-center
          text-[1rem] gap-x-[0.7rem] mt-[3rem]'>
              <AddIcon />
              New List
          </button>
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  isSidebarOpenMobile: PropTypes.bool,
  setIsSidebarOpenMobile: PropTypes.func,
  isTodayBtnOpen: PropTypes.bool,
  setIsTodayBtnOpen: PropTypes.func,
  isAllTasksBtnOpen: PropTypes.bool,
  setIsAllTasksBtnOpen: PropTypes.func,
  isFlaggedBtnOpen: PropTypes.bool,
  setIsFlaggedBtnOpen: PropTypes.func,
  isCompletedBtnOpen: PropTypes.bool,
  setIsCompletedBtnOpen: PropTypes.func,
  fetchTodayTasks: PropTypes.func,
  fetchAllTasks: PropTypes.func,
  getFlaggedTasks: PropTypes.func,
  getCompletedTasks: PropTypes.func,
}