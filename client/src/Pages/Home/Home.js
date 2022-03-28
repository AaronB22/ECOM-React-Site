import { 
    Card,
    Container,
    Button,
    Carousel
    } from "react-bootstrap";
import './Home.scss'
import Product from "../../Components/Product/Product";


const Home = () => {
    return (
        <div>
            <Carousel className="car-block">
                <Carousel.Item>
                <img
                    src={require('../../assests/laptop.jpg')}
                    className='imgHome'
                    />
                </Carousel.Item>
                <Carousel.Item>
                <img
                    src={require('../../assests/tablet.jpg')}
                    className='imgHome'
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    src={require('../../assests/phone.jpg')}
                    className='imgHome'
                    />
                </Carousel.Item>
            </Carousel>
            <Product/>
        </div>
      );
}
 
export default Home;