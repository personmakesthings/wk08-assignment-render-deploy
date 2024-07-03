// IMPORT MODULES
import Link from "next/link"


// COMPONENT - Houseplant Card
export function Houseplant({houseplant}) {

    // console.log(houseplant)  // TEST PROP

    // JSX
    return (
        <div className="houseplants">
            <Link href={`/houseplants/${houseplant.id}`}>
                <div className="img-container">
                    <img className="houseplant-img" src={houseplant.img_url} alt={houseplant.common_name}/>
                </div>
                <div className="houseplant-text">
                    <p><b>{houseplant.category_name}</b></p>
                    <h2>{houseplant.common_name}</h2>
                    <p><i>{houseplant.binomen}</i></p>
                </div>
            </Link>
        </div>
    )
}