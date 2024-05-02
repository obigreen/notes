type ButtonPropsType = {
    title: string
}

export const OneButton = ({ title }: ButtonPropsType) => {
    return <button>{title}</button>
}