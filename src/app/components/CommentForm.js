// IMPORT MODULES
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// IMPORT DATABASE CONNECTION
import { db } from "@/app/utils/connect"


// COMPONENT - COMMENT FORM ON DATABASE ENTRY
export default function CommentForm({entryId}) {

    async function handleSubmit(formData) {
        // DIRECTIVE
        "use server"

        // FORM INPUT VARIABLES
        const houseplant_id = entryId
        const username = formData.get("username")
        const location = formData.get("location")
        const comment = formData.get("comment")

        // QUERY DATABASE TO ADD NEW COMMENT
        await db.query(`INSERT INTO wk08_comments (houseplant_id, username, location, comment) VALUES ($1, $2, $3, $4)`, [houseplant_id, username, location, comment])

        // REVALIDATE & REDIRECT
        revalidatePath(`/houseplants/${houseplant_id}`)
        redirect(`/houseplants/${houseplant_id}`)
    }

    // JSX
    return (
        <section>
            <h1 className="page-title">Add Comment</h1>

            <div className="form-box">
                <form action={handleSubmit} className="form">
                    <label htmlFor="username">Username</label>
                    <input placeholder="Your Name" name="username" id="username" required maxLength={30}/>

                    <label htmlFor="location">Location</label>
                    <input placeholder="Your Location" name="location" id="location" required maxLength={30}/>

                    <label htmlFor="comment">Comment</label>
                    <textarea className="text-area-big" placeholder="Your Comment" name="comment" id="comment" required maxLength={500}></textarea>

                    <button type="submit">Submit Comment</button>
                </form>
            </div>

        </section>
    )
}