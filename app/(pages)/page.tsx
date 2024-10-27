import Footer from "@/components/Footer"
import Heading from "@/components/Heading"
import Heroes from "@/components/Heroes"

const Home = () => (
  <main className="min-h-full flex flex-col">
    <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10 min-h-screen md:justify-start">
      <Heading />
      <Heroes />
    </div>
    <Footer />
  </main>
)

export default Home