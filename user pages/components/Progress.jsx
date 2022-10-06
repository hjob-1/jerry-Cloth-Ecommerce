import React from 'react'

export const Progress = ({progress}) => {
    return (
        <div style={{height:"40vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <progress value={progress} max='100' />{Math.round(progress)==100?<p>{Math.round(progress)}% finshed Uploading</p>:<p>{Math.round(progress)}% uploading...</p>} 
        </div>
    )
}
