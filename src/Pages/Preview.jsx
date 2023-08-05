import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import PreviewCategorized from '../Components/PreviewCategorized';
import PreviewCloze from '../Components/PreviewCloze';
import PreviewComprehension from '../Components/PreviewComprehension';
import Swal from 'sweetalert2'
function Preview() {
    const [questions, setQuestions] = useState([])
    const [submit, setSubmit] = useState(false)
    const { id } = useParams();
    useEffect(() => {
        axios.get("get-question?id="+id)
            .then(res => {
                if(res.data.questions.length) setQuestions(res.data.questions)
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    const submitQuestions = () => {
        Swal.fire(
            'Great!',
            'Form is submited!',
            'success'
        )
        setSubmit(true)
    }

    return (
        <div>
            {
                !submit?<section className='p-2 md:p-0 container mx-auto'>
                {
                    questions?.map((question, index) => {
                        if (question.type === "Categorized") {
                            return <PreviewCategorized question={question} key={index} id={index}/>
                        }else if (question.type === "Cloze") {
                            return <PreviewCloze question={question} key={index} id={index}/>
                        }else if (question.type === "Comprehension") {
                            return <PreviewComprehension question={question} key={index} id={index}/>
                        }
                    })
                }
            </section>:<p className="text-slate-300 text-4xl my-24 text-center">You have done great!</p>
            }
            
            {!submit&&questions?.length ? <button onClick={submitQuestions} className="px-6 text-white bg-orange-400 border block mx-auto my-8">Submit</button> : ''}
        </div>
    );
}

export default Preview;