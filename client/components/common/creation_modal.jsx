import { isEmpty } from "lodash";
import { useContext, useEffect, useState } from "react";
import { domainMatch } from "tough-cookie";
import { ApiContext } from "../../utils/api_context";

export const CreationModal = ({ createType, publish, cancel, setTitle, setDesc, setDeadline, setOtherUser, errors, success }) => {
  const api = useContext(ApiContext);
  const [userNumber, setUserNumber] = useState(4);
  const [userInputs, setInputs] = useState([1, 2, 3]);

  const addUserNumber = async () => {
    setUserNumber(userNumber + 1);
    setInputs([...userInputs, userNumber])
  };

  const subUserNumber = async () => {
    setUserNumber(userNumber - 1);
    userInputs.pop()
    setInputs([...userInputs])
    console.log(userInputs);
  };

  return (
    <div className="flex flex-col bg-indigo-200 mx-24 p-2 rounded-lg shadow-lg">
      <div className="flex flex-col">
        <input className={"border-2 border-indigo-400 border-r m-1 p-1 focus:outline-none"} 
          type="text" 
          name="title"
          onChange={(e) => setTitle(e.target.value)} 
          placeholder={ createType + " Title"} />

        <textarea 
          className="border-2 border-indigo-400 border-r m-1 p-1 focus:outline-none" 
          type="text" 
          name="description" 
          onChange={(e) => setDesc(e.target.value)}
          placeholder={ createType + " Description"}/>

        <input 
          className="border-2 border-indigo-400 border-r m-1 p-1 focus:outline-none"
          type="text" 
          name="deadline"
          onChange={(e) => setDeadline(e.target.value)} 
          placeholder={ createType + " Deadline"} />

        <input 
          className="border-2 border-indigo-400 border-r m-1 p-1 focus:outline-none"
          type="text"
          onChange={(e) => setOtherUser(e.target.value)} 
          placeholder="Invite User"/>
      </div>

{/* 
      {createType === "Project" &&
      <div className="flex flex-col mx-auto">
        {userInputs.map(a => {
          return <input 
                    className="rounded-lg border-2 border-black m-2 w-80" 
                    type="text" key={"user" + a}
                    onChange={(e) => addProjectUser(e.target.value)} 
                    placeholder="Invite User"/>
        })}


        <div className="flex flex-row">
          <button className="flex-1 bg-green-600 rounded-md text-xl mx-2 w-9" onClick={ addUserNumber }>+</button>
          {userNumber > 1 &&
          <button className="flex-1 bg-red-600 rounded-md text-xl mx-2 w-9" onClick={ subUserNumber }>-</button>
          }
        </div>

      </div>
      }
 */}

      {/* {createType === "Task" &&
      <div>
        <input className="rounded-lg border-2 border-black m-2 w-80" type="text" name="assignUser" placeholder="Assign User" />
      </div>
      }
 */}

      <div className="m-2 mt-4 flex justify-end">
        <div className="p-1">
          <button className="bg-purple-400 hover:bg-purple-500 text-white text-center py-1 px-3 rounded-full" onClick={ cancel }>Cancel</button>
        </div>
        <div className="p-1">
          <button className="bg-blue-400 hover:bg-blue-500 text-white text-center py-1 px-3 rounded-full" onClick={ publish }>Publish</button>
        </div>
      </div>

      {errors &&
        <div className="text-pink-600">
          <ul>
            {errors.map((message) => (
              <li key={errors.indexOf(message)}>{message}</li>
            ))}
          </ul>
        </div>
      }

      {success &&
      <div className="text-indigo-600">
        <p>{ success }</p>
      </div>
      }
    
    </div>
  );
}