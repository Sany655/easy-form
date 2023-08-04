import React, { useEffect, useState } from 'react'

function ComprehensionQuestion({ id, question, onUpdate, onDelete }) {
    const [mcq, setmcq] = useState({ q: "", o1: "", o2: "", o3: "", o4: "", correct: "" })
    const [allMcq, setAllMcq] = useState([{ q: "Normal adult dogs have how many teeth?", o1: "24", o2: "16", o3: "42", o4: "32", correct: "32" }])
    // const [question, setquestion] = useState("")
    function addingMcq() {
        if (mcq.q && mcq.o1 && mcq.o2 && mcq.o3 && mcq.o4 && mcq.correct) {
            onUpdate({ ...question, mcqs: [...question.mcqs, mcq] })
            setmcq({ q: "", o1: "", o2: "", o3: "", o4: "", correct: "" })
        }
    }

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
                    question.mcqs.map((mcqu, index) => (
                        <div className="border p-2 flex justify-between" key={index}>
                            <div className="">
                                <h3 className="text-m my-2">{mcqu.q}</h3>
                                <input readOnly checked={mcqu.o1 == mcqu.correct ? true : false} type="radio" id={mcqu.o1} name={index} />
                                <label className='me-3 ms-1' htmlFor={mcqu.o1}>{mcqu.o1}</label>
                                <input readOnly checked={mcqu.o2 == mcqu.correct ? true : false} type="radio" id={mcqu.o2} name={index} />
                                <label className='me-3 ms-1' htmlFor={mcqu.o2}>{mcqu.o2}</label>
                                <input readOnly checked={mcqu.o3 == mcqu.correct ? true : false} type="radio" id={mcqu.o3} name={index} />
                                <label className='me-3 ms-1' htmlFor={mcqu.o3}>{mcqu.o3}</label>
                                <input readOnly checked={mcqu.o4 == mcqu.correct ? true : false} type="radio" id={mcqu.o4} name={index} />
                                <label className='me-3 ms-1' htmlFor={mcqu.o4}>{mcqu.o4}</label>
                            </div>
                            <button className="text-orange-400 text-white" onClick={() => {
                                onUpdate({...question,mcqs:question.mcqs.filter((mc, i) => i != index)})
                            }}>Remove</button>
                        </div>
                    ))
                }
            </div> : ""}
            <div className="border p-2 my-2">
                <h2 className="text-l my-2">MCQ</h2>
                <input value={mcq.q} onChange={e => setmcq({ ...mcq, q: e.target.value })} type="text" placeholder='Question' className="border p-1 w-full mb-1" />
                <input value={mcq.o1} onChange={e => setmcq({ ...mcq, o1: e.target.value })} type="text" placeholder='Option 1' className="border p-1 w-full mb-1" />
                <input value={mcq.o2} onChange={e => setmcq({ ...mcq, o2: e.target.value })} type="text" placeholder='Option 2' className="border p-1 w-full mb-1" />
                <input value={mcq.o3} onChange={e => setmcq({ ...mcq, o3: e.target.value })} type="text" placeholder='Option 3' className="border p-1 w-full mb-1" />
                <input value={mcq.o4} onChange={e => setmcq({ ...mcq, o4: e.target.value })} type="text" placeholder='Option 4' className="border p-1 w-full mb-1" />
                {mcq.o1 && mcq.o2 && mcq.o3 && mcq.o4 ? (
                    <select className='border p-1 w-full mb-1' onChange={e => setmcq({ ...mcq, correct: e.target.value })}>
                        <option value="">Select the currect option</option>
                        <option value={mcq.o1}>{mcq.o1}</option>
                        <option value={mcq.o2}>{mcq.o2}</option>
                        <option value={mcq.o3}>{mcq.o3}</option>
                        <option value={mcq.o4}>{mcq.o4}</option>
                    </select>
                ) : ''}
                <button onClick={addingMcq} className="bg-orange-400 px-2 block text-white">Add</button>
            </div>
        </section>
    )
}
export default ComprehensionQuestion