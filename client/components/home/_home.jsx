import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';
import { Header } from '../common/header';
import { CreateButton } from '../common/create_button';
// import { CreationModal } from '../common/creation_modal';
import { Card } from '../common/card';

export const Home = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [projects, setProjects] = useState([])
  const [projectModal, setModal] = useState(false);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [deadline, setDeadline] = useState('');
  const [otherUser, setOtherUser] = useState('');
  const [errorMessage, setError] = useState([]);
  const [successMessage, setSuccess] = useState('');
  
  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
    // const proj = await api.get('projects/');
    // setProjects(proj);
  }, []);

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }
  };

  // const openProjectModal = async => {
  //   setModal(true);
  // };

  const closeProjectModal = async => {
    setModal(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // return (
  //   <div className="p-4">
  //     <h1>Welcome {user.firstName}</h1>
  //     <Button type="button" onClick={logout}>
  //       Logout
  //     </Button>
  //     {roles.includes('admin') && (
  //       <Button type="button" onClick={() => navigate('/admin')}>
  //         Admin
  //       </Button>
  //     )}
  //   </div>
  // );

  // LOGIC FOR PROJECT CREATION
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
    
    const projectBody = {
      title: title,
      description: desc,
      deadline: deadline
    };

    if (otherUser !== '') {
      projectBody.otherUser = otherUser;
    }

    const project = await api.post('/projects', projectBody);

    setProjects([...projects, project]);

    if (project) {
      setSuccess('Project Created! Make a new project or press cancel');
    }
    closeProjectModal();
    return;
  }


  return (
    <div>
      <Header logout={logout} currentUser={user.firstName} ></Header>
      {/* <CreateButton desc="Project" onClick={ openProjectModal }></CreateButton> */}

      {/* <CreationModal createType="Project"></CreationModal> */}

      {/* <Card Title="This is a Title" Description="Some description that is longer and longer so I can see how it's going to fit in the context of the box. I want it to be longer so I can decide where to put the status button of this task card thing that I've been put in charge of." 
      Deadline="None" isAssigned="chin" ownerIcon="" incompleteTasks="" completeTasks=""></Card> */}

      {projectModal &&
        <CreationModal 
          createType="Project"
          publish={ submit } 
          cancel={ closeProjectModal }
          setTitle={ setTitle }
          setDesc={ setDesc }
          setDeadline={ setDeadline }
          setOtherUser={ setOtherUser }
          errors={ errorMessage }
          success={ successMessage }
          >
        </CreationModal>

      }
      
      {projects.length === 0 &&
        <div className='bg-indigo-100 mx-24 my-4'>
          <p className='flex justify-center'>You have no current projects</p>
        </div>
      }

      {projects.length > 0 &&
        <div>
          {projects.map((project) => (
            <a href={"project/" + project.id}>
              <Card
                key={project.id}
                isProject={true}
                Title={project.title}
                Description={project.description}
                Deadline={project.deadline}
              >
              </Card>

            </a>
          ))}
        </div>
      }

    </div>
  );
};
