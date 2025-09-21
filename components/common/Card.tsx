import Image from "next/image";
import { ProductProps } from "@/interfaces"
import Button from "@/components/common/Button"
import { ShoppingCart } from "lucide-react"

const Card: React.FC<ProductProps> = ({id, title, description, categorie, price, variants, image}) => {


    const handleAddToCart = () => {
        console.log("Product added to cart")
    }

    return(
        <div id={`${id}`} className="bg-white shadow-sm flex flex-col items-center justify-between gap-2 rounded-xl z-10">
            <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
                <Image src={image} alt={title} fill className="object-cover hover:scale-105 transition-transform duration-300 rounded-t-xl "/>
            </div>
            <div className="flex flex-col gap-2 p-4">
                <p className="font-bold"> {title} </p>
                <p className="text-gray-500 text-xs line-clamp-2"> {description} </p>
                <p className="text-xs text-gray-500 bg-gray-400/30 rounded-lg w-fit px-2 py-1"> {categorie} </p>
                <p className="text-mainColor font-bold"> ${price} </p>
                <div className="flex flex-row  gap-2 flex-wrap">
                    {variants.map((color, index) => (           
                    <span key={index} className={color == "black"? `bg-${color} w-6 h-6 rounded-full` : `bg-${color}-500 w-6 h-6 rounded-full`}> </span>         
                    ))}
                </div>
                <Button icon={<ShoppingCart className="text-white mr-1 " />} title="Add to Cart" action={handleAddToCart}/>
            </div>
        </div>
    )
}

export default Card;
