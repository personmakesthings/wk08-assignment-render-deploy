// IMPORT MODULES
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


// IMPORT DATABASE CONNECTION
import { db } from "../utils/connect"


// PAGE - ADD HOUSEPLANT
export default function AddHouseplant() {

    // SUBMIT FORM DATA
    async function submitForm(formData) {
        'use server'

        // FORM INPUT VARIABLES
        const category = formData.get("category")
        const common_name = formData.get("common_name")
        const binomen = formData.get("binomen")
        const img_url = formData.get("img_url")
        const description = formData.get("description")
        const temperature = formData.get("temperature")
        const light = formData.get("light")
        const water = formData.get("water")
        const humidity = formData.get("humidity")
        const repotting = formData.get("repotting")
        const flowering_care = formData.get("flowering_care")
        const propagation = formData.get("propagation")

        // QUERY DATABASE TO ADD NEW RECORD
        await db.query(`INSERT INTO wk08_houseplants (category, common_name, binomen, img_url, description, temperature, light, water, humidity, repotting, flowering_care, propagation) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`, [category, common_name, binomen, img_url, description, temperature, light, water, humidity, repotting, flowering_care, propagation])

        // console.log(category, common_name, binomen, img_url, description, temperature, light, water, humidity, repotting, flowering_care, propagation)

        // Revalidate /houseplants & redirect to it
        revalidatePath("/houseplants")
        redirect("/houseplants")
    }

    // JSX
    return (
        <main>
            <h1 className="page-title">Submit New Houseplant</h1>

            {/* FORM */}
            <div className="form-box">
            <form action={submitForm} className="form">
                <h4>Required Fields</h4>
                <label htmlFor="category">Category</label>
                <select name="category" required>
                        <option value="1">Foliage Plants</option>
                        <option value="2">Flowering Plants</option>
                        <option value="3">Succulents</option>
                        <option value="4">Cacti</option>
                        <option value="5">Edibles</option>
                </select>

                <label htmlFor="common_name">Name</label>
                <input placeholder="Common Name" name="common_name" id="common_name" required maxLength="50" ></input>

                <label htmlFor="common_name">Scientific Name</label>
                <input placeholder="Scientific Name" name="binomen" id="binomen" required maxLength="50" ></input>

                <label htmlFor="img_url">Image URL of Houseplant</label>
                <input placeholder="Image URL" name="img_url" id="img_url" required maxLength="500" ></input>

                <label htmlFor="description">Description of Plant</label>
                <textarea className="text-area-big" placeholder="Brief Description" name="description" id="description" required maxLength="1000" ></textarea>

                

                <h4>Optional Fields - Detailed Plant Care Information</h4>
                <label htmlFor="temperature">Temperature Requirements</label>
                <textarea className="text-area-big" placeholder="Temperature" name="temperature" id="temperature" maxLength="500" ></textarea>

                <label htmlFor="light">Light</label>
                <textarea className="text-area-big" placeholder="Light" name="light" id="light" maxLength="500" ></textarea>

                <label htmlFor="water">Water</label>
                <textarea className="text-area-big" placeholder="Water" name="water" id="water" maxLength="500" ></textarea>

                <label htmlFor="humidity">Humidity</label>
                <textarea className="text-area-big" placeholder="Humidity" name="humidity" id="humidity" maxLength="500" ></textarea>

                <label htmlFor="repotting">Repotting</label>
                <textarea className="text-area-big" placeholder="Repotting" name="repotting" id="repotting" maxLength="500" ></textarea>

                <label htmlFor="flowering_care">Flowering Care</label>
                <textarea className="text-area-big" placeholder="Flowering Care" name="flowering_care" id="flowering_care" maxLength="500" ></textarea>

                <label htmlFor="propagation">Propagation</label>
                <textarea className="text-area-big" placeholder="Propagation" name="propagation" id="propagation" maxLength="500" ></textarea>

                <button type="submit">Submit</button>
            </form>

            </div>
        </main>
    )
}