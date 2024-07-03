// IMPORT MODULES
import Link from "next/link"

// IMPORT DATABASE CONNECTION
import { db } from "@/app/utils/connect"

// IMPORT COMPONENTS
import { Category } from "@/app/components/Category"


// PAGE - CATEGORIES
export default async function Categories() {

    // QUERY DB
    const categories = (await db.query(
        `
        SELECT * FROM
        wk08_categories
        `
        )).rows

    // JSX
    return (
        <main>
            <h1 className="page-title">Find By Category</h1>
            <Link href="/houseplants"><p className="page-title">← Return To Houseplant List</p></Link>
            
            {/* RENDER CARDS */}
            <div className="cards">
                {categories.map((category) => {
                    return (
                    <Category category={category} />
                    )
                })}
            </div>
        </main>
    )
}
