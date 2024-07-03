// IMPORT MODULES
import Link from "next/link"

// IMPORT DATABASE CONNECTION
import { db } from "@/app/utils/connect"

// IMPORT COMPONENTS
import CommentForm from "@/app/components/CommentForm"
import CommentSection from "@/app/components/CommentSection"



// PAGE - DATABASE ENTRY (HOUSEPLANT PAGE)
export default async function HouseplantPage({params}) {

    // QUERY PAGE CONTENT
    const houseplant = (await db.query(`
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

    
    // QUERY COMMENTS
    const queryComments = (await db.query(
        `
        SELECT * FROM
            wk08_comments
        WHERE
            wk08_comments.houseplant_id = $1
        ORDER BY
            wk08_comments.id DESC
        `
        , [params.id])).rows

    // console.log(queryComments)

    // JSX
    return (
        <main>
            {/* PAGE CONTENT */}

            <hr />
            <p className="page-title">(Admin Actions: <Link href={`${houseplant.id}/edit`}><button>Edit Entry</button></Link>)</p>
            <hr />

            
            <section>

            <div className="entry-title">
                <h3>{houseplant.category_name}</h3>
                <h1>{houseplant.common_name}</h1>
                <h3><i>{houseplant.binomen}</i></h3>
                <p className="page-title">{houseplant.description}</p>
            </div>

            <div className="entry-contents">
                <div className="entry-text">
                    <h1>Care Requirements</h1>
                    <p><b>Temperature:</b> {houseplant.temperature}</p>
                    <p><b>Light Requirements:</b> {houseplant.light}</p>
                    <p><b>Watering needs:</b> {houseplant.water}</p>
                    <p><b>Humidity:</b> {houseplant.humidity}</p>
                    <p><b>Repotting:</b> {houseplant.repotting}</p>
                    <p><b>Flowering care:</b> {houseplant.flowering_care}</p>
                    <p><b>Propagation:</b> {houseplant.propagation}</p>
                </div>

                <div>
                    <img className="entry-img" src={houseplant.img_url}/>
                </div>
            </div>
            </section>


            <hr />
            <br />

            {/* ADD COMMENT */}
            <CommentForm entryId={params.id} />

            <br /><br />
            <hr />

            {/* DISPLAY COMMENTS */}
            <h2 className="page-title">Latest Comments</h2>
            <section className="comment-section">
                {queryComments.map((comms) => {
                    return (
                        <CommentSection comms={comms} />
                    )
                })}
            </section>
        </main>
    )
}