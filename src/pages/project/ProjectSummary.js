import { useEffect, useState } from "react"
import Avatar from "../../components/Avatar"
import { useFirestore } from "../../hooks/useFirestore"
import { useAuthContext } from "../../hooks/useAuthContext"

const ProjectSummary = ({ project }) => {
    const { updateDocument, response } = useFirestore('projects')
    const [projectStatus, setProjectStatus] = useState(project.completed)
    const { user } = useAuthContext()
    
    const updateProjectStatus = (e) => {
        updateDocument(project.id, {completed: true})
    }

    useEffect(() => {
        if(response.success){
            setProjectStatus(true)
        }
    },[response])


  return (
    <div>
        <div className="project-summary">
            <h2 className="page-title">{project.name}</h2>
            <p>By {project.createdBy.displayName}</p>
            <p className="due-date">Project due by {project.dueDate.toDate().toDateString()}</p>
            <p className="details">{project.details}</p>
            <h4>Project is assigned to: </h4>
            <div className="assigned-users">
                {project.assignedUsersList.map(user => (
                    <div key={user.id}>
                        <Avatar src={user.photoURL}/>
                    </div>
                ))}
            </div>
        </div>
        {projectStatus && <button className="btn completed" disabled>Completed</button>}
        {!projectStatus && user.uid === project.createdBy.id && (
            <button className="btn" onClick={updateProjectStatus}>Mark as Complete</button>
        )}
    </div>
  )
}

export default ProjectSummary