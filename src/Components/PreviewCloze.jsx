import React, { useEffect, useRef, useState } from 'react'

function PreviewCloze({ question, id, answers, setAnswers }) {
    const prev = useRef("");
    
    useEffect(() => {
        const splitParagraph = question.preview.split("____")
        const joindedParagraph = splitParagraph.map((prevItems, index) => {
            if (index !== splitParagraph.length - 1) return prevItems + `<span id='${question.blanks[index]}' class="px-8 mx-2 bg-slate-300 blanks"></span>`;
        }).join("");
        prev.current.innerHTML = joindedParagraph

        const spanTags = document.querySelectorAll('span.blanks');
        spanTags.forEach(span => {
            span.addEventListener('dragover', e => {
                e.preventDefault()
            });
            span.addEventListener('drop', e => {
                if (!e.target.childNodes.length) {
                    e.target.appendChild(document.getElementById(e.dataTransfer.getData('text/plain')))
                    e.target.className = ''
                    const tempAnswer = answers
                    tempAnswer[id].para = prev.current.innerText
                    setAnswers(tempAnswer)
                }
            });
        });
    }, [])



    return (
        <div className="border p-4">
            <h1 className="text-orange-400 text-center text-2xl font-bold mb-2">Question {id + 1}</h1>
            <h2 className="text-xl">Fill the blanks by drag and drop to the correct porsiotion</h2>
            <div className="py-2 block" onDragOver={e => e.preventDefault()}>
                {
                    question.blanks.map((blank, index) => (
                        <span key={index} className="border px-4 pb-1 bg-orange-400 text-white rounded-md" draggable onDragStart={e => {
                            e.dataTransfer.setData('text/plain', e.target.id)
                        }} id={blank}>{blank}</span>
                    ))
                }
            </div>
            <p ref={prev}></p>
        </div>
    )
}

export default PreviewCloze