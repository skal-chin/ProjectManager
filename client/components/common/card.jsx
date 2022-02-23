import{useContext, useEffect, useState} from "react";
import { ApiContext } from "../../utils/api_context";
import { useNavigate } from 'react-router';
import { UserButton } from "./user_button";

export const Card = ({ isProject, Title, ProjectId, Description, Deadline, ownerIcon, isProjectComplete, setComplete, assignedUser, incompleteTasks, completeTasks }) => {
  const navigate = useNavigate();
  const api = useContext(ApiContext);
  const [check, setCheck] = useState(isProjectComplete);
  const [cardPath, setCardPath] = useState('');
  const [taskUser, setTaskUser] = useState(null);
  const [assignForm, setForm] = useState(false);
  const [addUser, setUser] = useState('');
  const [errors, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  useEffect(async () => {
    if (isProject) {
      setCardPath('project_detail/');
    }
    else {
      setCardPath('task_detail/');
      setTaskUser(assignedUser);
    }
  }, []);
  
  const isComplete = async () => {
    setComplete();

    setCheck(!check);
  };

  const openForm = async () => {
    setForm(true);
  };

  const cancel = async () => {
    setForm(false);
  };

  
  const assignUser = async () => {
    setError('');
    let isUser = false;

    if (addUser !== '') {
      isUser = await api.get(`/other_user/${addUser}`);
    }

    if (isUser.success === false) {
      setError(`'${addUser} is not a user. Add a valid user`)
      return;
    }

    const taskBody = {
      title: Title,
      description: Description,
      deadline: Deadline,
      isComplete: isProjectComplete,
      assignTo: addUser,
    };

    const task = await api.put(`/tasks/${ProjectId}`, taskBody);

    setSuccess(`You have added ${addUser} to the task`);
    setForm(false);
    setTaskUser(addUser);
    setUser('');
    return;
  };

  return (


    <div className="bg-purple-200 pt-3 pl-3 pr-3 m-2 shadow-md rounded-lg">
      <div className="flex justify-between mb-2">
      <span onClick={() => navigate(`${cardPath}${ProjectId}`)} className="cursor-pointer align-text-left text-2xl pb-1">{ Title }</span>
        <button onClick={ isComplete } className={check ? "bg-blue-400 hover:bg-blue-500 text-white text-center py-1 px-3 rounded-full" :
                                                          "bg-red-400 hover:bg-red-500 text-white text-center py-1 px-3 rounded-full" }>
          { check ? "complete" : "incomplete" }</button>
      </div>

      {isProject &&
        <div className="pb-3">
          <p className="text-justify">{ Description }</p>
        </div>
      }

      {!isProject &&
        <div className="flex justify-between pb-3">
          {taskUser &&
            <span className=""> { ownerIcon }{ taskUser } </span>
          }

          {taskUser === null && !assignForm &&
            <UserButton onClick={ openForm }>Assign a User</UserButton>
          }

          {assignForm &&
            <div>
              <input className={"border-2 border-indigo-400 border-r m-1 p-1 focus:outline-none"} 
                type="text" 
                name="title"
                onChange={(e) => setUser(e.target.value)} 
                placeholder="Enter User" />

              <div className="m-2 mt-4 flex justify-end">
                <div className="p-1">
                  <button className="bg-purple-400 hover:bg-purple-500 text-white text-center py-1 px-3 rounded-full" onClick={ cancel }>Cancel</button>
                </div>
                <div className="p-1">
                  <button className="bg-blue-400 hover:bg-blue-500 text-white text-center py-1 px-3 rounded-full" onClick={ assignUser }>Publish</button>
                </div>
              </div>
            </div>
          }
          
          {errors &&
            <div className="text-pink-600">
              <p>{ errors }</p>
            </div>
          }

          {success &&
          <div className="text-indigo-600">
            <p>{ success }</p>
          </div>
          }
          
          <span className="text-xs flex items-end"> { Deadline } </span>
        </div>
      }
      

    </div>
  );
}