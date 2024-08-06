import React, { useState } from 'react'
import { addRoom } from '../utils/ApiFunction';
import RoomTypeSelector from '../common/RoomTypeSelector';
import toastr from 'toastr';
import '/node_modules/toastr/build/toastr.min.css';
const AddRoom = () => {
    const[newRoom, setNewRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    })

    const[imagePreview, setImagePreview] = useState("");
    const[successMessage, setSuccessMessage] = useState("");
    const[errorMessage, setErrorMessage] = useState("");
    
    const handleRoomIputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value
        if(name === "roomPrice"){
            if(!isNaN(value)){
                parseInt(value,10);
            }else{
                value = ""
            }
        }
        setNewRoom({...newRoom,[name]: value});
    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setNewRoom({...newRoom,photo: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        // try {
        //     const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);
        //     if(success!== undefined){
        //         setSuccessMessage("A new room was added to the database");
        //         setNewRoom({photo: null, roomType: "", roomPrice: ""});
        //         setImagePreview("");
        //         setErrorMessage("");
        //     }else{
        //         setErrorMessage("Error adding room");
        //     }
        // } catch (error) {
        //     setErrorMessage(error.message)
        // }
        try {
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);
            if (success !== undefined) {
                toastr.success("A new room was added to the database");
                setNewRoom({ photo: null, roomType: "", roomPrice: "" });
                setImagePreview("");
            } else {
                toastr.error("Error adding room");
            }
        } catch (error) {
            toastr.error(error.message);
        }
        // setTimeout(()=>{
        //     setSuccessMessage("")
        //     setErrorMessage("")
        // },3000)
    }
    return(
        <>
            <section className='container mt-5 mb-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-8 col-lg-6'>
                        <h2 className='mt-5 mb-2'>Add a new Room</h2>
                        {/* {successMessage && (
                            <div className='alert alert-success fade show'>{successMessage}</div>
                        )}
                         {errorMessage && (
                            <div className='alert alert-danger fade show'>{errorMessage}</div>
                        )} */}
                        <form onSubmit={handleSubmit} action="">
                            <div className='mb-3'>
                                <label className='form-label' htmlFor="roomType">Room Type</label>
                                <div>
                                    <RoomTypeSelector handleRoomIputChange={handleRoomIputChange} newRoom={newRoom}/>
                                </div>
                            </div>

                            <div className='mb-3'>
                                <label className='form-label' htmlFor="roomType">Room Price</label>
                                <input type='number' className='form-control' required id='roomPrice' name='roomPrice' value={newRoom.roomPrice} onChange={handleRoomIputChange}/>
                                    
                            </div>

                            <div className='mb-3'>
                                <label className='form-label' htmlFor="roomType">Room Photo</label>
                                <input className='form-control' onChange={handleImageChange} type="file" id='photo' name='photo' />
                                {imagePreview && (
                                    <img className='mb-3' src={imagePreview} alt="Preview Room Photo" style={{maxWidth: "400", maxHeight: "400"}} />
                                )}

                            </div>

                            <div className='d-grid d-md-flex mt-2'>
                                <button className='btn btn-outline-primary ml-5'>Save Room</button>
                            </div>
                        </form>
                    
                    </div>
                </div>
            </section>
        </>
       
    )
}
export default AddRoom