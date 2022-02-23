import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ApiContext } from "../../utils/api_context";
import { RolesContext } from "../../utils/roles_context";
import {useHistory, useParams} from 'react-router-dom';
import { Header } from "../common/header";
import { CreationModal } from "../common/creation_modal";
import { Card } from "../common/card";
import { CreateButton } from "../common/create_button";

export const ProjectPage = () => {
  const api = useContext(ApiContext);
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [project, setProject] = useState(null);
  const [taskModal, setTaskModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [deadline, setDeadline] = useState('');
  const [otherUser, setOtherUser] = useState('');
  const [errorMessage, setError] = useState([]);
  const [successMessage, setSuccess] = useState('');

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setProject((await api.get(`projects/${id}`)).project);
    const taskList = await api.get(`tasks/${id}`);
    console.log(taskList);
    setTasks(taskList.tasks);
    setLoading(false);
  }, []);

  // console.log('----------');
  // console.log('Tasks: ', tasks.tasks);

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }
  };

  const openTaskModal = async () => {
    setTaskModal(true);
  };

  const closeTaskModal = async () => {
    setTaskModal(false);
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
      isUser = await api.get(`/other_user/${otherUser}`);
      if (isUser.success === false) {
        errors.push(`'${otherUser}' is not a user. Enter a valid user or leave 'Invite User' box empty.`)
      }
    }

    console.log(errors);

    if (errors.length !== 0) {
      setError(errors);
      return;
    }
    
    const taskBody = {
      title: title,
      description: desc,
      deadline: deadline,
      projectId: project.id,
    };

    if (otherUser !== '') {
      taskBody.assignedTo = otherUser;
    }

    const task = await api.post('/tasks', taskBody);

    setTasks([...tasks, task]);

    if (task) {
      setSuccess('Task Created! Make a new task or press cancel');
    }
    closeTaskModal();
    return;
  }

  const setComplete = async (task) => {
    task.isComplete = !task.isComplete;

    const taskBody = {
      title : task.title,
      description : task.description,
      deadline : task.deadline,
      isComplete : task.isComplete,
    }

    const updatedTask = await api.put(`/tasks/${task.id}`, taskBody);
    return;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return ( 
  <div>
  
    <div>
      <Header
      logout={ logout }
      currentUser={ user.firstName }
      projectTitle={ project.title }
      projectOwner={ project.ownerEmail }
    ></Header>

    <CreateButton
      desc="Task"
      onClick={ openTaskModal }
    >
    </CreateButton>
  </div>
    
  

  {taskModal &&
    <CreationModal
      createType="Task"
      publish={ submit }
      cancel={ closeTaskModal }
      setTitle={ setTitle }
      setDesc={ setDesc }
      setDeadline={ setDeadline }
      setOtherUser={ setOtherUser }
      errors={ errorMessage }
      success={ successMessage }
    >
    </CreationModal>
  }

  {tasks.length === 0 &&
    <div className='bg-indigo-100 mx-24 p-1 my-4 rounded-lg shadow-lg'>
      <p className='flex justify-center'>You have no current tasks</p>
    </div>
  }

  {tasks.length > 0 &&
    <div>
      {tasks.map((task) => (
        
        <Card
        key={task.id}
        isProject={false}
        Title={task.title}
        ProjectId={task.id}
        Description={task.description}
        Deadline={task.deadline}
        isProjectComplete={task.isComplete}
        setComplete={() => setComplete(task)}
        assignedUser={task.assignedTo}
        >
        </Card>
      ))}
    </div>
  }
  </div>);
}