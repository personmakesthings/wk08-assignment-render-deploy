// IMPORT MODULES
import Image from "next/image"
import Link from "next/link"


// PAGE - HOMEPAGE
export default function Homepage() {
    return (
        <main className="homepage">
            <h1 className="page-title homepage-title">Welcome!</h1>
            <section className="homepage-section">
                <div className="homepage-text">
                    <p>
                    Welcome to the Houseplant Care Database, your ultimate resource for nurturing greenery indoors. Our platform is dedicated to empowering plant enthusiasts with comprehensive care guides, expert tips, and troubleshooting solutions to ensure your leafy companions thrive in any environment. Whether you're a seasoned gardener or a beginner, our curated database offers tailored advice on watering schedules, light requirements, pest management, and more.
                    </p>
                    <p>
                    Join our community and cultivate healthier, happier plants with confidence, supported by our passion for greener living. Discover the joy of successful houseplant care today with the Houseplant Care Database.
                    </p>
                </div>
                <Image src="https://i.imgur.com/DpnCV7R.jpeg" width={300} height={300} className="homepage-img"/>
            </section>

            <Link href="/houseplants"><h2 className="big-button">Find your houseplant now! →</h2></Link>
            
        </main>
    )
}