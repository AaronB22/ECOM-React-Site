import './Cart.scss';
import { useState, useEffect, useContext } from 'react';
import { Card, Col, Row, Button, Spinner } from 'react-bootstrap';
import { UserContext } from '../../utils/UserContext';

import CartComp from '../../Components/CartComp/CartComp';

const Cart = () => {
    const [Loaded, setLoaded]= useState();
    const [Cart, setCart]= useState([])
  
    const [itemCount, setItemCount]=useState()
    const {userInfo}= useContext(UserContext)
    
    useEffect(()=>{
        setItemCount(Cart.length)
    },[Cart])

   

    useEffect(()=>{
        if(userInfo){
            const getProductId=async()=>{
                const res= await  fetch('/api/getUser/'+userInfo.id)
                const data= await res.json()

                const oldcart= data[0].cart
                const fetchProduct=async()=>{
                    for(let i=0; i<oldcart.length;i++){
                       const r= await fetch('/api/productById/'+oldcart[i])
                       const productInfo= await r.json()
                       setCart((oldArr)=>[...oldArr, productInfo[0]])
                    }
                    setLoaded(true)
                  
                }
                fetchProduct()
            }
            getProductId()

        };
        
    },[userInfo, setCart,])
    


    const removeAll=async()=>{
        const deleteObj={
            "userId":userInfo.id,
            "email":userInfo.email
        }
        await fetch('/api/removeAllFromCart',{
            method: "POST",
            body:JSON.stringify(deleteObj),
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
              }
            } )
        window.location.reload()
    }


    if(Loaded){
        let price=0;
        for (let i=0; i<itemCount;i++){
            price+=Cart[i].price;
        }
        const tax= (price/100)*6.52
        return (  
            <>
                <div className='spanMarginTop'></div>
                <div className='cartTitleDiv'>
                    <h1>
                        Shopping Cart ({itemCount} items)
                    </h1>
                    <div className='removeAllText' onClick={removeAll}>
                            Remove All Items
                    </div>
                    <div className='priceLabel'>
                           Price
                    </div>

                </div>
                <div className='mainCartDiv'>
                    {Cart.map(x=>{

                        return(
                            <CartComp
                            key={x._id}
                            product={x}
                            />
                        )
                    })}

                <div className='buyDiv'>
                    <Card className='buyCard'>
                    <h2>Purchase Summary</h2>
                        <Row>
                            <Col>
                                <div className='items'>
                                    item(s):
                                </div>
                            </Col>
                            <Col>
                                <div className='totalprice'>
                                    ${price}
                                </div>
                            
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className='items'>
                                    Est. Delivery:
                                </div>
                            </Col>
                            <Col>
                                <div className='totalprice'>
                                    $0.00
                                </div>
                            
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className='items'>
                                   Tax:
                                </div>
                            </Col>
                            <Col>
                                <div className='totalprice'>
                                    ${tax}
                                </div>
                            
                            </Col>
                        </Row>

                        <div className='bottomCardCart'>
                        <Row >
                            <Col>
                                
                            <h3 className='totalTitle'>TOTAL COST:</h3>
                            </Col>
                            <Col>
                            <div className='totalPrice'>${price+tax}</div>
                                
                            </Col>
                        </Row>
                            <Button className='checkoutBtn'>Checkout</Button>
                        </div>
                    </Card>
                </div>
                </div>

            </>
        );

    }
    if(!Loaded){
        return(<>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </>)
    }
}
 
export default Cart;