import { useState, useEffect, useContext } from 'react'
import Header from './../components/Header'
import Sidebar from './../components/Sidebar'
import TasksList from './../components/TasksList'
import NewReminder from './../components/NewRemider'
import ReminderDetails from './../components/ReminderDetails'
import EditReminder from './../components/EditReminder'
import { AuthContext } from './../context/AuthContext'
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Main() {

  // Various states needed to run the page
  const [isNewReminderWindowOpen, setIsNewReminderWindowOpen] = useState(false);
  const [isReminderDetailsOpen, setIsReminderDetailsOpen] = useState(false);
  const [isEditReminderOpen, setIsEditReminderOpen] = useState(false);
  const [reminderDetails, setReminderDetails] = useState({});

  const { user } = useContext(AuthContext);
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);

  const [isTodayBtnOpen, setIsTodayBtnOpen] = useState(true);
  const [isFlaggedBtnOpen, setIsFlaggedBtnOpen] = useState(false);
  const [isAllTasksBtnOpen, setIsAllTasksBtnOpen] = useState(false);
  const [isCompletedBtnOpen, setIsCompletedBtnOpen] = useState(false);

  const [searchInputValue, setSearchInputValue] = useState('');

  // Fetch all tasks for current user
  const getAllTasks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_API}/get_tasks/${user.userID}`);
      console.log(res.data)
      setTaskList(res.data)
      setLoading(false);
    } catch(err) {
      toast.error(err);
    }
  };

  const fetchAllTasks = () => {
    setLoading(true);
    getAllTasks();
  };

  // Fetch all tasks when user logs in or refreshes the page
  useEffect(() => {
    setLoading(true);
    getTodayTasks();
  }, [user.userID]);

  //Fetch all tasks for today
  const getTodayTasks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_API}/get_tasks_today/${user.userID}`);
      console.log(res.data)
      setTaskList(res.data)
      setLoading(false);
    } catch(err) {
      toast.error(err);
    }
  };

  const fetchTodayTasks = () => {
    setLoading(true);
    getTodayTasks();
  };

  // Fetch important tasks
  const getFlaggedTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_API}/get_tasks_flagged/${user.userID}`);
      console.log(res.data)
      setTaskList(res.data)
      setLoading(false);
    } catch(err) {
      toast.error(err);
    }
  };

  // Fetch important tasks
  const getCompletedTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_API}/get_tasks_completed/${user.userID}`);
      console.log(res.data)
      setTaskList(res.data)
      setLoading(false);
    } catch(err) {
      toast.error(err);
    }
  };

  // Enable or disable notifications
  const requestNotifications = async () => {
    if(!('Notifications' in window)) {
      alert('Browser does not support notifications');
    } else if (Notification.permission === 'granted') {
      new Notification('Notifications have been enabled');
    } else if (Notification.permission !== 'denied') {
      await Notification.requestPermission().then(permission => {
        if(permission === 'granted') {
          new Notification('Notifications have been enabled');
        }
      });
    }
  };

  //Search tasks from the search bar
  const handleSearchInput = async (e) => {
    setLoading(true);
    e.preventDefault();
    if(searchInputValue?.trim().length > 3) {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_API}/get_tasks/${user.userID}`);
      const searchTaskList = res.data.filter(task => task.title.toLowerCase().includes(searchInputValue));
      setTaskList(searchTaskList);
    }
    setLoading(false);
    setSearchInputValue('');
    setIsAllTasksBtnOpen(true);
    setIsTodayBtnOpen(false);
    setIsFlaggedBtnOpen(false);
    setIsCompletedBtnOpen(false);
  }

  return (
    <div className='bg-light-200 dark:bg-dark-100 w-full h-full'>
        <Header 
          requestNotifications={requestNotifications}

          searchInputValue={searchInputValue}
          setSearchInputValue={setSearchInputValue}

          handleSearchInput={handleSearchInput}
        />

        <div className='flex flex-row w-full h-full relative'>
            <Sidebar
              setIsSidebarOpenMobile={setIsSidebarOpenMobile}
              isSidebarOpenMobile={isSidebarOpenMobile}

              isTodayBtnOpen={isTodayBtnOpen}
              setIsTodayBtnOpen={setIsTodayBtnOpen}

              isFlaggedBtnOpen={isFlaggedBtnOpen}
              setIsFlaggedBtnOpen={setIsFlaggedBtnOpen}

              isAllTasksBtnOpen={isAllTasksBtnOpen}
              setIsAllTasksBtnOpen={setIsAllTasksBtnOpen}

              isCompletedBtnOpen={isCompletedBtnOpen}
              setIsCompletedBtnOpen={setIsCompletedBtnOpen}

              fetchTodayTasks={fetchTodayTasks}
              fetchAllTasks={fetchAllTasks}
              getFlaggedTasks={getFlaggedTasks}
              getCompletedTasks={getCompletedTasks}
            />

            <TasksList 
              isNewReminderWindowOpen={isNewReminderWindowOpen}
              setIsNewReminderWindowOpen={setIsNewReminderWindowOpen}

              isReminderDetailsOpen={isReminderDetailsOpen}
              setIsReminderDetailsOpen={setIsReminderDetailsOpen}

              reminderDetails={reminderDetails}
              setReminderDetails={setReminderDetails}

              isEditReminderOpen={isEditReminderOpen}
              setIsEditReminderOpen={setIsEditReminderOpen}

              taskList={taskList}
              loading={loading}
              fetchAllTasks={fetchAllTasks}

              isSidebarOpenMobile={isSidebarOpenMobile}
              setIsSidebarOpenMobile={setIsSidebarOpenMobile}

              isTodayBtnOpen={isTodayBtnOpen}
              isFlaggedBtnOpen={isFlaggedBtnOpen}
              isAllTasksBtnOpen={isAllTasksBtnOpen}
              isCompletedBtnOpen={isCompletedBtnOpen}
            />

            <div className={`w-full max-w-[35rem] h-full border-0 border-l border-solid
            border-l-black/10 dark:border-l-white/10 overflow-y-auto dark:bg-dark-100 2xl:block z-[100] ${window.innerWidth <= '1520'
            && (isNewReminderWindowOpen || isReminderDetailsOpen || isEditReminderOpen) ? 'block absolute right-0' : 'hidden'}`}>
              <NewReminder
                isNewReminderWindowOpen={isNewReminderWindowOpen}
                setIsNewReminderWindowOpen={setIsNewReminderWindowOpen}

                fetchAllTasks={fetchAllTasks}
              />
              <ReminderDetails 
                isReminderDetailsOpen={isReminderDetailsOpen}
                setIsReminderDetailsOpen={setIsReminderDetailsOpen}

                reminderDetails={reminderDetails}
                setReminderDetails={setReminderDetails}

                setIsEditReminderOpen={setIsEditReminderOpen}
              />

              <EditReminder 
                isEditReminderOpen={isEditReminderOpen}
                setIsEditReminderOpen={setIsEditReminderOpen}

                reminderDetails={reminderDetails}
                setReminderDetails={setReminderDetails}
                
                fetchAllTasks={fetchAllTasks}
              />
            </div>
        </div>
    </div>
  )
}
