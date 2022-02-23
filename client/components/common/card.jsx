import{useContext, useEffect, useState} from "react";
import { ApiContext } from "../../utils/api_context";
import { useNavigate } from 'react-router';

export const Card = ({ isProject, Title, ProjectId, Description, Deadline, ownerIcon, isProjectComplete, setComplete, incompleteTasks, completeTasks }) => {
  const navigate = useNavigate();
  const api = useContext(ApiContext);
  const [check, setCheck] = useState(isProjectComplete);
  const [cardPath, setCardPath] = useState('');
  const [taskUser, setTaskUser] = useState('')
  
  useEffect(async () => {
    if (isProject) {
      setCardPath('project_detail/');
    }
    else {
      setCardPath('task_detail/');
      setTaskUser((await api.get(`/tasks/${ProjectId}`)).assignedTo)
    }
  }, []);
  
  const isComplete = async () => {
    setComplete();

    setCheck(!check);
  };

  return (

    <div className="bg-indigo-200 pt-3 pl-3 pr-3 m-2 shadow-md rounded-lg">
      <div className="flex justify-between mb-2">
      <span onClick={() => navigate(`${cardPath}${ProjectId}`)} className="cursor-pointer align-text-left text-2xl pb-1">{ Title }</span>
        <button onClick={ isComplete } className={check ? "bg-purple-400 hover:bg-purple-500 text-white text-center py-1 px-3 rounded-full" :
                                                        "bg-blue-400 hover:bg-blue-500 text-white text-center py-1 px-3 rounded-full"}>
          { check ? "incomplete" : "complete" }</button>
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

          {!taskUser &&
            <button onClick={ assignUser }>Assign a User</button>
          }
          
          <span className="text-xs flex items-end"> { Deadline } </span>
        </div>
      }
      

    </div>
  );
}