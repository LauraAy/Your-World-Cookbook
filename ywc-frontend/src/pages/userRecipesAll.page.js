import React, { useState } from "react";
import UserRecipesAll from "../components/userRecipesAll.component.js";
import UserRegionRecipesAll from "../components/userRegionRecipesAll.component.js";
import UserCreatorRecipesAll from "../components/userCreatorRecipesAll.component.js";

const UserRecipesPage = () => {
	const [userRecipesView, setUserRecipesView] = useState(true)
	const [userRegionView, setUserRegionView] = useState(false)
  const [userCreatorView, setUserCreatorView] = useState(false)

	const goUserRecipeView = () => {
		console.log("hi recipe")
		if ( userRecipesView === false ) {
			setUserRecipesView(true)
		}
		if ( userRegionView === true ) {
			setUserRegionView(false)
		}
		if ( userCreatorView === true) {
			setUserCreatorView(false)
		}
	}

	const goUserRegionView = () => {
		console.log("hi region")
		if ( userRecipesView === true ) {
			setUserRecipesView(false)
		}
		if ( userRegionView === false ) {
			setUserRegionView(true)
		}
		if ( userCreatorView === true) {
			setUserCreatorView(false)
		}
	}

	const goUserCreatorView = () => {
		console.log("hi creator")
		if ( userRecipesView === true ) {
			setUserRecipesView(false)
		}
		if ( userRegionView === true ) {
			setUserRegionView(false)
		}
		if ( userCreatorView === false) {
			setUserCreatorView(true)
		}
	}
  return (
	<>
    <div>
			{ userRecipesView && (
				<div>
					<UserRecipesAll clickRegion={goUserRegionView} clickCreator={goUserCreatorView}/>
				</div>	
			)}
    </div>
		<div>
			{ userRegionView && (
				<div>	
					<UserRegionRecipesAll clickTitle={goUserRecipeView} clickCreator={goUserCreatorView}/>
				</div>
			)}
		</div>
		<div>
			{ userCreatorView && (
				<div>	
					<UserCreatorRecipesAll clickTitle={goUserRecipeView} clickRegion={goUserRegionView}/>
				</div>
			)}
		</div>
	</>
	)
}
    
export default UserRecipesPage