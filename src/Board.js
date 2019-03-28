import React from "react";
import Loading from "./Loading";

export default class Board extends React.Component {
	state = {
		data : [],
		loading: false,
		input: null,
		filtered: null
	}

	componentDidMount(){
		var pokemons;
		fetch("https://pokeapi.co/api/v2/pokemon/?limit=784").then(res => res.json()).then(({results}) => {
			pokemons = results.map((v, i) => { 
				return ({name: v.name, img:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`})
			})
			this.setState({data: pokemons, loading: true})
		})
	}

	handleSearch = (e) => {
		var val = e.target.value;
		this.setState({input: val , filtered: this.state.data.filter(pokemon => pokemon.name.startsWith(val))})
	}

	render = () => {
		// console.log(this.state.data)
		return (
			<div className="board">
				<header className="header">
					<h1>search any pokymon charector</h1>
					<input className="mainInput" onChange={this.handleSearch} placeholder="Enter pokymon name"/>
				</header>
				{
					this.state.loading ? 
					<div className="cards" >
						{	
							this.state.filtered ?
								this.state.filtered.map((pokemon, i) => 
								<figure className="img-box" key={pokemon.name}> 
								 	<img className="img" key={pokemon.name} src={pokemon.img} alt={pokemon.name}/>
								 	<figcaption>{pokemon.name}</figcaption>
							 	</figure> ) :
							this.state.data.map((pokemon, i) =>
								<figure className="img-box" key={pokemon.name}> 
								 	<img className="img" key={pokemon.name} src={pokemon.img} alt={pokemon.name}/>
								 	<figcaption>{pokemon.name}</figcaption>
							 	</figure>
							)
						}
					</div>
					: <Loading />
				}
			</div>
		)
	}
}