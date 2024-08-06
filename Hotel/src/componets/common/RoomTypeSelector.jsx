import React, { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunction';

const RoomTypeSelector  = ({handleRoomIputChange, newRoom}) => {
    const[RoomTypes, setRoomTypes] = useState([""])
    const[showNewRoomTypeInput, setShowNewRoomTypesInput] = useState(false);
    const[newRoomType, setNewRoomType] = useState("")

    useEffect(()=>{
        getRoomTypes().then((data)=>{
            setRoomTypes(data)
        })
    }, [])
    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value);
    }
    const handleAddNewRoomType = () =>{
        if(newRoomType !== "" ){
            setRoomTypes([...RoomTypes, newRoomType]);
            setNewRoomType("");
            setShowNewRoomTypesInput(false)
        }
    }
    return (
        <>
            {RoomTypes.length >= 0 && (
                <div>
                    <select name="roomType"  className='form-select'
                        id="roomType" value={newRoom.roomType}
                        onChange={(e) => {
                                if(e.target.value === "Add New"){
                                    setShowNewRoomTypesInput(true)
                                }else{
                                    handleRoomIputChange(e)
                                }
                            }}>
                        
                        <option value={""}>select a room type</option>
                        <option value={"Add New"}>Add new</option>
                        {RoomTypes.map((type, index)=>(
                            <option value={type} key={index}>{type}</option>
                        ))}
                    </select>
                    {showNewRoomTypeInput && (
                        <div className='input-group'>
                            <input type="text" className='form-control' placeholder='Enter a new room type' onChange={handleNewRoomTypeInputChange} />
                            <button className='btn btn-hotel' type='button' onClick={handleAddNewRoomType}>Add</button>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}
export default RoomTypeSelector