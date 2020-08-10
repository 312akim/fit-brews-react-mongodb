import React from 'react';
import RenderItemCard from './ItemCard';
import { Col } from 'reactstrap'

//Favorites Map does not currently work.
const FavoritePage = (props) => {
    console.log(props.favorites);
    const favoritesMap = () => {
        props.favorites.map((drink) => {
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
        })
    }

    return (
        <>
            <div>This is the favorites Page!</div>
            <div>{favoritesMap}</div>
            <div>Favorites Above here!</div>
        </>
    )
}

export default FavoritePage;