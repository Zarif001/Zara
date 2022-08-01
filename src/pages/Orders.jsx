import React from "react"
import Card from "../components/Card"
import axios from 'axios'

function Orders() {
    const [isLoading, setIsLoading] = React.useState(true)

    const [orders, setOrders] = React.useState([])
    React.useEffect(() => {
        async function fetchOrder() {
           try {
               const { data } = await axios.get('https://62d14da4dccad0cf1764cae4.mockapi.io/orders')
               setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
               setIsLoading(false)
           } catch (error) {
            alert('Ошибка при запросе заказа') 
           }
        }
        fetchOrder()
    }, [])
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои Заказы</h1>

            </div>
            <div className="card-item">
                {(isLoading ? [...Array(10)]:orders).map((item, index) =>(
                    <Card
                        key={index}
                        loading={isLoading}
                        {...item}
                    />
                ))}
            </div>
        </div>

    )
}
export default Orders
