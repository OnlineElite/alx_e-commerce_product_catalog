import { sortingOptions } from "@/constants"

const Toolbar: React.FC = () => {


    return(
        <div className="bg-white rounded rounded-xl shadow-sm row-span-1 col-span-3 md:col-span-3 md:row-span-1 lg:col-span-3 flex flex-row items-center justify-between px-4 py-2 ">
            <p>Showing 12 products</p>
            <select name="sorting" id="sorting" className="border border-gray-300 rounded p-1">
                {sortingOptions.map((option, index) =>(
                <option value={option} key={index}> {option} </option>
                ))}
            </select>
        </div>
    )
}

export default Toolbar;