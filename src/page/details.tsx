import DetailMiddle from "../components/details/DetailMiddle/DetailMiddle"
import WelcomeSection from "../components/details/WelcomeSection"
import CareerPath from "../components/details/CareerPath"
import ImproveSkills from "../components/details/ImproveSkills/ImproveSkills"
import MakeCall from "../components/details/ImproveSkills/MakCall"

const Details = () => {
    return (
        <div className="">
            <WelcomeSection/>
            <CareerPath/>
            <DetailMiddle/>
            <ImproveSkills/>
            <MakeCall/>
        </div>
    )
}
export default Details