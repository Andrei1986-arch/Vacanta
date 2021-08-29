
const Items = ({items , onDisplay}) => {
    return (
        <>
        {items.map((item , index) =>(
            <h3 key={item.id}>{`${item.name}  ${item.quantity} pcs`}</h3>
        ))}
        </>
    )
}
    

export default Items
