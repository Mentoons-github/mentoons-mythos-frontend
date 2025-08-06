import CreateBlog from './createBlog'

const TopLeftSection = ({userId}:{userId:string}) => {
  return (
    <div className=''>
        <CreateBlog userId = {userId}/>
        {/* <CreateBlogBottom/> */}
    </div>
  )
}

export default TopLeftSection