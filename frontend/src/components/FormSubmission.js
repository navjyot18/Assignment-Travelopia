import React, { useState } from 'react';
import NavBar from './Navbar';
import axios from 'axios';

const TravelForm = () => {

    const [userDetails, setUserDetails] = useState({
        name: { value: "", isValid: false },
        email: { value: "", isValid: false },
        destination: { value: "", isValid: true },
        number_of_travelers: { value: "", isValid: false },
        budget: { value: "", isValid: false }
    })
    const initialState = {
        name: "",
        email: "",
        destination: "",
        number_of_travelers: 1,
        budget: 0
    }
    const [areAllFieldsEntered, setAllFieldsEntered] = useState(false)
    const [dataSubmited, setDataSubmited] = useState("")
    const handleSubmit = async (userDetails) => {
        setDataSubmited("Please wait while we save the details....");
        const userDetailsKeys = Object.keys(userDetails);
        for (const userDetailsKey of userDetailsKeys) {
            console.log(userDetailsKeys)
            if (userDetails[userDetailsKey].isValid === false) {
                alert("something messy")
                setAllFieldsEntered(false);
                return;
            }
        }
        setAllFieldsEntered(true)
        try {
            const response = await axios.post('http://localhost:3001/save-travel-data', { data: userDetails });
            console.log(response); // Handle the response data here
            setUserDetails(initialState)
            if (response.status === 200) {
                setDataSubmited("Your details have been successfully saved")
            }

        } catch (error) {
            console.error(error);
        }
    }
    const inputChangeHandler = (e, currentInput) => {
        const inputValue = e.target.value
        const prevTravelDetails = { ...userDetails };
        prevTravelDetails[currentInput].value = inputValue;
        prevTravelDetails[currentInput].isValid = true;
        console.log("details", prevTravelDetails)
        setUserDetails(prevTravelDetails);
    }

    return (
        <>
            <NavBar />
            <div className='form-container'>
                <div className='input-container'>
                    <label>
                        Name:
                        <input type="text" value={userDetails["name"].value} onChange={(e) => inputChangeHandler(e, "name")} />
                    </label>
                </div>
                <div className='input-container'>
                    <label>
                        Email address:
                        <input type="email" value={userDetails["email"].value} onChange={(e) => inputChangeHandler(e, "email")} />
                    </label>
                </div>
                <div className='input-container'>
                    <label>
                        Where do you want to go?
                        <select value={userDetails["destination"].value} onChange={(e) => inputChangeHandler(e, "destination")}>
                            <option value="India">India</option>
                            <option value="Africa">Africa</option>
                            <option value="Europe">Europe</option>
                        </select>
                    </label>
                </div>
                <div className='input-container'>
                    <label>
                        Number of travelers:
                        <input type="number" value={userDetails["number_of_travelers"].value} onChange={(e) => inputChangeHandler(e, "number_of_travelers")} />
                    </label>
                </div>
                <div className='input-container'>
                    <label>
                        Budget Per Person ($):
                        <input type="number" value={userDetails["budget"].value} onChange={(e) => inputChangeHandler(e, "budget")} />
                    </label>
                </div>
                <div className='button-container'>
                    <div className='button' onClick={() => handleSubmit(userDetails)}>Submit</div>
                </div>
            </div>
            <div className='success-container'>{dataSubmited}</div>
            {
                !areAllFieldsEntered ? <div className='success-container' style={{ color: 'red' }}>
                    Please Enter all the fields
                </div> : <></>
            }
        </>

    );
};

export default TravelForm;
