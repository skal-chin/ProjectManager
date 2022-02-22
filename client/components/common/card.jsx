import{useContext, useEffect, useState} from "react";

export const Card = ({ isProject, Title, Description, Deadline, isAssigned, ownerIcon, incompleteTasks, completeTasks }) => {
  
  const [check, setCheck] = useState(false);
  const isComplete = async () => {
    setCheck(!check)
  };

  return (

    <div className="bg-indigo-200 pt-3 pl-3 pr-3 m-2 shadow-md rounded-lg">
      <div className="flex justify-between mb-2">
        <span className="align-text-left text-2xl pb-1">{ Title }</span>
        <button onClick={isComplete} className={check ? "bg-purple-400 hover:bg-purple-500 text-white text-center py-1 px-3 rounded-full" :
                                                        "bg-blue-400 hover:bg-blue-500 text-white text-center py-1 px-3 rounded-full"}>
          { check ? "incomplete" : "complete" }</button>
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