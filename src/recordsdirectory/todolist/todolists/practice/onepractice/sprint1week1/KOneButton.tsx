type ButtonPropsType = {
    title: string
}

export const KOneButton = ({ title }: ButtonPropsType) => {
    return <button>{title}</button>
}