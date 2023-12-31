import { useEffect } from "react";

function PreviewCategorized({ question, id, answers, setAnswers }) {
    return (
        <div className="border p-4 my-2">
            <h1 className="text-orange-400 text-center text-2xl font-bold mb-2">Question {id + 1}</h1>
            {question.question ? <h2 className="text-xl">{question.question}</h2> : ''}
            <div className="py-4">
                {
                    question?.items.map((item, index) => {
                        return (
                            <span key={index} className="border px-4 py-2 bg-orange-400 text-white rounded-md" draggable onDragStart={e => {
                                e.dataTransfer.setData('text/plain', e.target.id)
                            }} id={index+item.item}>{item.item}</span>
                        )
                    })
                }
            </div>
            {question?.categories.map((category, index) => (
                <div className="border my-4 px-2 py-4" key={index} onDragOver={e => e.preventDefault()} onDrop={e => {
                    e.target.appendChild(document.getElementById(e.dataTransfer.getData('text/plain')))
                    const tempAnswers = answers;
                    tempAnswers[id].categories.push({ "category": category, "item": document.getElementById(e.dataTransfer.getData('text/plain')).textContent});
                    setAnswers([...tempAnswers])
                }}>
                    <span className="mx-2 border px-4 py-2 bg-orange-400 text-white rounded-md">{category}</span>
                </div>
            ))}
        </div>
    )
}

export default PreviewCategorized