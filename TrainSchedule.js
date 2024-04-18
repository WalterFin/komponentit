import React, { useState, useEffect } from 'react';
import TrainCSS from './trainSchedule.module.css';
import { FaTrainSubway } from 'react-icons/fa6';
import { BiCurrentLocation } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import searchTrains from './scheduleData'; // js for searching trains with api
import home from './home';

const updateSearch = async (from, to) => {
  console.log(to);
  let data = [];
  if (from !== to) {
    data = await searchTrains(from, to);
  }
  console.log(typeof data);
  console.log(data);
  //setScheduleData(data);

};

export { updateSearch };


const TrainSchedule = () => {
    const [departureCity, setDepartureCity] = useState('Tampere');
    const [destinationCity, setDestinationCity] = useState('Hämeenlinna');
    const [scheduleData, setScheduleData] = useState([]);
    const [Search1, setSearch1] = useState("TPE");
    const [Search2, setSearch2] = useState("HL");
    
    useEffect(() => {
      const fetchData = async () => {
          const data = await searchTrains(Search1, Search2); // call searchTrains-function
          setScheduleData(data);
      };

      fetchData();
  }, [Search1,Search2]);
  
    return (
      <section className={TrainCSS.trainScheduleSection}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className={TrainCSS.TrainScheduleTitle}>
                <FaTrainSubway className={TrainCSS.TrainScheduleTitleIcon}/>
                <h2>Train Schedule</h2>
              </div>
              <div className={TrainCSS.DepartureDestinationContainer}>
                <div className={TrainCSS.TrainDestinationDeparture}>
                  <p>Departure</p>
                  <div className={TrainCSS.CityandIcon}>
                    <BiCurrentLocation className={TrainCSS.LocationIcon}/>
                    <h3>{departureCity}</h3>
                  </div>
                </div>
                <div className={TrainCSS.TrainDestinationDeparture}>
                  <p >Destination </p>
                  <div className={TrainCSS.CityandIcon}>
                    <FaLocationDot className={TrainCSS.LocationIconDestination}/>
                    <h3>{destinationCity}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className={`col-md-8 ${TrainCSS.trainSchedule}`}>
              <div className={`row ${TrainCSS.scheduleRow}`}>
                <div className="col">
                  <h3>Departure Time</h3>
                </div>
                <div className="col">
                  <h3>Arrival time</h3>
                </div>
                <div className="col">
                  <h3>Train Number</h3>
                </div>
                <div className="col">
                  <h3>Track</h3>
                </div>
              </div>
              {/* Render train schedule data */}
              {scheduleData.map((item, index) => (
                <div className={`row ${TrainCSS.scheduleRow}`} key={index}>
                  <div className="col">
                    <p>{item.Departurehour}</p>
                  </div>
                  <div className="col">
                    <p>{item.Arrivalhour}</p>
                  </div>
                  <div className="col">
                    <p>{item.train}</p>
                  </div>
                  <div className="col">
                    <p>{item.track}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
};

export default TrainSchedule;
