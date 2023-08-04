import React, { useEffect, useState } from 'react'

function ClozeQuestion({ id, question, onUpdate, onDelete }) {
    const [selected, setselected] = useState({ start: 0, end: 0, str: "" })
    function addToSelects() {
        if (selected.str) {
            if (question.preview.length == 0) question.preview = question.para
            if (question.blanks.indexOf(selected.str)<0) {
                onUpdate({ ...question, blanks: question.blanks.push(selected.str) });
            }
            onUpdate({ ...question, preview: question.preview.replace(selected.str, "____") });
        }
    }

    const handleSelectedText = (event) => {
        const { selectionStart, selectionEnd } = event.target;
        setselected({ ...selected, start: selectionStart, end: selectionEnd, str: event.target.value.substring(selectionStart, selectionEnd) })
    }

    return (
        <section className='w-full border-2 p-2'>
            <h1 className='text-xl my-2 flex justify-between'>
                <span>Question {id}</span>
                <button className="bg-orange-400 px-2 text-white" onClick={onDelete}>x</button>
            </h1>
            <textarea rows={3} onSelect={handleSelectedText} onChange={(e) => onUpdate({ ...question, para: e.target.value })} type="text" placeholder='Enter paragraph' className="border p-2 w-full" defaultValue={question.para}></textarea>
            <button className='bg-orange-400 text-white px-2 ms-1' onClick={addToSelects}>Click to blank</button>
            <p className="m-2">{question.preview}</p>
            <ul className="list-disc mx-6">
                {question.blanks.map((list, index) => (
                    <li key={index}>{list}</li>
                ))}
            </ul>
        </section>
        // Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates atque officia tempora animi, expedita, est illo repellat distinctio beatae rerum quos ullam. Quibusdam voluptates, molestias quae harum eum laborum voluptate magnam mollitia praesentium esse assumenda sit libero suscipit odio. Possimus voluptatum harum eveniet? Debitis quasi quaerat harum cupiditate soluta quia.
    )
}

export default ClozeQuestion