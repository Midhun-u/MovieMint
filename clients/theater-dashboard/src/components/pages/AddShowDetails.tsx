import style from '../../styles/pages/addShowDetails.module.scss'
import AddShow from '../addShowDetails/AddShow'
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
      {/* Add Show screen */}
      <AddShow
      />
    </div>
    
  )
  
}

export default AddShowDetails