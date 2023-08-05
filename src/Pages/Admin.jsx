import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategorizedQuestion from "../Components/CategorizedQuestion";
import ClozeQuestion from "../Components/ClozeQuestion";
import ComprehensionQuestion from "../Components/ComprehensionQuestion";
import axios from 'axios'
import Swal from 'sweetalert2'
function Admin() {
    const [questions, setQuestions] = useState([]);
    const [questionType, setQuestionType] = useState("");
    const addQuestion = () => {
        let newQuestion;
        if (questionType === "Categorized") {
            newQuestion = {
                type: "Categorized",
                question: "Match items with appropriate category",
                categories: ["Country", "City"],
                items: [
                    { item: "BD", belongs: "Country" },
                    { item: "India", belongs: "Country" },
                    { item: "Mumbai", belongs: "City" },
                    { item: "Chittagong", belongs: "City" },
                ]
            };
        } else if (questionType === "Cloze") {
            newQuestion = {
                type: "Cloze",
                para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero sit cum dolorem nostrum nam? Molestiae dignissimos nisi est vel sapiente, incidunt sed sequi magni dicta, doloribus sit laborum eos. Animi, non debitis? Accusantium beatae tempora asperiores temporibus, nihil dolorum alias suscipit ea, quis nobis inventore quaerat tenetur fugit. Libero, atque.",
                preview: "____ ipsum ____ sit amet consectetur adipisicing elit. ____ sit cum dolorem nostrum ____? ____ dignissimos nisi est vel sapiente, incidunt sed sequi magni dicta, doloribus sit laborum eos. Animi, non debitis? Accusantium beatae tempora asperiores ____, nihil ____ alias suscipit ea, quis ____ inventore ____ tenetur fugit. Libero, ____.",
                blanks: ['Lorem', 'dolor', 'Libero', 'nam', 'Molestiae', 'temporibus', 'dolorum', 'nobis', 'quaerat', 'atque']
            };
        } else if (questionType === "Comprehension") {
            newQuestion = {
                type: "Comprehension",
                paragraph: `The development of nationalism in the third world countries, as is well known, followed a very different trajectory from that in the advanced capitalist countries. In the latter it was a part of the process of the emergence of the bourgeois order in opposition to feudalism, while in the former it was a part of the anti-colonial struggle. The impact of colonialism, though it differed across countries, had on the whole been in the direction of transcending localism and unifying supra-local economic structures through the introduction of market relations. The struggle against colonialism, consequently, took the form of a national struggle in each instance in which people belonging to different tribes or linguistic communities participated. And the colonial power in each instance attempted to break this emerging national unity by splitting people.

                The modus operandi of this splitting was not just through political manipulation as happened for instance in Angola, South Africa and a host of other countries; an important part of this modus operandi was through the nurturing of a historiograpy that just denied the existence of any overarching national consciousness. The national struggle, the national movement were given a tribal or religious character, they were portrayed as being no more than the movement of the dominant tribe or the dominant religious group for the achievement of narrow sectional ends. But the important point in this colonialism, while, on the one hand, it objectively created the condition for the coming into being of a national consciousness at a supra-tribal, supra-local and suprareligious level, on the other hand it sought deliberately to subvert this very consciousness by using the same forces which it had objectively undermined.`,
                mcqs: [{ q: "Which of the following was the advantage of struggle against colonialism?", options: ["Backwardness of tribals was eradicated", "Awareness beyond linguistic and religious identity was generated", "Communities got divided on the basis of religion and language", "Tribal groups held their separate identity throughout the struggle."], correct: "Awareness beyond linguistic and religious identity was generated" }],
            };
        }
        setQuestions([...questions, newQuestion]);
        setQuestionType("")
    };

    const updateQuestion = (index, question) => {
        const newQuestions = [...questions];
        newQuestions[index] = question;
        setQuestions(newQuestions);
    };

    const deleteQuestion = (index) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    const submitQuestions = () => {
        axios.post("/add-question", { questions: questions })
            .then(res => {
                console.log(res.data);
                if (res.data.acknowledged) {
                    Swal.fire(
                        'Good job!',
                        'Form is created successfully!',
                        'success'
                    )
                    setQuestions([])
                }
            })
    }

    const renderQuestionComponent = (question, index) => {
        if (question.type === "Categorized") {
            return (
                <CategorizedQuestion
                    key={index}
                    id={index + 1}
                    question={question}
                    onUpdate={(updatedQuestion) => updateQuestion(index, updatedQuestion)}
                    onDelete={() => deleteQuestion(index)}
                />
            );
        } else if (question.type === "Cloze") {
            return (
                <ClozeQuestion
                    key={index}
                    id={index + 1}
                    question={question}
                    onUpdate={(updatedQuestion) => updateQuestion(index, updatedQuestion)}
                    onDelete={() => deleteQuestion(index)}
                />
            );
        } else if (question.type === "Comprehension") {
            return (
                <ComprehensionQuestion
                    key={index}
                    id={index + 1}
                    question={question}
                    onUpdate={(updatedQuestion) => updateQuestion(index, updatedQuestion)}
                    onDelete={() => deleteQuestion(index)}
                />
            );
        }
    };


    return (
        <>
            <header className='bg-orange-400 p-4'>
                <div className="container mx-auto flex justify-between">
                    <h1 className="text-white md:text-4xl text-lg">Easy Form</h1>
                    <nav className=''>
                        <Link className="text-white" to={'/'}>Preview</Link>
                    </nav>
                </div>
            </header>
            <main className="container px-2 mx-auto">
                <section className="grid md:grid-cols-1 lg:grid-cols-1 gap-4">
                    {questions.length == 0 ? (
                        <p className="text-slate-300 text-4xl my-24 text-center">Select Questions to build a form</p>
                    ) : questions.map((question, index) => renderQuestionComponent(question, index))}
                </section>
                <section className="flex justify-center gap-4 my-8">
                    {questions.length ? <button onClick={submitQuestions} className="px-6 text-white bg-orange-400 border">Submit</button> : ''}
                    <div>
                        <select className="border" value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
                            <option value="">Select Question Type</option>
                            <option value="Categorized">Categorized</option>
                            <option value="Cloze">Cloze</option>
                            <option value="Comprehension">Comprehension</option>
                        </select>
                        <button className="bg-orange-400 text-white px-2 ms-2" onClick={e => questionType.length ? addQuestion() : ''}>Add Question</button>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Admin;
