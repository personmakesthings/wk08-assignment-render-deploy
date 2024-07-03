// IMPORT MODULES
import Link from "next/link"


// COMPONENT - Category Card
export function Category({category}) {

    // console.log(category) // TEST PROP

    // JSX
    return (
        <div className="houseplants">
            <Link href={`/houseplants/categories/${category.id}`}>
                <div className="img-container">
                    <img className="houseplant-img" src={category.img_url} alt={category.common_name}/>
                </div>
                <div className="houseplant-text">
                    <h2>{category.category}</h2>
                </div>
            </Link>
        </div>
    )
}