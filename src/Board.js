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
		fetch("https://pokeapi.co/api/v2/pokemon/?limit=784").then(res => res.json()).then(({results}) => this.setState({data: results, loading: true}))
	}

	handleSearch = (e) => {
		var val = e.target.value;
		this.setState({input: val , filtered: this.state.data.filter(pokemon => pokemon.name.startsWith(val))})
	}

	render = () => {
		console.log(this.state.filtered, this.state.input)
		return (
			<div className="board">
				<input className="mainInput" onChange={this.handleSearch}/>
				{
					this.state.loading ? 
					<div className="cards">
						{	
							this.state.filtered ?
								this.state.filtered.map((pokemon, i) => 
								<figure className="img-box" data-key={pokemon.name}> 
								 	<img className="img" data-key={pokemon.name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`} alt={pokemon.name}/>
								 	<figcaption>{pokemon.name}</figcaption>
							 	</figure> ) :
							this.state.data.map((pokemon, i) =>
								<figure className="img-box" data-key={pokemon.name}> 
								 	<img className="img" data-key={pokemon.name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`} alt={pokemon.name}/>
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