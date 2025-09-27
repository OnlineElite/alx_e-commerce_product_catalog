import Image from "next/image";
import { ProductProps } from "@/interfaces"
import Button from "@/components/common/Button"
import { ShoppingCart } from "lucide-react"

const Card: React.FC<ProductProps> = ({id, name, category, price, images}) => {


    const handleAddToCart = () => {
        console.log("Product added to cart")
    }

    return(
        <div id={id} className="bg-white shadow-sm flex flex-col justify-between gap-2 rounded-xl z-10">
            <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
                <Image src={images[0].image} alt={name} fill className="object-cover hover:scale-105 transition-transform duration-300 rounded-t-xl "/>
            </div>
            <div className="flex flex-col gap-2 p-4">
                <p className="font-bold"> {name} </p>
                {/* <p className="text-gray-500 text-xs line-clamp-2"> {description} </p> */}
                <p className="text-xs text-gray-500 bg-gray-400/30 rounded-lg w-fit px-2 py-1"> {category.name} </p>
                <p className="text-mainColor font-bold"> ${price} </p>               
                <Button icon={<ShoppingCart className="text-white mr-1 " />} title="Add to Cart" action={handleAddToCart}/>
            </div>
        </div>
    )
}

export default Card;
