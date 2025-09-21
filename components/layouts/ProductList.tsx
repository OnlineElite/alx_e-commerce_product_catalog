import { products } from "@/constants"
import Card from "@/components/common/Card"

const ProductList: React.FC = () => {

    return(
        <div className="bg-white rounded rounded-xl shadow-sm row-span-1 col-span-3 md:col-span-3 md:row-span-1 lg:col-span-3 ">
            <div className="bg-backColor w-full h-full grid grid-cols md:grid-cols-3 lg:grid-cols-3 gap-4">
                {products.map(({id, title, description, categorie, price, variants, image}) =>(
                    <Card key={id} id={id} title={title} description={description} categorie={categorie} price={price} variants={variants} image={image} />
                ))}
            </div>
            
        </div>
    )
}

export default ProductList;
