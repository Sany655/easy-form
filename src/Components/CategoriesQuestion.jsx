import React, { useEffect, useState } from 'react';

function CategoriesQuestion({ allcategories, setallcategories }) {
    const [question, setQuestion] = useState("")
    const [categoriy, setCategory] = useState("")
    const [categories, setCategories] = useState(["a", "b", "c"])
    const [item, setItem] = useState("")
    const [belongs, setBelogs] = useState("")
    const [items, setItems] = useState([{ item: 'a', belongs: 'a' }, { item: 'b', belongs: 'b' }, { item: 'a', belongs: 'c' }])

    useEffect(() => {
        setallcategories({question:question, categories:categories, items:items})
    }, [question,
        categories,
        items])


    return (
        <section className='w-full border-2 p-2'>
            <h1 className='flex flex-column justify-between text-xl my-2'>
                <span>Categorize Question</span>
                <button>x</button>
            </h1>
            <input className='border p=2' type="text" placeholder='Enter the question' onChange={e => setQuestion(e.target.value)} value={question} />

            <br />

            {/* showing the added catagories */}
            <ul className='list-disc px-8'>
                {categories.map((cat, k) => <li draggable key={k}>{cat} <button className='bg-orange-400 px-2 my-1' onClick={() => setCategories([...categories.filter((cat, ke) => ke != k)])}>-</button></li>)}
            </ul>
            {/* adding category */}
            <input className='border' type="text" placeholder='Category' value={categoriy} onChange={e => setCategory(e.target.value)} />
            <button className='bg-orange-400 text-white px-4 mx-2' onClick={() => {
                setCategories([...categories, categoriy])
                setCategory("")
            }}>+</button>

            <br />

            {/* showing the added items and belongs */}
            <ul className='list-disc'>
                {items.map((i, showingItemsKey) => (
                    <li className='my-1 mx-8' key={showingItemsKey}>
                        <input className='border p-1' type="text" value={i.item} onChange={e => {
                            [...items][showingItemsKey].item = e.target.value
                            setItems([...items]);
                        }} />
                        <select className='border mx-2' onChange={e => {
                            [...items][showingItemsKey].belongs = e.target.value
                            setItems([...items]);
                        }} value={i.belongs}>
                            {categories.length && categories.map((cat, k) => <option key={k} value={cat}>{cat}</option>)}
                        </select>
                        <button onClick={() => setItems([...items.filter((i, ke) => ke != showingItemsKey)])}>-</button>
                    </li>))}
            </ul>
            {/* adding item and belong */}
            <input className='border' type="text" placeholder='item' value={item} onChange={e => setItem(e.target.value)} />
            <select className='border' onChange={e => setBelogs(e.target.value)} value={belongs}>
                <option>Belongs to</option>
                {categories.length && categories.map((cat, k) => <option key={k} value={cat}>{cat}</option>)}
            </select>
            <button onClick={() => {
                if (item && belongs) {
                    setItems([...items, { item: item, belongs: belongs }])
                    setItem("")
                    setBelogs("")
                }
            }}>+</button>
            <br />
            {/* <button className='bg-orange-400 text-white px-4 py-1' onClick={() => {
                if (question && categories.length && items.length) {
                    console.log();
                }
            }}>Submit</button> */}
        </section>
    );
}

export default CategoriesQuestion;