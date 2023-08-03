import React, { useRef, useState } from 'react';
import CategoriesQuestion from '../Components/CategoriesQuestion';
import ClozeQuestion from '../Components/ClozeQuestion';
import ComprehensionQuestion from '../Components/ComprehensionQuestion';

function Builder() {
    const [allMcq, setAllMcq] = useState([{ q: "Normal adult dogs have how many teeth?", o1: "24", o2: "16", o3: "42", o4: "32", correct: "32" }])
    const [clozes, setclozes] = useState({})
    const [comprehansion, setcomprehansion] = useState()
    const [Questions, setQuestions] = useState({
        categorize: {},
        cloze: {},
        comprehansion: {}
    })


    return (
        <main className="container mx-auto grid md:grid-cols-1 lg:grid-cols-3  gap-4">
            <CategoriesQuestion />
            <ClozeQuestion clozes={clozes} setclozes={setclozes}/>
            <ComprehensionQuestion allMcq={allMcq} setAllMcq={setAllMcq}/>

            <button onClick={() => console.log()} className="bg-orange-400 block m-auto px-24 py-2 mb-1 mt-8">Submit</button>
        </main>
    );
}

export default Builder;