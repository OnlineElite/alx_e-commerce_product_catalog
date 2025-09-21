import { ButtonProps } from "@/interfaces"

const Button: React.FC<ButtonProps> = ( {title, action} ) => {

    return(
        <>
            <button onClick={action} className="bg-blue-500 rounded w-full py-2 text-white"> {title} </button>
        </>
    )
}

export default Button;
