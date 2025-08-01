import CreateBlog from './createBlog'
import CreateBlogBottom from './createBlogBottom'

const TopLeftSection = ({userId}:{userId:string}) => {
  return (
    <div className=''>
        <CreateBlog userId = {userId}/>
        <CreateBlogBottom/>
    </div>
  )
}

export default TopLeftSection