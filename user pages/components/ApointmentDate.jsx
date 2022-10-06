import React, { useEffect, useState } from 'react'
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch } from 'react-redux'
import { dataHolderAppointment } from '../redux/actions/orderInfo'
export const ApointmentDate = ({error}) => {
    const dispatch=useDispatch()
    const[selectedData, setSelected] =useState("")
    const[time,setTime]=useState({status:"",time:""})
 
  
   
        
      
        useEffect(()=>{
          const Appointment={
          date:selectedData.length<1?"":selectedData.toDateString(),
          time:time.time,
          status:time.status
        }
        console.log(Appointment)

          dispatch(dataHolderAppointment(Appointment)) 
          console.log("change variable")  
        },[time,selectedData])
       
    
 
    return (
        <div className="apointment-container">
            <h3>APPOINTMENT DATE AND TIME</h3>
            <div className="apointment-wrapper">
                 <div className="date-wrapper">
                    <h4>DATE</h4>
                  <Datepicker
                   selected={selectedData} onChange={date=>{setSelected(()=>date)
                console.log(date,"in data")}}
                   minDate={new Date()}
                   filterDate={date=>date.getDay()!==6 && date.getDay()!==0}
                  />
                   {error.date&&<span style={{color:"red",fontSize:"12px"}} >Please select Date</span>}
                </div>
                <div className="time-date-display">
                    <h4>APPOINTMENT DISPLAY</h4>
                    <p style={{fontWeight:"600",color:"rgb(201, 149, 53)"}}>
                      {selectedData.length<1?selectedData:
                      selectedData.toDateString()
                      }
                      
                    </p>
                    <p>
                         <span style={{color:"rgb(201, 149, 53)",fontWeight:"600"}}>{time.status} </span>
                          <span style={{fontWeight:"600",color:"rgb(201, 149, 53)"}}>{time.time} {time.status==="Morning"?"AM":time.status==="Afternoon"?"PM":""}</span>
                    </p>
                     
                    
                </div>

            <div className="time-container">
                    <h4>TIME</h4>
                    <div className="time-wrapper">
                    <div className="time-wrapper-morning time--btns">
                        <span className="heading">Morning</span>
                        <p onClick={()=>setTime({status:"Morning",time:"2:00:00-3:00:00"})}>
                            2:00:00-3:00:00</p>
                         <p onClick={
                             ()=>setTime({
                                 status:"Morning",
                                 time:"3:00:00-4:00:00"
                                        })
                        }
                         >3:00:00-4:00:00</p>
                        <p onClick={
                             ()=>setTime({
                                 status:"Morning",
                                 time:"5:00:00-6:00:00"
                                        })
                        }
                        >5:00:00-6:00:00</p>
                   </div>
                   <div className="time-wrapper-afternoon time--btns">
                      <span className="heading">Afternoon</span>
                        <p onClick={
                             ()=>setTime({
                                 status:"Afternoon",
                                 time:"8:00:00-9:00:00"
                                        })
                        }
                        >8:00:00-9:00:00</p>
                        <p onClick={
                             ()=>setTime({
                                 status:"Afternoon",
                                 time:"10:00:00-11:00:00"
                                        })
                        }
                        >10:00:00-11:00:00</p>
                        <p onClick={
                             ()=>setTime({
                                 status:"Afternoon",
                                 time:"11:00:00-12:00:00"
                                        })
                        }
                        >11:00:00-12:00:00</p>
                       
                   </div>
                   
                    </div>
                   {error.time&&<p style={{color:"red",fontSize:"12px",textAlign:"center"}}>Please select time</p>}
              </div>
            </div>
          
              
        </div>
    )
}
