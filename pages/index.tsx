import Toolbar from "@/components/layouts/Toolbar"
import Sidebar from "@/components/layouts/Sidebar"
import ProductList from "@/components/layouts/ProductList"

export default function Home() {

  return (
    <main className="bg-backColor grid grid-cols  md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto py-6 px-4">
        <Sidebar/>
        <Toolbar/>
        <ProductList/>
    </main>
  )
}
