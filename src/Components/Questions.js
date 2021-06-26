import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../Components/styling/style.scss'
import '../Components/styling/buttons.scss'

class Questions extends Component {
    state={

    }

    nextPage = (index) => {
        let result
        if (index < this.props.questions.length-1) {
            result = `/question/${index+1}`
        } else {
            result = `/result`
        }
        return result
    }

    resultControl = (answer, index) => {
        if (answer === this.props.questions[index].correct){
            this.props.dispatch({type: 'score'})
            console.log('it works')
        }
    }

    render() {
        let index = parseInt(this.props.match.params.index)
        return(
        <section className='homepage'>
        <h1 className='header'>Question number {`${index+1}`}</h1>
        <h2 dangerouslySetInnerHTML={ { __html: this.props.questions[index].question } }></h2>
        {
            this.props.questions[index].answers.map((answer) => 
            <Link className='nav' style={{"width": "500px"}} key={answer} to={this.nextPage(index)} 
            onClick={() => this.resultControl(answer, index)}>{answer}</Link>)
        }
        <Link className='nav' style={{"margin-top":"100px"}} to='/'>Homepage</Link>
        </section>
        
        )
    }
}

const mapStateToProps = state => {
    console.log(state.questions)
    return {
        questions: state.questions
    }
}

export default connect(mapStateToProps)(Questions)