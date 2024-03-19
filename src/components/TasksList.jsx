import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import FlagIcon from '@mui/icons-material/Flag';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';
import MenuIcon from '@mui/icons-material/Menu';
import LoadingIcon from './../assets/Loading Icon.svg'
import { motion } from "framer-motion"

export default function TasksList({ isNewReminderWindowOpen, setIsNewReminderWindowOpen,
    setIsReminderDetailsOpen, reminderDetails, setReminderDetails, setIsEditReminderOpen,
    taskList, loading, fetchAllTasks, setIsSidebarOpenMobile, isTodayBtnOpen, isFlaggedBtnOpen,
    isAllTasksBtnOpen, isCompletedBtnOpen }) {

  const openNewReminderWindow = () => {
    if(isNewReminderWindowOpen === false) {
        setIsNewReminderWindowOpen(true)
        setIsReminderDetailsOpen(false);
        setIsEditReminderOpen(false);
        setReminderDetails({});
    }
  };

  const openReminderDetailsWindow = (task) => {
    setIsNewReminderWindowOpen(false);
    setIsEditReminderOpen(false);
    setIsReminderDetailsOpen(true);
    setReminderDetails(task);
};

    const openReminderDetailsMobile = (task) => {
        if(window.innerWidth <= 700) {
            setIsNewReminderWindowOpen(false);
            setIsEditReminderOpen(false);
            setIsReminderDetailsOpen(true);
            setReminderDetails(task);
        }
    }

    const deleteTask = async (task) => {
        try {
            //Submitting the data to the database
            const response = await axios.delete(`${import.meta.env.VITE_SERVER_API}/delete_task/${task._id}`);

            console.log(response);

            toast.success('Reminder deleted successfuly');
            fetchAllTasks();

        } catch(error) {
            console.log(error);
            toast.error('An internal error has occured. Please try again');
        }
    }

    const completeTask = async (task) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_API}/complete_task/${task._id}`, {
                isCompleted: !task.isCompleted,
            });
            console.log(response);
            fetchAllTasks();

        } catch(error) {
            console.log(error);
            toast.error('An internal error has occured. Please try again');
        }
    };

    // Set the current date on the Today List page
    const currentDate = new Date();
    let currentDay = currentDate.getDay();
    let currentMonth = currentDate.getMonth();
    let currentMonthDate = currentDate.getDate();

    const weekDays = ['Monday', "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let dayNumber = weekDays[currentDay];
    let monthNumber = months[currentMonth];
    let dateNumber = currentMonthDate;

    //Fire a notification when a reminder is up
    let day = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate();
    let month = currentDate.getMonth() + 1 < 10 ? '0' + (currentDate.getMonth()+1) : currentDate.getMonth() + 1;
    let year = currentDate.getFullYear()

    let fullDate = `${year}-${month}-${day}`;

    let hour = currentDate.getHours() < 10 ? '0' + currentDate.getHours() : currentDate.getHours();
    let minute = currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes();

    let fullTime = `${hour}:${minute}`;

    taskList.map(task => {
        if(Notification.permission === 'granted' && task.date?.replace("T00:00:00.000Z", "") === fullDate && task.time === fullTime) {
            return new Notification(`Reminder: ${task.title}`);
        }
    })

  return (
    loading === true ? (
        <div className="w-full h-full max-w-[90rem] flex flex-col items-center mt-[2rem] md:mt-[4rem]">
            <div className='flex flex-row items-center md:gap-x-[2rem]'>
                <motion.div
                    animate={{
                        rotate: [0, 360]
                    }}
                    whileInView={{ display: 'block' }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear', }}
                    viewport={{ once: true }}
                >
                    <img src={LoadingIcon} alt="Loading-Icon" />
                </motion.div>
            </div>
        </div>
    ) : (
    <div className="w-full max-w-[90rem] flex flex-col">
        <div className="w-full flex flex-col sticky dark:bg-dark-100 z-50">
            <div className='pl-[1.5rem] pt-[1rem] min-[900px]:hidden'>
                <button
                onClick={() => setIsSidebarOpenMobile(true)} 
                className='bg-transparent border-none cursor-pointer'
                >
                    <MenuIcon className='text-white'/>
                </button>
            </div>

            <div className='flex flex-row items-center'>
                {isTodayBtnOpen && (
                    <div className="dark:text-white pl-[2rem] md:pl-[3rem]">
                        <p className="text-[1.3rem] md:text-[1.8rem] font-bold">Today</p>
                        <p className="text-[0.9rem] md:text-[1rem] font-semibold">{`${dayNumber}, ${monthNumber} ${dateNumber}`}</p>
                    </div>
                )}
                {isAllTasksBtnOpen && (
                    <div className="dark:text-white pl-[2rem] md:pl-[3rem]">
                        <p className="text-[1.3rem] md:text-[1.8rem] font-bold">All Tasks</p>
                    </div>
                )}
                {isFlaggedBtnOpen && (
                    <div className="dark:text-white pl-[2rem] md:pl-[3rem]">
                        <p className="text-[1.3rem] md:text-[1.8rem] font-bold">Important</p>
                    </div>
                )}
                {isCompletedBtnOpen && (
                    <div className="dark:text-white pl-[2rem] md:pl-[3rem]">
                        <p className="text-[1.3rem] md:text-[1.8rem] font-bold">Completed</p>
                    </div>
                )}

                <div className='ml-auto pr-[2rem] md:pr-[3rem]'>
                    <button 
                    onClick={openNewReminderWindow}
                    className="bg-primary-red border-none rounded-full w-[40px] h-[40px]
                    cursor-pointer">
                        <AddIcon className='text-white' />
                    </button>
                </div>
            </div>
        </div>

        <ul className="w-full pl-0 divide-y divide-white/10 h-full overflow-y-auto pb-[3rem]">
            {taskList.map((task, index) => {
                return <li 
                key={index}
                className={`w-full flex flex-row items-center relative
                gap-x-[1.5rem] md:gap-x-[3rem] border-solid border-0 border-l-4 !border-x-transparent
                hover:bg-dark-300/30 ${reminderDetails._id === task._id ? 'bg-dark-300-active/20 !border-l-primary-red hover:bg-dark-300-active/20' : ''}`}>
                    <div className='pl-[2rem] md:pl-[3rem]'>
                        <label htmlFor={`task-${task._id}`} className="group flex flex-row items-center gap-x-[1rem] cursor-pointer">
                            <input type="checkbox" name={`task-${task._id}`} id={`task-${task._id}`}
                            className="peer hidden"
                            defaultChecked={task.isCompleted}
                            onChange={() => completeTask(task)}
                            />
                            <span className="relative group w-5 h-5 border-solid border-4 rounded-full border-black/60 dark:border-white/60
                            peer-checked:bg-primary-red peer-checked:border-primary-red">
                            <CheckIcon 
                            className='text-white absolute -left-1 -top-[2px] opacity-0 group-has-[:checked]:opacity-100'
                            />
                            </span>
                        </label>
                    </div>
    
                    <div 
                    onClick={() => openReminderDetailsMobile(task)}
                    className='w-full flex flex-row items-center relative
                    gap-x-[1.5rem] md:gap-x-[3rem]'>
                        <div>
                            <p className='dark:text-white w-full max-w-[15rem] text-[0.9rem] md:text-[1rem] overflow-hidden text-ellipsis text-nowrap'>
                                {task.title}
                            </p>
                            <p className='dark:text-white/60 text-[0.8rem] md:text-[0.9rem] w-full max-w-[15rem] overflow-hidden text-ellipsis text-nowrap'>
                                {task.notes}
                            </p>
                        </div>

                        <div className='w-[24px] hidden min-[700px]:block'>
                            {task.flag && <FlagIcon className='text-primary-red'/>}
                        </div>

                        <div className='hidden min-[700px]:block'>
                            <p className='dark:text-white/60 text-[0.9rem]'>{task.date?.replace("T00:00:00.000Z", "")}</p>
                            <p className='dark:text-white/60 text-[0.9rem]'>{task.time}</p>
                        </div>
        
                        <div className='ml-auto pr-[3rem] hidden min-[700px]:flex flex-row'>
                            <button 
                            onClick={() => openReminderDetailsWindow(task)}
                            className="bg-transparent border-none text-black/60 dark:text-white/60 cursor-pointer">
                                <PlayArrowIcon />
                            </button>
                            <button 
                            onClick={() => deleteTask(task)}
                            className='bg-transparent border-none text-black/60 dark:text-white/60 cursor-pointer'>
                                <DeleteIcon />
                            </button>
                        </div>
                    </div>
                </li>
            })}
            {taskList.length === 0 ? <p className="pl-[2rem] md:pl-[3rem] text-[0.9rem] md:text-[1rem] dark:text-white/70">There are no tasks created...</p> : ''}
        </ul>
    </div>
    )
  )
}

TasksList.propTypes = {
    isNewReminderWindowOpen: PropTypes.bool,
    setIsNewReminderWindowOpen: PropTypes.func,
    isReminderDetailsOpen: PropTypes.bool,
    setIsReminderDetailsOpen: PropTypes.func,
    reminderDetails: PropTypes.object,
    setReminderDetails: PropTypes.func,
    isEditReminderOpen: PropTypes.bool,
    setIsEditReminderOpen: PropTypes.func,
    taskList: PropTypes.array,
    loading: PropTypes.bool,
    fetchAllTasks: PropTypes.func,
    setIsSidebarOpenMobile: PropTypes.func,
    isTodayBtnOpen: PropTypes.bool,
    isFlaggedBtnOpen: PropTypes.bool,
    isAllTasksBtnOpen: PropTypes.bool,
    isCompletedBtnOpen: PropTypes.bool,
}