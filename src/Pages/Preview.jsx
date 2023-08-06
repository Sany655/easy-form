import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import PreviewCategorized from '../Components/PreviewCategorized';
import PreviewCloze from '../Components/PreviewCloze';
import PreviewComprehension from '../Components/PreviewComprehension';
import Swal from 'sweetalert2'
function Preview() {
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [submit, setSubmit] = useState(false)
    const { id } = useParams();
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get("get-question?id=" + id)
            .then(res => {
                if (res.data.questions.length) {
                    let data = [];
                    res.data.questions.map((question, index) => {
                        if (question.type === "Categorized") {
                            data[index] = { type: "Categorized", question: res.data._id, categories: [] }
                        }
                        else if (question.type === "Cloze") {
                            data[index] = { type: "Cloze", question: res.data._id, para: "" }
                        }
                        else if (question.type === "Comprehension") {
                            data[index] = { type: "Comprehension", question: res.data._id, mcqs: [] }
                        }
                    })
                    setAnswers(data);
                    setQuestions(res.data.questions)
                }
            })
            .catch(error => {
                if (error.code === "ERR_NETWORK") {
                    setQuestions(JSON.parse(localStorage.getItem('questions')))
                }
            }).finally(() => {
                setLoading(false)

            })
    }, [])

    const submitQuestions = () => {
        axios.post("/answer",JSON.stringify(answers)).then(res => {
            if (res.data.acknowledged) {
                Swal.fire(
                    'Done!',
                    "Answerd well",
                    "success"
                    )
                    setSubmit(true)
                }else{
                    Swal.fire(
                        'error',
                        "Something is wrong!",
                        "error"
                    )
                }
        }).catch(err => {
            Swal.fire(
                'error',
                err.message,
                "error"
            )
        })
        console.log(answers);
        setAnswers([])
    }

    return (
        <div>
            {
                !submit ? loading ? <img src="../spinner.gif" className='m-auto' alt="" /> : <section className='p-2 md:p-0 container mx-auto'>
                    {
                        questions?.map((question, index) => {
                            if (question.type === "Categorized") {
                                return <PreviewCategorized question={question} key={index} id={index} answers={answers} setAnswers={setAnswers} />
                            } else if (question.type === "Cloze") {
                                return <PreviewCloze question={question} key={index} id={index} answers={answers} setAnswers={setAnswers} />
                            } else if (question.type === "Comprehension") {
                                return <PreviewComprehension question={question} key={index} id={index} answers={answers} setAnswers={setAnswers} />
                            }
                        })
                    }
                    {!submit && questions?.length ? <button onClick={submitQuestions} className="px-6 text-white bg-orange-400 border block mx-auto my-8" type='submit'>Submit</button> : ''}
                </section> : <p className="text-slate-300 text-4xl my-24 text-center">You have done great!</p>
            }

        </div>
    );
}

export default Preview;