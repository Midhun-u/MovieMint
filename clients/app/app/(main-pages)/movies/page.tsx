import TabBar from "@/components/layout/TabBar"
import Banners from "@/components/pages/movies/Banners"

const MoviesPage = () => {

  return (

    <div className="w-full flex flex-col items-center mt-6">
      {/* Tab bar section */}
      <TabBar />
      {/* Banners section */}
      <Banners
      />
    </div>

  )
}

export default MoviesPage