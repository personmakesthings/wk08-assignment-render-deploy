// COMPONENT - DATABASE ENTRY COMMENT SECTION
export default function CommentSection({comms}) {
    return (
        <div className="comment-div">
                <h3>{comms.username}, from {comms.location}</h3>
                <p>{comms.comment}</p>
        </div>
    )
}