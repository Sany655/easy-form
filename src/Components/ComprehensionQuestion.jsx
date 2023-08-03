import React, { useEffect, useState } from 'react'

function ComprehensionQuestion({comprehension,setComprehension}) {
    const [mcq, setmcq] = useState({ q: "", o1: "", o2: "", o3: "", o4: "", correct: "" })
    const [allMcq, setAllMcq] = useState([{ q: "Normal adult dogs have how many teeth?", o1: "24", o2: "16", o3: "42", o4: "32", correct: "32" }])
    const [question, setquestion] = useState("")
    function addingMcq() {
        if (mcq.q && mcq.o1 && mcq.o2 && mcq.o3 && mcq.o4 && mcq.correct) {
            setAllMcq([...allMcq, mcq])
            setmcq({ q: "", o1: "", o2: "", o3: "", o4: "", correct: "" })
        }
    }
    useEffect(() => {
      setComprehension({question:question,mcq:allMcq})
    }, [allMcq,question])
    
    return (
        <section className='w-full border p-2'>
            <h1 className='text-xl my-2'>Comprehension question</h1>
            <textarea value={question} onChange={e => setquestion(e.target.value)} className='border my-1'></textarea>
            <div className="border p-2">
                <h2 className="text-l my-2">MCQ</h2>
                <input value={mcq.q} onChange={e => setmcq({ ...mcq, q: e.target.value })} type="text" placeholder='Enter question' className="border my-1" />
                <input value={mcq.o1} onChange={e => setmcq({ ...mcq, o1: e.target.value })} type="text" placeholder='Enter Option 1' className="border my-1" />
                <input value={mcq.o2} onChange={e => setmcq({ ...mcq, o2: e.target.value })} type="text" placeholder='Enter Option 2' className="border my-1" />
                <input value={mcq.o3} onChange={e => setmcq({ ...mcq, o3: e.target.value })} type="text" placeholder='Enter Option 3' className="border my-1" />
                <input value={mcq.o4} onChange={e => setmcq({ ...mcq, o4: e.target.value })} type="text" placeholder='Enter Option 4' className="border my-1" />
                {mcq.o1 && mcq.o2 && mcq.o3 && mcq.o4 ? (
                    <select className='border' onChange={e => setmcq({ ...mcq, correct: e.target.value })}>
                        <option value="">Select the currect option</option>
                        <option value={mcq.o1}>{mcq.o1}</option>
                        <option value={mcq.o2}>{mcq.o2}</option>
                        <option value={mcq.o3}>{mcq.o3}</option>
                        <option value={mcq.o4}>{mcq.o4}</option>
                    </select>
                ) : ''}
                <button onClick={addingMcq} className="bg-orange-400 px-2">Add</button>
            </div>
            {allMcq.length ? <div className="border p-2">
                <h2 className="text-l">Preview MCQ</h2>
                {
                    allMcq.map((mcqu, index) => (
                        <div className="border p-2 flex items-stretch" key={index}>
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
                            <button className="text-orange-400" onClick={() => {
                                setAllMcq(allMcq.filter((mc, i) => i != index))
                            }}>Remove</button>
                        </div>
                    ))
                }
            </div> : ""}
        </section>
    )
}
export default ComprehensionQuestion