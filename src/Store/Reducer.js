const initialState = {
    questions: [],
    score: 0
}

// this function modifies the fetched results to only leave the relevant data within the state, creating a new object instead of the one that is fetched
const modifyPayload = (payload) => {
    let newArr = [];
    payload.forEach(question => {
        let newObj ={
            question: question.question,
            type: question.type,
            answers: question['incorrect_answers'],
            correct: question['correct_answer']
        }
        newObj.answers.push(question['correct_answer'])
        newObj.answers.sort()
        newArr.push(newObj)
    })
    return newArr
} 

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'add_questions':
            return {...state, questions: modifyPayload(action.payload)}
        case 'score':
            return {...state, score: state.score + 1}
        default:
            return state
    }
}

export default reducer