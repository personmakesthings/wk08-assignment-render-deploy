// IMPORT MODULES
import Link from "next/link"

// IMPORT DATABASE CONNECTION STRING
import { db } from "../utils/connect"

// IMPORT COMPONENTS
import { Houseplant } from "../components/Houseplant"


// PAGE - FIND HOUSEPLANT (list all)
export default async function FindHouseplant() {

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
    GROUP BY
      wk08_houseplants.id
    ORDER BY
      wk08_houseplants.id DESC
    `
    )).rows
    
  // console.log(houseplants)

  // JSX
  return (
      <main>
        <h1 className="page-title">Find Houseplant</h1>
        <Link href="/houseplants/categories"><p className="page-title">Click Here To Find By Category</p></Link>

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
