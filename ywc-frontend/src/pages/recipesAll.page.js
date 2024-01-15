import React, { useState} from "react";
import RecipesAll from "../components/recipesAll.component.js";
import RegionRecipesAll from "../components/regionRecipesAll.component.js"
import CreatorRecipesAll from "../components/creatorRecipesAll.component.js"
import ContributorRecipesAll from "../components/contributerRecipesAll.component"

const RecipesAllPage = () => { 
	const [allView, setAllView] = useState(true)
	const [regionView, setRegionView] = useState(false)
	const [creatorView, setCreatorView] = useState(false)
	const [contributorView, setContributorView] = useState(false)

	const goRecipeView = () => {
		console.log("hi recipe")
		if ( allView === false ) {
			setAllView(true)
		}
		if ( regionView === true ) {
			setRegionView(false)
		}
		if ( creatorView === true) {
			setCreatorView(false)
		}
		if ( contributorView === true) {
			setContributorView(false)
		}
	}
	
	const goRegionView = () => {
		console.log("hi region")
		if ( allView === true ) {
			setAllView(false)
		}
		if ( regionView === false ) {
			setRegionView(true)
		}
		if ( creatorView === true) {
			setCreatorView(false)
		}
		if ( contributorView === true) {
			setContributorView(false)
		}
	}

	const goCreatorView = () => {
		console.log("hi creator")
		if ( allView === true ) {
			setAllView(false)
		}
		if ( regionView === true ) {
			setRegionView(false)
		}
		if ( creatorView === false) {
			setCreatorView(true)
		}
		if ( contributorView === true) {
			setContributorView(false)
		}
	}
	const goContributorView = () => {
		console.log("hi creator")
		if ( allView === true ) {
			setAllView(false)
		}
		if ( regionView === true ) {
			setRegionView(false)
		}
		if ( creatorView === true) {
			setCreatorView(false)
		}
		if ( contributorView === false) {
			setContributorView(true)
		}
	}

	return (
	<>
    <div>
			{ allView && (
			<>
				<div>
					<RecipesAll  clickRegion={goRegionView} clickCreator={goCreatorView} clickContributor={goContributorView}/>
				</div>
			</>
			)}
    </div>
		<div>
			{ regionView && (
				<div>
					<RegionRecipesAll clickTitle={goRecipeView} clickCreator={goCreatorView} clickContributor={goContributorView}/>
				</div>
			)}
		</div>
		<div>
			{ creatorView && (
				<div>
					<CreatorRecipesAll clickTitle={goRecipeView} clickRegion={goRegionView} clickContributor={goContributorView}/>
				</div>
			)}
		</div>
		<div>
			{ contributorView && (
				<div>
					<ContributorRecipesAll clickTitle={goRecipeView} clickRegion={goRegionView} clickCreator={goCreatorView}/>
				</div>
			)}
		</div>
	</>
	)
}
    
export default RecipesAllPage