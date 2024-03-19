import { useState, useEffect, useRef } from 'react' 
import ProfileImage from './../assets/Profile Image.png'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PropTypes from 'prop-types';
import SettingsIcon from '@mui/icons-material/Settings';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import Brightness4Icon from '@mui/icons-material/Brightness4';

export default function Header({ requestNotifications, searchInputValue, setSearchInputValue, handleSearchInput }) {

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  // The modal closes when clicked outside of it
  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setProfileModalOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setProfileModalOpen]);

  const logoutUser = () => {
    localStorage.removeItem('user');
    navigate('/login')
  };

  const themeClick = () => {
    const currentTheme = localStorage.getItem('theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    
    // Immediately update the class applied to the document element
    document.documentElement.classList.toggle('dark', newTheme === 'dark');

  };

  return (
    <header className="flex flex-row px-[1rem] md:px-[3rem] border-0 border-b border-solid border-b-black/10 dark:border-b-white/10
    py-[1rem] h-auto items-center">
        <div>
            <img src="" alt="" />
        </div>

        <div className='w-full flex flex-row justify-center items-center'>
            <form 
            onSubmit={handleSearchInput}
            className='w-full max-w-[15rem] md:max-w-[25rem] relative'>
              <SearchIcon className='absolute left-0 text-white/60 ml-[0.6rem] mt-[0.5rem]' />
              <input
              onChange={e => setSearchInputValue(e.target.value)}
              value={searchInputValue}
              className='w-full pl-[2.5rem] text-[0.9rem] font-roboto py-[0.8rem] border-none rounded-[7px]
              dark:bg-dark-300 dark:placeholder:text-white/60 dark:text-white focus:outline-none focus:border-none'
              type="text" 
              placeholder="Search reminder..."
              maxLength={1000} />
            </form>
        </div>

        <div 
        onClick={() => setProfileModalOpen(true)}
        className='w-[50px] h-[50px] overflow-hidden rounded-[25px]
        flex flex-row justify-center cursor-pointer'>
            <img 
            src={ProfileImage} 
            alt=""
            className='scale-[110%]'
            />
        </div>

        <div 
        ref={modalRef}
        className={`absolute ${ profileModalOpen ? 'block' : 'hidden'} flex flex-col w-[10rem]
         py-[0.5rem] bg-light-100 dark:bg-dark-300 rounded-lg gap-y-[0.5rem] shadow-xl right-[1rem] md:right-[3rem] top-[5rem] z-[150]`}>
          <button
          onClick={themeClick}
          className='bg-transparent border-none dark:text-white px-[1rem] py-[0.5rem] text-start 
          uppercase hover:bg-light-200 dark:hover:bg-dark-300-light cursor-pointer active:bg-light-200/50 dark:active:bg-dark-300-active 
          flex flex-row items-center gap-x-[0.5rem]'>
            <Brightness4Icon
              className='text-black/50 dark:text-white'
            />
            Dark Mode
          </button>
          <button
          onClick={requestNotifications}
          className='bg-transparent border-none dark:text-white px-[1rem] py-[0.5rem] text-start 
          uppercase hover:bg-light-200 dark:hover:bg-dark-300-light cursor-pointer active:bg-light-200/50 dark:active:bg-dark-300-active 
          flex flex-row items-center gap-x-[0.5rem]'>
            {Notification.permission === 'denied' ? (
            <span className='w-full flex flex-row items-center gap-x-[0.5rem]'>
              <NotificationsOffIcon
                className='text-black/50 dark:text-white'
                sx={{ fontSize: '1.5rem' }} 
              />
              Enable
            </span>
          ) : (Notification.permission === 'granted' ? (
            <span className='w-full flex flex-row items-center gap-x-[0.5rem]'>
              <NotificationsActiveIcon
                className='text-black/50 dark:text-white'
                sx={{ fontSize: '1.5rem' }} 
              />
              Disable
            </span>
          ) : (
            <span className='w-full flex flex-row items-center gap-x-[0.5rem]'>
              <NotificationsOffIcon
                className='text-black/50 dark:text-white'
                sx={{ fontSize: '1.5rem' }} 
              />
              Enable
            </span>
          )
        )}
          </button>
          <button
          className='bg-transparent border-none dark:text-white px-[1rem] py-[0.5rem] text-start 
          uppercase hover:bg-light-200 dark:hover:bg-dark-300-light cursor-pointer active:bg-light-200/50 dark:active:bg-dark-300-active
          flex flex-row items-center gap-x-[0.5rem]'>
            <SettingsIcon 
              className='text-black/50 dark:text-white'
            />
            Settings
          </button>
          <button 
          onClick={logoutUser}
          className='bg-transparent border-none text-primary-red font-bold px-[1rem] py-[0.5rem] text-start 
          uppercase hover:bg-light-200 dark:hover:bg-dark-300-light cursor-pointer active:bg-light-200/50 dark:active:bg-dark-300-active
          flex flex-row items-center gap-x-[0.5rem]'>
            <MeetingRoomIcon />   
            Logout
          </button>
        </div>
    </header>
  )
}

Header.propTypes = {
  requestNotifications: PropTypes.func,
  searchInputValue: PropTypes.string,
  setSearchInputValue: PropTypes.func,
  handleSearchInput: PropTypes.func,
}