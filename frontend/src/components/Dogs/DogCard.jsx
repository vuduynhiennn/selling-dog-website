import { useContext } from 'react'
import { useState } from 'react'
import { CartContext } from '../../context/CartContext'
import './dog.css'

const DogCard = (props) => {
    const { id, name, breed, description, price, imageUrl } = props

    const { addToCart, setTotal } = useContext(CartContext)

    const [ isAdded, setAdded ] = useState(false);

    const handleClick = () => {
        setAdded(true)
        const newItems = {
            name: name,
            price: price,
            imageUrl: imageUrl
        }
        addToCart((item) => [...item, newItems])
        setTotal((total) => {
            return total += Number(price)
        })
    }
    return(
            <>
                <section className="dogs">
                    <div className="dogs-info">
                        <p> { name } </p>
                        <p> { breed } </p>
                    </div>

                    <div className="dogs-img-container">
                        <img className="dog-img" src={ imageUrl } alt={`${ name }`} />
                    </div>

                    <div className="dogs-desc">
                        { description }
                    </div>

                    <div className="dogs-price">
                        { price }$
                    </div>

                    {isAdded ? (<button disabled className="dogs-btn-disabled"> ADDED </button>) : 
                    (<button className="dogs-btn" onClick={ handleClick }> ADD TO CARD </button>)}

                    
                </section>
            </>
    );
}

export default DogCard;
