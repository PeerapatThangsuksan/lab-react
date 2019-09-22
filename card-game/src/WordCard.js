import React, { Component } from 'react';
import CharacterCard from './CharacterCard';
import _ from 'lodash';

const prepareStateFromWord = (given_word) => {
    let word = given_word.toUpperCase()
    let chars = _.shuffle(Array.from(word))
    return{
        word,
        chars,
        attempt: 1,
        guess: [],
        completed: false,
        Maxplay : 3 ,
        statusgame: false,
    }
}

export default class WordCard extends Component{

    constructor(props){
        super(props)
        this.state = prepareStateFromWord(this.props.value)
    }
    
    activationHandler = (c) => {
        let guess = [...this.state.guess,c]
        this.setState({guess})
        if(guess.length == this.state.chars.length){
            if(this.state.attempt!=this.state.Maxplay){
            if(guess.join('').toString() == this.state.word){
                this.setState({guess: [], completed: true})
            }
            else{
                this.setState({guess: [], attempt: this.state.attempt + 1})
            }
            }else{
                this.setState({guess: [], completed: true})
                this.setState({guess: [], statusgame:true})
            }
        }
    }
    render(){
        return (
            <div>
                <h2> This Round : {this.state.attempt} </h2>
                <h2>{this.state.attempt == 2? 'Try again':''}</h2>
                <h2>{this.state.attempt == 3? 'Last times ':''}</h2>
                <h1>{this.state.statusgame? 'You lose :::: word ans is COMPUTER' : ''}</h1>     
                <h1>{this.state.completed&&!this.state.statusgame? 'You win ::: congratulations!! ' : ''}</h1>
                { Array.from(this.state.chars).map((c,i) => <CharacterCard value={c} key={i} attempt ={this.state.attempt} activationHandler={this.activationHandler}/>)}
                <h3>  Maximum Number of Round : {this.state.Maxplay} </h3>
                
                
            </div>
        );
    }
} 