import { useState } from 'react'
import ProjectList from '../../components/ProjectList'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import ProjectFilter from './ProjectFilter'

//styles
import './Dashboard.css'

const Dashboard = () => {
  const { documents, error } = useCollection('projects')
  const [currentFilter, setCurrentFilter] = useState('all')
  const { user } = useAuthContext()

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  const projects = documents ? documents.filter((document) => {
    switch (currentFilter) {
      case 'all': 
        return true
      case 'mine':
        let assignedToMe = false
        document.assignedUsersList.forEach((u) => {
          if (user.uid === u.id){
            assignedToMe = true
          }
        })
        return assignedToMe
      case 'sales':
      case 'development':
      case 'design':
      case 'marketing':
        console.log(document.category, currentFilter)
        return document.category === currentFilter
      case 'completed':
        return document.completed === true
      case 'in progress':
        return document.completed !== true
      default:
        return true
    }
  }) : null

  return (
    <div>
        <h2 className='page-title'>Dashboard</h2>
        {error && <p className='error'>{error}</p>}
        {documents && (
          <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter}/>
        )}
        {documents && <ProjectList projects = {projects}/>}
    </div>
  )
}

export default Dashboard