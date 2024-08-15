import React, { useRef, useState, useEffect } from "react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import RegionRecipeDataService from "../services/regionRecipe.service";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';




const MapComponent = () => {
    const mapRef = useRef(null);

    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    
    L.Marker.prototype.options.icon = DefaultIcon;
    

    const [regionRecipes, setRegionRecipes] = useState ([]);
    const [justRegionRecipes, setJustRegionRecipes] = useState([])
    
    //retrieve recipes by region
    useEffect(() => {
        retrieveRegionRecipes();
    }, []);
 

    const retrieveRegionRecipes = () => {
        RegionRecipeDataService.getAllRegionRecipes()
            .then(response => {
                setRegionRecipes(response.data);
                console.log(response.data);

                const justRecipes = [];
                let region = response.data
                
                for (let i = 0; i < region.length; i++) {
                    if (region[i].recipe.length > 0) {
                        justRecipes.push(region[i])
                    }
                }
                setJustRegionRecipes(justRecipes)
                console.log(justRegionRecipes)
            })
            .catch(e => {
            console.log(e);
        });
    };
    
    return ( 
    <>
    {/* <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
         */}
        // Make sure you set the height and width of the map container otherwise the map won't show
        <MapContainer center={[51.505, -0.09]} zoom={13} ref={mapRef} style={{height: "100vh", width: "100vw"}}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          {/* Additional map layers or components can be added here */}
            
                        <Marker position={[51.5, -0.09]}>
                            <Popup>Hello world</Popup>
                        </Marker>
            {/* {justRegionRecipes &&
                justRegionRecipes.map(regionRecipe => {
                    return (
                      
                    )
                })} */}
        </MapContainer>
    </>
    );
};

export default MapComponent
