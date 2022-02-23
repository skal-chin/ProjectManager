import { useNavigate } from "react-router";
import image from "../../img/ditto.png";
import img from "../../img/moon.png";


export const Header = ({ logout, currentUser, projectTitle, projectOwner}) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between text-white shadow-lg h-35 pb-3"
    style={{ backgroundImage:`url(${image})` }}>
      <div className="m-2 flex-col">
        <div className="font-bold text-4xl"><a href="/" className="p-1">Hello, { currentUser }!</a></div>
        <div><button className="p-1 font-style: italic" type="button" onClick={logout}>logout</button></div>
      </div>
      {projectOwner && 
      <div className="m-2 flex-col text-right bg-pink-400 rounded-lg drop-shadow-lg">
        <div className="p-1 text-xl">Project Title: { projectTitle }</div>
        <div>
          <img src={img} alt="moon" /> 
          <span className="p-1">Project Owner: { projectOwner }</span>
        </div>
        
      </div>
      }

    </div>
  );
}