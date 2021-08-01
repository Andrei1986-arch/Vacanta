
const Items = ({items}) => {
    return (
        <>
        {items.map((item) =>(
            <h3 key={item.id}>{`${item.name}  ${item.quantity} pcs`}</h3>
        ))}
        </>
    )
}
    

export default Items
