import React, { useEffect, useState } from 'react';

function CategorizedQuestion({ id, question, onUpdate, onDelete }) {
    const [category, setCategory] = useState("")
    const [item, setItem] = useState("")
    const [belongs, setBelogs] = useState("")

    return (
        <section className='w-full border-2 p-2'>
            <h1 className='flex flex-column justify-between text-xl my-2'>
                <span>Question {id}</span>
                <button className="bg-orange-400 px-2 text-white" onClick={onDelete}>x</button>
            </h1>
            <input className='border px-2 py-1 my-2 w-full' type="text" placeholder='Question' onChange={e => onUpdate({ ...question, question: e.target.value })} value={question.question} required />
            <div className="border p-4">
                <h2 className="text-md mb-2">Categories</h2>
                <ul className='list-disc px-6' onDragOver={e => e.preventDefault()}>
                    {question.categories.map((cat, k) => (
                        <li draggable key={k} onDragStart={e => {
                            e.dataTransfer.setData('text/plain', k)
                        }} id={cat} onDrop={e => {
                            const draggedIndex = e.dataTransfer.getData('text/plain');
                            const newItems = [...question.categories];
                            newItems[k] = question.categories[draggedIndex];
                            newItems[draggedIndex] = question.categories[k];
                            onUpdate({ ...question, categories: newItems})
                        }}>
                            <span>{cat}</span>
                            <button className='px-2 my-1 text-orange-400' onClick={() => onUpdate({ ...question, categories: question.categories.filter((cat, ke) => ke != k) })}>Remove</button>
                        </li>
                    ))}
                </ul>
                <input className='border px-2' type="text" placeholder='Category' value={category} onChange={e => setCategory(e.target.value)} />
                <button className='bg-orange-400 text-white px-4 mx-2' onClick={() => {
                    if (category.length > 0) onUpdate({ ...question, categories: [...question.categories, category] })
                    setCategory("")
                }}>Add</button>
            </div>
            <div className="border p-4 my-2">
                <h2 className="text-md mb-2">Items</h2>
                <ul className='list-disc' onDragOver={e => e.preventDefault()}>
                    {question.items.map((i, showingItemsKey) => (
                        <li className='my-1 ms-4' key={showingItemsKey} draggable onDragStart={e => {
                            e.dataTransfer.setData('text/plain',showingItemsKey)
                        }} onDrop={e => {
                            const draggedIndex = e.dataTransfer.getData('text/plain');
                            const newItems = [...question.items];
                            newItems[showingItemsKey] = question.items[draggedIndex];
                            newItems[draggedIndex] = question.items[showingItemsKey];
                            onUpdate({ ...question, items: newItems})
                        }}>
                            <input className='border px-1' type="text" value={i.item} onChange={e => {
                                [...question.items][showingItemsKey].item = e.target.value
                                onUpdate({ ...question, items: [...question.items] })
                            }} />
                            <select className='border mx-2 px-2' onChange={e => {
                                [...question.items][showingItemsKey].belongs = e.target.value
                                onUpdate({ ...question, items: [...question.items] })
                            }} value={i.belongs}>
                                {question.categories.length && question.categories.map((cat, k) => <option key={k} value={cat}>{cat}</option>)}
                            </select>
                            <button onClick={() => onUpdate({ ...question, items: question.items.filter((i, ke) => ke != showingItemsKey) })} className="text-orange-400">Remove</button>
                        </li>))}
                </ul>
                <input className='border px-2 my-2 me-2' type="text" placeholder='item' value={item} onChange={e => setItem(e.target.value)} />
                <select className='border px-2 me-2' onChange={e => setBelogs(e.target.value)} value={belongs}>
                    <option>Category</option>
                    {question.categories.length && question.categories.map((cat, k) => <option key={k} value={cat}>{cat}</option>)}
                </select>
                <button onClick={() => {
                    if (item && belongs) {
                        onUpdate({ ...question, items: [...question.items, { item: item, belongs: belongs }] })
                        setItem("")
                        setBelogs("")
                    }
                }} className="bg-orange-400 text-white px-2">Add</button>
            </div>
        </section>
    );
}

export default CategorizedQuestion;