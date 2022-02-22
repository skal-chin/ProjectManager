import { Link } from "memfs/lib/node";
import { Button } from "./button";

export const Header = ({ logout, currentUser, projectTitle, projectOwner}) => {
  return (
    <div className="flex justify-between bg-indigo-500 text-white shadow-lg h-30 pb-3">
      <div className="m-2 flex-col">
        <div className="font-bold text-3xl"><a href="/" className="p-1">Hello, { currentUser }!</a></div>
        <div><button className="p-1 font-style: italic" type="button" onClick={logout}>logout</button></div>
      </div>
      {projectOwner && 
      <div className="m-2 flex-col">
        <div className="p-1">{ projectTitle }</div>
        <div className="p-1">{ projectOwner }</div>
      </div>
      }

    </div>
  );
}