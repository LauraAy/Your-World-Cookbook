import React, { useRef, useState, useEffect } from "react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../map.css'
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import RegionRecipeDataService from "../services/regionRecipe.service";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Autocomplete, Button, TextField, Pagination, Box, List, ListItem, ListItemButton,
    ListItemText, Menu, MenuItem, Typography, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { spacing } from '@mui/system';





const MapComponent = () => {
    const navigate = useNavigate()


    const mapRef = useRef(null);

    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconSize: [25,41], 
        iconAnchor: [12,41]
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
    
      //List select function
  const handleItemClick = (recipe) => {
    const recipeId = recipe.id
    
    navigate("/recipes/" + recipeId)
  };

    return ( 
    <>
        <MapContainer center={[51.505, -0.09]} zoom={2} ref={mapRef} style={{height: "80vh", width: "100vw"}}>
        <TileLayer
            
            url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=e58f4mdkjIaV7bqc6mPg"
        />
          {/* Additional map layers or components can be added here */}
            
            {justRegionRecipes &&
                justRegionRecipes.map(regionRecipe => {
                    return (
                        <Marker position={[regionRecipe.lat, regionRecipe.lng]}>
                            <Popup>
                            {regionRecipe.recipe && 
                                Array.from(
                                    regionRecipe.recipe.sort((a, b) => {
                                        if (a.title.toLowerCase ()< b.title.toLowerCase()) {
                                            return -1;
                                        }
                                        if (a.title.toLowerCase() > b.title.toLowerCase()) {
                                            return 1;
                                        }
                                            return 0; 
                                    })
                                ).map((recipe, index) => (  
                               
                                   <Button sx={{ maxHeight: '40px' }} variant="text" onClick={() => handleItemClick(recipe)}>
                                        <p>{recipe.title}</p> 
                                    </Button>
                
                        
                                ))
                            }
                            </Popup>
                        </Marker>
                      
                    )
                })}
        </MapContainer>
    </>
    );
};

export default MapComponent