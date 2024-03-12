import { useEffect, useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import { Timestamp } from "firebase/firestore"
import { useFirestore } from "../../hooks/useFirestore"
import Avatar from "../../components/Avatar"
import { formatDistanceToNow } from "date-fns"

const ProjectComments = ({ project }) => {
    const [newComment, setNewComment] = useState('')
    const { user } = useAuthContext()
    const { updateDocument, response } = useFirestore('projects') 

    const handleSubmit = async (e) => {
        e.preventDefault()

        const commentsToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: Timestamp.fromDate(new Date()),
            id: Math.random()
        }
        console.log(commentsToAdd);

        await updateDocument(project.id, {
            comments: [...project.comments, commentsToAdd]
        })
    }

    useEffect(() => {
        if(response.success){
            setNewComment('')
        }
    }, [response])

  return (
    <div className="project-comments">
        <h4>Project Comments</h4>

        <ul>
            {project.comments.length > 0 && project.comments.map(comment => (
                <li key={comment.id}>
                    <div className="comment-author">
                        <Avatar src={comment.photoURL} />
                        <p>{comment.displayName}</p>
                    </div>
                    <div className="comment-date">
                        <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true})}</p>
                    </div>
                    <div className="comment-content">
                        <p>{comment.content}</p>
                    </div>
                </li>
            ))}
        </ul>

        <form className="add-comment" onSubmit={handleSubmit}>
            <label>
                <span>Add new comment:</span>
                <textarea
                    required
                    onChange={(e) => setNewComment(e.target.value)}
                    value={newComment}
                ></textarea>
                <button className="btn">Add Comment</button>
            </label>
        </form>
    </div>
  )
}

export default ProjectComments