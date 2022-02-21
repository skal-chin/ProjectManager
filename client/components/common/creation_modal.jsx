import { isEmpty } from "lodash";
import { useContext, useEffect, useState } from "react";
import { domainMatch } from "tough-cookie";
import { ApiContext } from "../../utils/api_context";

export const CreationModal = ({ createType, publish, cancel, currentProjects, getProject }) => {
  const api = useContext(ApiContext);
  const [userNumber, setUserNumber] = useState(4);
  const [userInputs, setInputs] = useState([1, 2, 3]);
  
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [deadline, setDeadline] = useState('');
  const [otherUser, setOtherUser] = useState('');
  const [errorMessage, setError] = useState([]);
  const [successMessage, setSuccess] = useState('');

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

  const submit = async () => {
    setError([]);
    let errors = [];
    let isUser = false;

    if (title === '') {
      errors.push('Enter a title');
      console.log(errors);
    }

    if (desc === '') {
      errors.push('Enter a description');
    }

    if (deadline === '') {
      errors.push('Enter a deadline');
    }

    if (otherUser !== '') {
      const getUserBody = {
        email: otherUser,
      };
      let isUser = await api.get(`/other_user/${otherUser}`);
      if (isUser.success === false) {
        errors.push(`'${otherUser}' is not a user. Enter a valid user or leave 'Invite User' box empty.`)
      }
    }

    console.log(errors);

    if (errors.length !== 0) {
      setError(errors);
      return;
    }
    
    const projectBody = {
      title: title,
      description: desc,
      deadline: deadline
    };

    if (otherUser !== '') {
      projectBody.otherUser = otherUser;
    }

    const project = await api.post('/projects', projectBody);

    getProject([...currentProjects, project]);

    if (project) {
      setSuccess('Project Created! Make a new project or press cancel');
    }
    return;
  }

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
        <button className="bg-green-600 rounded-md text-xl p-2" onClick={ submit }>Publish</button>
      </div>

      {errorMessage.length !== 0 &&
        <div className="text-red-600">
          <ul>
            {errorMessage.map((message) => (
              <li key={errorMessage.indexOf(message)}>{message}</li>
            ))}
          </ul>
        </div>
      }

      {!successMessage.isEmpty &&
      <div className="text-green-600">
        <p>{ successMessage }</p>
      </div>

      }
    
    </div>
  );
}