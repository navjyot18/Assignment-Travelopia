import { useEffect, useState } from "react"
import NavBar from './Navbar';
import axios from 'axios';
function TravelDetails() {
    const [travelData, setTravelData] = useState();
    const [isDataLoaded, setIsDataLoaded] = useState(false)
    useEffect(() => {
        fetchData();
    }, [travelData])
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/travel-details');
            console.log(response); // Handle the response data here
            if (response.status === 200) {
                setIsDataLoaded(true)
            }
            console.log(response.data)
            setTravelData(response.data.data)
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <NavBar />
            {
                isDataLoaded ? <>
                    <table border={1}>
                        <tr>
                            <td>Unique Id: </td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Destination</td>
                            <td>Travelers Count</td>
                            <td>Budget Per Person</td>
                        </tr>
                        {travelData.map((data, index) =>
                            <tr>
                                <td>{data["_id"]}</td>
                                <td>{data["name"]}</td>
                                <td>{data["email"]}</td>
                                <td>{data["destination"]}</td>
                                <td>{data["travelers_count"]}</td>
                                <td>{data["budget_per_person"]}</td>
                            </tr>)}
                    </table>
                </> : <div className="loading-container">Please wait while we load the data ......</div>
            }
        </div>
    )
}
export default TravelDetails;