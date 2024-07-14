import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";
import "./App.css";
export default function WeatherApp(){
    const [weatherInfo,setWeatherInfo]=useState({
        city:"Pune",
        feels_like:24.78,
        temp:25.05,
        tempMin:25.26,
        tempMax:76.89,
        humidity:67,
        weather:"haze"
    })

    let updateInfo=(newInfo)=>{
        setWeatherInfo(newInfo);
    }
    return(
        <div className="body">
            <div class="main" >
            <h2> Weather App by JC </h2>
            <SearchBox updateInfo={updateInfo}></SearchBox>
            <InfoBox info={weatherInfo}/>
            </div>
        </div> 
    )



}