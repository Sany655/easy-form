import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategorizedQuestion from "../Components/CategorizedQuestion";
import ClozeQuestion from "../Components/ClozeQuestion";
import ComprehensionQuestion from "../Components/ComprehensionQuestion";

// create a root component
function Admin() {
    // use a state variable to store the array of questions
    const [questions, setQuestions] = useState([]);

    // use a state variable to store the current question type
    const [questionType, setQuestionType] = useState("");

    // create a function to add a new question of the selected type
    const addQuestion = () => {
        // create a new question object based on the question type
        let newQuestion;
        if (questionType === "Categorized") {
            newQuestion = {
                type: "Categorized",
                question: "",
                categories: [],
                items: []
            };
        } else if (questionType === "Cloze") {
            newQuestion = {
                type: "Cloze",
                para: "",
                preview: "",
                blanks: []
            };
        } else if (questionType === "Comprehension") {
            newQuestion = {
                type: "Comprehension",
                paragraph: "",
                mcqs: [],
            };
        }
        setQuestions([...questions, newQuestion]);
        setQuestionType("")
    };

    // create a function to update a question at a given index
    const updateQuestion = (index, question) => {
        // copy the previous questions array
        const newQuestions = [...questions];
        // replace the question at the given index with the updated question
        newQuestions[index] = question;
        // update the state with the new questions array
        setQuestions(newQuestions);
    };

    // create a function to delete a question at a given index
    const deleteQuestion = (index) => {
        // copy the previous questions array
        const newQuestions = [...questions];
        // remove the question at the given index from the questions array
        newQuestions.splice(index, 1);
        // update the state with the new questions array
        setQuestions(newQuestions);
    };

    const submitQuestions = () => {
        console.log(questions);
    }

    // create a function to render a question component based on its type and index
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
                    <h1 className="text-white text-4xl">Easy Form</h1>
                    <nav className='flex'>
                        <Link className="flex-1" to={'/'}>Go to preview</Link>
                        {questions.length ? <button onClick={submitQuestions} className="flex-1 px-2 text-white border">Proceed</button> : ''}
                    </nav>
                </div>
            </header>
            <main className="container mx-auto">
                <div className="flex justify-end my-4">
                    <select className="border" value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
                        <option value="">Select Question Type</option>
                        <option value="Categorized">Categorized</option>
                        <option value="Cloze">Cloze</option>
                        <option value="Comprehension">Comprehension</option>
                    </select>
                    <button className="bg-orange-400 text-white px-2 ms-2" onClick={e => questionType.length?addQuestion():''}>Add Question</button>
                </div>
                <section className="grid md:grid-cols-1 lg:grid-cols-3 gap-4">
                    {questions.map((question, index) => renderQuestionComponent(question, index))}
                </section>
            </main>
        </>
    );
}

export default Admin;
