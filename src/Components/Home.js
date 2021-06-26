import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './styling/buttons.scss'
import './styling/style.scss'

class Home extends Component {
    state = {
        // default value in case the user doesn't add anything in input
        numOfQuestions: 5,
        categories: [],
        userCategory: '',
        readyToStart: false,
    }

    // fetches all available categories first so that the user can select one
    componentDidMount = () => {
        fetch('https://opentdb.com/api_category.php')
        .then(results => results.json())
        .then(data => {
            const options = data.trivia_categories
            let newState = {...this.state}
            newState.categories = options
            this.setState({categories: newState.categories})
        })
    }

    // fetching via Thunk. This is after the user has chose a category
    awesomeDispatch = (dispatch, getState, num = this.state.numOfQuestions, choice = this.state.userCategory) => {
        console.log('Thunking');
        fetch(`https://opentdb.com/api.php?amount=${num}&category=${choice}`)
        .then(results => results.json())
        .then(data => {
          const action = {
            type: 'add_questions',
            payload: data.results
          }
          dispatch(action)
        })
      }
    
    // fetches when the user clicks submit
    fetchQuestions = () => {
        this.props.dispatch(this.awesomeDispatch)
        this.setState({readyToStart: !this.state.readyToStart})
      }
    
    // handles user input (number of questions they want)
    numberHandler = event => {
        this.setState({numOfQuestions: event.target.value})
    }

    categorySelector = index => {
        let newState = {...this.state};
        newState.userCategory = this.state.categories[index].id
        this.setState({userCategory: newState.userCategory})
    }


    render() {
        console.log(this.state.categories)
        return(
            <div className='homepage'>
                <h1 className='header'>Trivial</h1>
                <h3>Please type in how many questions you'd like to answer</h3>
                <input type='numeric' placeholder='Here' onChange={this.numberHandler}></input>
                <h3>Please choose a category, then click submit</h3>
                <h4>If you have no category preference, please specify the number of questions then click submit</h4>
                <div className='categories'>
                    {
                        this.state.categories.map((category, index) => <div className='category' key={index} onClick={() => this.categorySelector(index)}>{category.name}</div>)
                    }
                </div>
                <div className='bottom'>
                    {
                    this.state.readyToStart ? 
                    <Link className='nav' to='/question/0'>Begin</Link>
                    : 
                    <button className='button' onClick={() => this.fetchQuestions(this.state.numOfQuestions)}>Submit</button>
                    }
                </div>
            </div>
        )
    }
}

const MapStateToProps = state => {
    return {
        questions: state.questions
    }
}

export default connect(MapStateToProps)(Home)