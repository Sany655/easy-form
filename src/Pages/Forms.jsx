import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

function Forms() {
    const [forms, setForms] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios("questions")
            .then(res => {
                setForms(res.data)
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const removeForm = id => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure to delete this??',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.delete('/delete-form?id=' + id)
                    .then(res => {
                        if (res.data.ok) {
                            Swal.fire('Deleted!', '', 'success')
                            setForms(forms.filter((f, i) => f._id !== id))
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        })
    }

    return (
        <div className="container mx-auto">
            {
                loading?<img className='w-full text-center' src="/spinner.gif" alt="" />:
                forms.length === 0 ? <h1 className="text-slate-300 my-24 text-center text-4xl"><Link to='/create-form'>Create Forms</Link></h1> : (
                    forms.map((form, index) => (
                        <div key={index} className="border p-4 flex justify-between">
                            <div>
                                <h1 className="text-2xl">Form id: {form._id}</h1>
                                <p>Total Quwstions: {form.questions.length}</p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <Link to={'/preview/'+form._id} className='text-orange-400'>Preview</Link>
                                <button className="text-orange-400" onClick={() => removeForm(form._id)}>Remove</button>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default Forms