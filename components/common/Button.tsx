import { ButtonProps } from "@/interfaces"

const Button: React.FC<ButtonProps> = ( {backColor, title, action, icon} ) => {

    return(
        <>
            <button onClick={action} className={ backColor? `bg-${backColor} rounded w-full py-1 text-white flex flex-row items-center justify-center` : "bg-mainColor rounded w-full py-1 text-white flex flex-row items-center justify-center" }> {icon} {title} </button>
        </>
    )
}

export default Button;
