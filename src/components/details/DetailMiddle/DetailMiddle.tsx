import MiddleLeft from "./MiddleLeft"
import MiddleRight from "./MiddleRight"

const DetailMiddle = () => {
  return (
    <div className="md:flex bg-black py-10 px-2 md:px-20">
        <div className="md:w-1/2">
            <MiddleLeft/>
        </div>
        <div className="md:w-1/2">
            <MiddleRight/>
        </div>
    </div>
  )
}

export default DetailMiddle