import React, { useEffect, useState } from 'react'

function PreviewComprehension({ id, question, answers, setAnswers }) {
    const [mcqAnswers, setMcqAnswers] = useState([])

    const updateAnswer = e => {
        const mcqIndex = e.target.id.split(" ")[0]
        const mcqAnswer = e.target.value;
        const tempAnswers = answers
        tempAnswers[id].mcqs[mcqIndex] = mcqAnswer;
        setAnswers([...tempAnswers])
    }

    return (
        <div className="border p-4 my-2">
            <h1 className="text-orange-400 text-center text-2xl font-bold mb-2">Question {id + 1}</h1>
            <p className="border p-2 my-2 w-full">{question.paragraph}</p>
            {question.mcqs.map((mcq, index) => <div key={index} className="border p-2 my-2">
                <p>{mcq.q}</p>
                {
                    mcq.options.map((option, i) => {
                        return (
                            <div key={i}>
                                <input onChange={updateAnswer} type="radio" id={index + " " + i} name={index} value={option}/>
                                <label htmlFor={index + " " + i} className="mx-2">{option}</label>
                            </div>
                        )
                    })
                }
            </div>)}
        </div>
    )
}

export default PreviewComprehension