import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ApiContext } from "../../utils/api_context";
import { RolesContext } from "../../utils/roles_context";
import {useHistory, useParams} from 'react-router-dom';

export const ProjectPage = () => {
  const api = useContext(ApiContext);
  const { projectId } = useParams();

  // let project = await api.get(`projects/${id}`);
  return (<div>Hello World</div>);
}