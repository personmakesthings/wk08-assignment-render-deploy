// IMPORT MODULES
import Link from "next/link"

// IMPORT DATABASE CONNECTION
import { db } from "@/app/utils/connect"

// IMPORT COMPONENTS
import { Houseplant } from "@/app/components/Houseplant"


// PAGE - CATEGORY GROUP
export default async function CategoryGroup({params}) {

    // QUERY DB
    const houseplants = (await db.query(
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
            wk08_houseplants.category = $1
        GROUP BY
            wk08_houseplants.id
        ORDER BY
            wk08_houseplants.id DESC
        `, [params.id])).rows
    
    console.log(houseplants)

    // QUERY CATEGORIES
    const categories = (await db.query(
        `
        SELECT * FROM
            wk08_categories
        `
        )).rows

    const categoryId = (parseInt(params.id, 10) - 1) // Handle zero-indexing
    // console.log(categoryId)

    // JSX
    return (
        <main>
            <h1 className="page-title">{categories[categoryId].category}</h1>

            <Link href="/houseplants/categories"><p className="page-title">← Return to Find By Category</p></Link>

            {/* RENDER HOUSEPLANT CARDS */}
            <div className="cards">
                {houseplants.map((houseplant) => {
                return (
                    <Houseplant houseplant={houseplant} />
                )
                })}
            </div>
        </main>
    )
}
