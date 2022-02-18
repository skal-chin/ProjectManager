import { Link } from "memfs/lib/node";
import { Button } from "./button";

export const Header = ({ logout, currentUser, projectTitle, projectOwner}) => {
  return (
    <div className="font-bold text-xl flex justify-between rounded-b-lg bg-gray-600 text-white h-24">
      <div className="m-2 flex-col">
        <div><a href="/" className="p-1">{ currentUser }</a></div>
        <div><button className="p-1" type="button" onClick={logout}>Logout</button></div>
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