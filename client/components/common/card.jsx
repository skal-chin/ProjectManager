import{useContext, useEffect, useState} from "react";
import { useNavigate } from 'react-router';

export const Card = ({ isProject, Title, ProjectId, Description, Deadline, isAssigned, ownerIcon, isProjectComplete, setComplete, incompleteTasks, completeTasks }) => {
  const navigate = useNavigate();
  const [check, setCheck] = useState(isProjectComplete);
  const [cardPath, setCardPath] = useState('');
  
  useEffect(async () => {
    if (isProject) {
      setCardPath('project_detail/');
    }
    else {
      setCardPath('task_detail/');
    }

  }, []);
  
  const isComplete = async () => {
    setComplete();

    setCheck(!check);
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

      <div className="flex justify-between pb-3">
        <span className=""> { ownerIcon }{ isAssigned } </span>
        <span className="text-xs  flex items-end"> { Deadline } </span>
      </div>

      

    </div>
  );
}