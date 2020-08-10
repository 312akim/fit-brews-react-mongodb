import React from 'react'
import RenderItemCard from './ItemCard'
import { Col, Row, Container } from 'reactstrap'

function RenderItems({ drinks, category }) {
	console.log(drinks);
	const drinkArray = drinks.map((drink) => {
		if (drink.category[0] === category) {
			return (
				<Col key={drink.id}>
					<RenderItemCard
						name={drink.name}
						image={drink.image}
						description={drink.description}
						category={drink.category}
					/>
				</Col>
			)
		} return null
	})

	return <Row xs="1" sm="2" lg="4">{drinkArray}</Row>
}

const CategoryItems = ({ drinks, category }) => {
	return (
		<Container className="container item-card-container category">
			<Row>
				<Col>
					<h3 className="item-container-title">
						Best {category} Drinks
					</h3>
				</Col>
			</Row>
			<RenderItems drinks={drinks} category={category} />
		</Container>
	)
}

export default CategoryItems
