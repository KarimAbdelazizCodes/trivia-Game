import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './styling/buttons.scss'
import './styling/style.scss'


class Result extends Component{
    state = {

    }

    render() {
        return(
            <div className='homepage'>
                <h1 className='header'>Your score is:</h1>
                <h2>{this.props.result}</h2>
                {this.props.result > this.props.questions.length / 2 ? <h3>Well done!</h3> : <h3>Seriously?</h3>}
                <Link className='nav' to='/'>Play again?</Link>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.score)
    return {
        result: state.score,
        questions: state.questions
    }
}
export default connect(mapStateToProps)(Result)