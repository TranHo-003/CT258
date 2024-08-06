import React, { useEffect, useState } from 'react'
import { getRoomById, updateRoom } from '../utils/ApiFunction'
import { useParams } from 'react-router-dom'
import {FaTrashAlt, FaEye, FaEdit} from "react-icons/fa"
import { Link } from 'react-router-dom';
export const EditRoom = () => {

  const [room, setRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: ""
  })

  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [imagePreview, setImagePreview] = useState("")

const {roomId} = useParams()

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]
    setRoom({...room, photo: selectedImage})
    setImagePreview(URL.createObjectURL(selectedImage))
  }
  const handleInputChange = (event) => {
    const {name, value} = event.target
    setRoom({...romm, [name]: value})
  }

  useEffect(() => {
    const fetchRoom = async () =>{
      try {
        const roomData = await getRoomById(roomId)
        setRoom(roomData)
        setImagePreview(roomData.photo)
      } catch (error) {
        console.error(error)        
      }
    }
    fetchRoom()
  }, [roomId])

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const response = await updateRoom(roomId, room);
        if(response.status == 200){
            setSuccessMessage("Room updated successfully!");
            const updatedRoomData = await getRoomById(roomId)
            setRoom(updatedRoomData)
            setImagePreview(updatedRoomData.photo);
            setErrorMessage("");
        }else{
            setErrorMessage("Error updating room");
        }
    } catch (error) {
        console.error(error)
        setErrorMessage(error.message)
    }

  }

  return(
    <>
        <div className='container mt-5 mb-5'>
          <h3 className='text-center mb-5 mt-5'>Edit Room</h3>
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
                            <input className='form-control' onChange={handleInputChange} type="text" id='roomType' name='roomType' value={room.roomType} />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor="roomType">Room Price</label>
                            <input type='number' className='form-control' required id='roomPrice' name='roomPrice' value={room.roomPrice} onChange={handleInputChange}/>
                                
                        </div>

                        <div className='mb-3'>
                            <label className='form-label' htmlFor="roomType">Room Photo</label>
                            <input className='form-control' onChange={handleImageChange} type="file" id='photo' name='photo' />
                            {imagePreview && (
                                <img src={`data:image/jpeg;base64,${imagePreview}`} className='mb-3' alt="Preview Room Photo" style={{maxWidth: "400", maxHeight: "400"}} />
                            )}

                        </div>

                        <div className='d-grid gap-2 d-md-flex mt-2'>
                          <Link to={"/existing-rooms"} className='btn btn-outline-info ml-5'>back</Link>
                            <button type='submit' className='btn btn-outline-wwarning'>Edit Room</button>
                        </div>
                    </form>
                
                </div>
            </div>
        </div>
    </>
   
)
}
export default EditRoom