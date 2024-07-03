// DIRECTIVE
"use client"

// IMPORT HOOKS
import { useState } from 'react'

// COMPONENT - UPDATE FORM
export default function UpdateForm({initialData, onSubmit}) {

    // FORM DATA
    // Inititally populated with record data from database table
    const [formData, setFormData] = useState({
        category: initialData.category,
        common_name: initialData.common_name,
        binomen: initialData.binomen,
        img_url: initialData.img_url,
        description: initialData.description,
        temperature: initialData.temperature,
        light: initialData.light,
        water: initialData.water,
        humidity: initialData.humidity,
        repotting: initialData.repotting,
        flowering_care: initialData.flowering_care,
        propagation: initialData.propagation
    })

    // FUNCTION TO CHANGE FORM DATA AS USER TYPES
    function formInput(event) {
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        })
    }

    // console.log(formData) // Client-side, so user can see updates in browser console.

    // SUBMIT FORM
    // Data passed back to parent through onSubmit prop
    function submitForm(event) {
        event.preventDefault()
        onSubmit(formData)
    }

    // JSX
    return (
        <form onSubmit={submitForm} onChange={formInput} className="form">
            <h4>Required Fields</h4>
            <label htmlFor="category">Category</label>
            <select name="category" required value={formData.category} >
                <option value="1">Foliage Plants</option>
                <option value="2">Flowering Plants</option>
                <option value="3">Succulents</option>
                <option value="4">Cacti</option>
                <option value="5">Edibles</option>
            </select>

            <label htmlFor="common_name">Name</label>
            <input placeholder="Common Name" name="common_name" id="common_name" required maxLength="50" value={formData.common_name}/>

            <label htmlFor="binomen">Scientific Name</label>
            <input placeholder="Scientific Name" name="binomen" id="binomen" required maxLength="50" value={formData.binomen}  />

            <label htmlFor="img_url">Image URL of Houseplant</label>
            <input placeholder="Image URL" name="img_url" id="img_url" required maxLength="500" value={formData.img_url}  />

            <label htmlFor="description">Description of Plant</label>
            <textarea className="text-area-big" placeholder="Brief Description" name="description" id="description" required  maxLength="1000" value={formData.description}  />

            <h4>Optional Fields - Detailed Plant Care Information</h4>
            <label htmlFor="temperature">Temperature Requirements</label>
            <textarea className="text-area-big" placeholder="Temperature" name="temperature" id="temperature" maxLength="500" value={formData.temperature}  />

            <label htmlFor="light">Light</label>
            <textarea className="text-area-big" placeholder="Light" name="light" id="light" maxLength="500" value={formData.light}  />

            <label htmlFor="water">Water</label>
            <textarea className="text-area-big" placeholder="Water" name="water" id="water" maxLength="500" value={formData.water}  />

            <label htmlFor="humidity">Humidity</label>
            <textarea className="text-area-big" placeholder="Humidity" name="humidity" id="humidity" maxLength="500" value={formData.humidity}  />

            <label htmlFor="repotting">Repotting</label>
            <textarea className="text-area-big" placeholder="Repotting" name="repotting" id="repotting" maxLength="500" value={formData.repotting}  />

            <label htmlFor="flowering_care">Flowering Care</label>
            <textarea className="text-area-big" placeholder="Flowering Care" name="flowering_care" id="flowering_care" maxLength="500" value={formData.flowering_care}  />

            <label htmlFor="propagation">Propagation</label>
            <textarea className="text-area-big" placeholder="Propagation" name="propagation" id="propagation" maxLength="500" value={formData.propagation}  />

            <button type="submit">Submit</button>
        </form>
    )
}
