import Toolbar from "@/components/layouts/Toolbar"
import Sidebar from "@/components/layouts/Sidebar"

export default function Home() {

  return (
    <main className="bg-mainColor grid grid-cols  md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto py-6 px-4">
      <Sidebar/>
      <Toolbar/>
      <div className="bg-white rounded rounded-xl shadow-sm row-span-1 col-span-3 md:col-span-3 md:row-span-1 lg:col-span-3 ">product list</div>
    </main>
  )
}
