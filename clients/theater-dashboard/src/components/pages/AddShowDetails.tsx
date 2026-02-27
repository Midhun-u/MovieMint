import style from '../../styles/pages/addShowDetails.module.scss'
import ShowDetails from '../addShowDetails/ShowDetails'
import PageDetails from '../ui/PageDetails'

const AddShowDetails = () => {
  
  return (
    
    <div className={style.container}>
      {/* Page details */}
      <PageDetails
        title='Add Show'
        about='You can add shows, so users can book the show'
        backButton
      />
      {/* Show details */}
      <ShowDetails
      />
    </div>
    
  )
  
}

export default AddShowDetails