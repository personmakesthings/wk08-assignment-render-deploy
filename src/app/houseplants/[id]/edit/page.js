// IMPORT MODULES
import Link from 'next/link'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// IMPORT DATABASE CONNECTION
import { db } from '@/app/utils/connect'

// IMPORT COMPONENTS
import UpdateForm from '@/app/components/UpdateForm'



// PAGE - EDIT HOUSEPLANT
export default async function EditHouseplant({params}) {

    // QUERY DATABASE FOR INITIAL DATA TO POPULATE FORM
    // Passed to child in prop
    const initialData = (await db.query(
        `
        SELECT
            wk08_houseplants.*,
            ARRAY_AGG(wk08_categories.category) AS category_name
        FROM
            wk08_houseplants
        LEFT JOIN
            wk08_houseplants_categories ON wk08_houseplants.id = wk08_houseplants_categories.houseplant_id
        LEFT JOIN
            wk08_categories ON wk08_categories.id = wk08_houseplants_categories.category_id
        WHERE
            wk08_houseplants.id = $1
        GROUP BY
            wk08_houseplants.id
        `
        , [params.id])).rows[0]


    // HANDLE FORM SUBMISSION
    async function submitForm(formData) {
        'use server'

        // FORM INPUT VARIABLES
        const {category, common_name, binomen, img_url, description, temperature, light, water, humidity, repotting, flowering_care, propagation} = formData

        // QUERY DATABASE TO UPDATE RECORD
        await db.query(
            `
            UPDATE
                wk08_houseplants 
            SET 
                category = $1, 
                common_name = $2, 
                binomen = $3, 
                img_url = $4, 
                description = $5, 
                temperature = $6, 
                light = $7, 
                water = $8, 
                humidity = $9, 
                repotting = $10, 
                flowering_care = $11, 
                propagation = $12
            WHERE
                id = $13
            `
            ,[category, common_name, binomen, img_url, description, temperature, light, water, humidity, repotting, flowering_care, propagation, params.id])

        revalidatePath(`/houseplants/${params.id}`)
        redirect(`/houseplants/${params.id}`)
    }

    // JSX
    return (
        <main>
            <Link href={`/houseplants/${params.id}`}><h3 className="page-title">← Return to database entry</h3></Link>
            <h1 className="page-title">Editing Database Entry:</h1>
            <h2 className="page-title">{initialData.common_name}</h2>

            <div className="form-box">
                <UpdateForm initialData={initialData} onSubmit={submitForm} />
            </div>
        </main>
    )
}