import { useState } from "react";

export const CreationModal = ({ createType, publish, cancel }) => {
  const [userNumber, setUserNumber] = useState(3);

  const arrSize = 3;
  const arr = [1, 2, 3];

  const addUserNumber = async () => {
    arrSize = arrSize + 1;
    arr.push(arrSize);
  };

  const subUserNumber = async () => {
    arrSize = arrSize - 1;
    arr.pop();
  };



  return (
    <div>
      <div>
        <input type="text" name="title" placeholder={ createType + " Title"} />
       <textarea type="text" name="description" placeholder={ createType + " Description"}/>
        <input type="text" name="deadline" placeholder={ createType + " Deadline"} />
      </div>

      {createType === "Project" &&
      <div>
        {arr.map(a => {
          return <input type="text" key={a} placeholder="Add User"/>
        })}


      </div>
      }
    
    </div>
  );
}