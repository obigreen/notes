type ButtonPropsType = {
    title: string
    onClick: () => void
}

export const KTwoButton = ({title, onClick}: ButtonPropsType) => {
    return <button onClick={onClick}>{title}</button>
}