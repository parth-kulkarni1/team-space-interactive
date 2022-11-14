import React, {useState} from "react";
import Card from 'react-bootstrap/Card';

import './WelcomePage.css'


function WelcomePage(){



    return(

        <div className="d-flex flex-column">

            <div className = "bg-success d-flex align-items-center justify-content-center" style = {{height: 25, padding: 25}} > {/*So background colors can be defined through bg... */}
            <p className = "text-white mt-2">Just Released: You can now create seamless professional experience through our posting feature for your Organisation</p>
            </div>


            <div className="d-flex justify-content-center" >
                    <h5> Reviews Of Our Service From Other Organisations</h5>
            </div>



            <div className="d-flex justify-content-around" style={{height: 500}}>

                <Card style = {{width: '28rem'}}>

                    <Card.Img variant = "top" src = "/hyper-review.jpg" alt = "The CEO of HyperReview" />

                    <Card.Body>
                        <Card.Title>Company 1</Card.Title>



                        <Card.Text>

                            "We have seen increased producitivity and collabration by using the Team Space Interactive Tool.
                            Our staff are communicating better, consistently and the sharing of files has become easier."


                        </Card.Text>

                    </Card.Body>



                </Card>

                <Card style = {{width: '28rem'}}>
                        
                    <Card.Img variant = "top" src = "/company-2.jpg" alt = "The CEO of HyperReview" />

                    <Card.Body>
                        <Card.Title>Company 2</Card.Title>

                        <Card.Text>

                            "We have seen increased producitivity and collabration by using the Team Space Interactive Tool.
                            Our staff are communicating better, consistently and the sharing of files has become easier."

                        </Card.Text>

                    </Card.Body>

                
                </Card>


                <Card style = {{width: '28rem'}}>

                    <Card.Img variant = "top" src = "/company-3.jpg" alt = "The CEO of HyperReview" />

                    <Card.Body>
                        <Card.Title>Company 3</Card.Title>

                        <Card.Text>

                            "We have seen increased producitivity and collabration by using the Team Space Interactive Tool.
                            Our staff are communicating better, consistently and the sharing of files has become easier."

                        </Card.Text>

                    </Card.Body>




                </Card>


            
            </div>

        


            
        </div>

    )


}




export default WelcomePage;