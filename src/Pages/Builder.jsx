import React, { useRef, useState } from 'react';
import CategoriesQuestion from '../Components/CategoriesQuestion';
import ClozeQuestion from '../Components/ClozeQuestion';
import ComprehensionQuestion from '../Components/ComprehensionQuestion';

function Builder() {
    const [comprehension, setComprehension] = useState({ question: "", mcq: [] })
    const [clozes, setclozes] = useState({})
    const [allcategories, setallcategories] = useState()
    const [questions, setQuestions] = useState([])

    function addQUestion() {
        if (
            comprehension.mcq.length && comprehension.question &&
            clozes.para && clozes.preview && clozes.selects.length &&
            allcategories.question && allcategories.categories && allcategories.items.length
        ) {
            console.log(comprehension, clozes, allcategories)
        } else {
            console.log("not ready yet");
        }
    }
    return (
        <main className="container mx-auto">
            <h1 className="text-2xl my-8">Question types</h1>
            <button className="bg-orange-400 px-2 py-1 text-white">Categorize</button>
            <button className="bg-orange-400 px-2 py-1 text-white mx-2">Cloze</button>
            <button className="bg-orange-400 px-2 py-1 text-white">Comprehension</button>
            
            <section className='grid md:grid-cols-1 lg:grid-cols-3 gap-4'>
                <CategoriesQuestion setallcategories={setallcategories} allcategories={allcategories} />
                <ClozeQuestion clozes={clozes} setclozes={setclozes} />
                <ComprehensionQuestion comprehension={comprehension} setComprehension={setComprehension} />
            </section>
            <button onClick={addQUestion} className="bg-orange-400 block m-auto px-24 py-2 mb-1 mt-8">Submit</button>
        </main>
    );
}

export default Builder;