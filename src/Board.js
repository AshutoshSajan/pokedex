import React from "react";
import Loading from "./Loading";

export default class Board extends React.Component {
	state = {
		dummy: [],
		data : [],
		loading: false
	}

	componentDidMount(){
		fetch("https://pokeapi.co/api/v2/pokemon/?limit=784").then(res => res.json()).then(({results}) => this.setState({data: results, dummy: results, loading: true}))
	}

	handleSearch = (e) => {
		var val = e.target.value;
		var filtered = [...this.state.data].filter(v => v.name.startsWith(e.target.value))
		this.setState({data: filtered});
	}

	render = () => {
		return (
			<div className="board">
				<input className="mainInput" onChange={this.handleSearch}/>
				{
					this.state.loading ? 
					<div className="cards">
						{
							this.state.data.map((pokemon, i) =>
								<figure className="img-box" data-key={pokemon.name}> 
								 	<img data-key={pokemon.name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`}/>
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