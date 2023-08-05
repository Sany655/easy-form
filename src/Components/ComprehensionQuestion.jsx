import React, { useEffect, useState } from 'react'

function ComprehensionQuestion({ id, question, onUpdate, onDelete }) {
    const [mcq, setmcq] = useState({ q: "", options: ["","","",""], correct: "" })
    function addingMcq() {
        if (mcq.q && mcq.options[0] && mcq.options[1] && mcq.options[2] && mcq.options[3] && mcq.correct) {
            onUpdate({ ...question, mcqs: [...question.mcqs, mcq] })
            setmcq({ q: "", options: ["","","",""], correct: "" })
        }
    }

    useEffect(() => {
        console.log(mcq);
    }, [mcq])


    return (
        <section className='w-full border p-2'>
            <h1 className='text-xl my-2 flex justify-between'>
                <span>Question {id}</span>
                <button className="bg-orange-400 px-2 text-white" onClick={onDelete}>x</button>
            </h1>
            <textarea value={question.paragraph} onChange={e => onUpdate({ ...question, paragraph: e.target.value })} className='border my-1 p-1 w-full' placeholder='Comprehension' rows={3}></textarea>
            {question.mcqs.length ? <div className="border p-2 my-2">
                <h2 className="text-l">Preview MCQ</h2>
                {
                    question.mcqs.map((mcqSingle, index) => (
                        <div className="border p-2 flex justify-between" key={index}>
                            <div className="">
                                <h3 className="text-m my-2">{mcqSingle.q}</h3>
                                {
                                    mcqSingle.options.map((option, optionIndex) => (
                                        <div className="my-1" key={optionIndex}>
                                            <input readOnly checked={option == mcqSingle.correct ? true : false} type="radio" id={option} name={index} />
                                            <label className='me-3 ms-1' htmlFor={option}>{option}</label>
                                        </div>
                                    ))
                                }
                            </div>
                            <button className="text-orange-400 text-white" onClick={() => {
                                onUpdate({ ...question, mcqs: question.mcqs.filter((mc, i) => i != index) })
                            }}>Remove</button>
                        </div>
                    ))
                }
            </div> : ""}
            <div className="border p-2 my-2">
                <h2 className="text-l my-2">MCQ</h2>
                <input value={mcq.q} onChange={e => setmcq({ ...mcq, q: e.target.value })} type="text" placeholder='Question' className="border p-1 w-full mb-1" />
                {
                    mcq.options.map((option, i) => <input key={i} value={option} onChange={e => {

                        setmcq(prevState => ({
                            ...prevState,
                            options: prevState.options.map((option, index) => index === i ? e.target.value : option)
                        }));
                    }} className="border p-1 w-full mb-1" placeholder={'option ' + (i + 1)} />)
                }
                {mcq.options[2] && mcq.options[0] && mcq.options[1] && mcq.options[3] ? (
                    <select className='border p-1 w-full mb-1' onChange={e => setmcq({ ...mcq, correct: e.target.value })}>
                        <option value="">Select the currect option</option>
                        {
                            mcq.options.map((option, index) => <option key={index} value={option}>{option}</option>)
                        }
                    </select>
                ) : ''}
                <button onClick={addingMcq} className="bg-orange-400 px-2 block text-white">Add</button>
            </div>
        </section>
    )
}
export default ComprehensionQuestion