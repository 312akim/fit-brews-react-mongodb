import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { DRINKS } from '../shared/drinks'
import TopNav from './TopNavComponent';
import HomePage from './HomeComponent'
import CategoryList from './CategoryListComponent'
import CategoryItems from './CategoryItemsComponent'
import ItemComponent from './ItemComponent'
import Footer from './Footer'
import StoreItemComponent from './StoreItemComponent';

class Main extends Component {
	constructor(props) {
		super(props)
		this.state = {
			drinks: DRINKS,
		}
	}

	render() {
		const categories = this.state.drinks.map((drink) => drink.category[0])
		const uniqueCategories = [...new Set(categories)]

		const Home = () => {
			return (
				<HomePage
					drinks={this.state.drinks}
					uniqueCategories={uniqueCategories}
				/>
			)
		}

		const CategoryWithItems = ({ match }) => {
			console.log(match)
			const filteredDrinks = this.state.drinks.filter(
				(drink) => drink.category[0] === match.params.drink_category
			)[0].category[0]

			return (
				<CategoryItems
					category={filteredDrinks}
					drinks={this.state.drinks}
				/>
			)
		}

		const DrinkItem = ({ match }) => {
			const filteredDrink = this.state.drinks.filter(
				(drink) => drink.name === match.params.drink_name
			)[0]

			return (
					<ItemComponent
						name={filteredDrink.name}
						description={filteredDrink.description}
						ingredients={filteredDrink.ingredients}
						instructions={filteredDrink.instructions}
						rating={filteredDrink.rating}
						id={filteredDrink.id}
						image={filteredDrink.image}
					/>
			)
		}

		const StorePage = () => {
			return (
				<StoreItemComponent/>
			)
		}

		return (
			<div className="wrapper">
				<TopNav drinks={this.state.drinks}/>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route
						exact
						path="/categories"
						render={() => (
							<CategoryList
								drinks={this.state.drinks}
								uniqueCategories={uniqueCategories}
							/>
						)}
					/>
					<Route
						exact
						path="/category/:drink_category"
						component={CategoryWithItems}
					/>
					<Route
						exact
						path="/store"
						component={StorePage}
					/>
					<Route path="/drink/:drink_name" component={DrinkItem} />
					<Redirect to="/home" />
				</Switch>
				<Footer />
			</div>
		)
	}
}

export default Main
