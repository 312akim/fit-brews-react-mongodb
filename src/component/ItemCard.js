import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Button,
} from 'reactstrap'

function RenderItemCard({ name, image, description, category }) {
	const [favorite, setFavorite] = useState(false);

	const favoriteHandler = () => {
		setFavorite(!favorite)
		console.log(favorite);
	}

	//Toggles Favorite Icon
	let faveIcon = <div></div>
	if (favorite) {
		faveIcon = <i className="fa fa-star" onClick={favoriteHandler}></i>
	} else {
		faveIcon = <i className="fa fa-star-o" onClick={favoriteHandler}></i>
	}

	return (
		<Card className="item-card text-center">
			<div
				type="submit"
				color="light"
				className="favorite-icon"
			>
			{faveIcon}
			</div>
			<Link to={`/drink/${name}`}>
				<CardImg
					className="item-card-image"
					src={image}
					alt="Item picture"
				/>
			</Link>
			<CardBody className="item-card-body">
				<Link to={`/drink/${name}`}>
					<CardTitle className="item-card-name">
						<h5>{name}</h5>
					</CardTitle>
				</Link>
				<CardText className="item-card-description">
					{description}
				</CardText>
				
				<CardText className="item-card-category">
					<Link to={`/category/${category}`} className="category-link">
						{category}
					</Link>
				</CardText>
			</CardBody>
			<Link to={`/drink/${name}`}>
				<Button className="item-card-button w-100">See Recipe</Button>
			</Link>
		</Card>
	)
}

export default RenderItemCard
