import React, { useEffect, useState } from 'react'

function ClozeQuestion({clozes,setclozes}) {
    const [selected, setselected] = useState("")
    const [selects, setSelects] = useState([])
    const [para, setPara] = useState("this is a paragraph, now i want to add something here")
    const [preview, setPreview] = useState(para)
    function addToSelects() {
        setSelects([...selects,selected.toString()])
        setPreview(preview.replace(selected.toString(), "____"));
    }
    function getSelectedText() {
        let txt;
        if (window.getSelection) {
            txt = window.getSelection();
        } else if (window.document.getSelection) {
            txt = window.document.getSelection();
        } else if (window.document.selection) {
            txt = window.document.selection.createRange().text;
        }
        setselected(txt);
    }
    useEffect(() => {
        getSelectedText()
    }, [window.getSelection(),
    window.document.getSelection(),
    window.document.selection,])

    useEffect(() => {
        setclozes({para:para,preview:preview,selects:selects})
    },[selects])

    return (
        <section className='w-full border-2 p-2'>
            <h1 className='text-xl my-2'>Cloze Question</h1>
            <p className="m-2">{preview}</p>
            <input value={para} onChange={(e) => setPara(e.target.value)} type="text" placeholder='Enter paragraph' className="border" />
            <button className='bg-orange-400 text-white px-2 m-1' onClick={addToSelects}>Click to blank</button>
            <ul className="list-disc mx-6">
                {selects.map((list,index) => (
                    <li key={index}>{list}</li>
                ))}
            </ul>
        </section>
    )
}

export default ClozeQuestion