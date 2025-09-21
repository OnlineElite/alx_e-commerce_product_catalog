import { sortingOptions } from "@/constants"

const Toolbar: React.FC = () => {


    return(
        <div className="bg-red-500 rounded rounded-xl shadow-sm md:col-span-3 flex flex-row items-center justify-between p-4 ">
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