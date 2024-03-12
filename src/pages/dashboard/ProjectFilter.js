const filterList = ['all', 'mine', 'sales', 'development', 'design', 'marketing', 'completed', 'in progress']

const ProjectFilter = ({ currentFilter, changeFilter }) => {
    
    const handleClick = (newFilter) => {
        console.log(newFilter);
        changeFilter(newFilter)
    }

  return (
    <div className="project-filter">
        <nav>
            <p>Filter by: </p>
            {filterList.map((f) => (
                <button key={f}
                    onClick={() => handleClick(f)}
                    className={currentFilter === f ? 'active' : ''}
                >
                    {f}
                </button>
            ))}
        </nav>
    </div>
  )
}

export default ProjectFilter