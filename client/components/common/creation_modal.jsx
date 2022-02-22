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
    <div className="container flex flex-col bg-indigo-100 mx-24">
      <div className="flex flex-col mx-auto">
        <input className={"rounded-lg border-2 border-black border-r m-2"} 
          type="text" 
          name="title"
          onChange={(e) => setTitle(e.target.value)} 
          placeholder={ createType + " Title"} />

        <textarea 
          className="rounded-lg border-2 border-black m-2 w-80" 
          type="text" 
          name="description" 
          onChange={(e) => setDesc(e.target.value)}
          placeholder={ createType + " Description"}/>

        <input 
          className="rounded-lg border-2 border-black m-2 w-80" 
          type="text" 
          name="deadline"
          onChange={(e) => setDeadline(e.target.value)} 
          placeholder={ createType + " Deadline"} />

        <input 
          className="rounded-lg border-2 border-black m-2 w-80" 
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

      <div className="m-2 mt-4 flex justify-between">
        <button className="bg-red-600 rounded-md text-xl p-2" onClick={ cancel }>Cancel</button>
        <button className="bg-green-600 rounded-md text-xl p-2" onClick={ publish }>Publish</button>
      </div>

      {errors &&
        <div className="text-red-600">
          <ul>
            {errors.map((message) => (
              <li key={errors.indexOf(message)}>{message}</li>
            ))}
          </ul>
        </div>
      }

      {success &&
      <div className="text-green-600">
        <p>{ success }</p>
      </div>
      }
    
    </div>
  );
}