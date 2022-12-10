import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Reset(){

    return(


        <div>

          <h3 className = "text-center mt-3">Reset Account Details</h3>

        <Form>

            <Form.Group className = "mb-3" controlId = "emailInput">

                <Form.Label>Provide Your Existing Email</Form.Label>

                <Form.Control type = "email" placeholder = "Enter email"></Form.Control>


            </Form.Group>


            <Button> Reset Password</Button>


        </Form>

        
        </div>





    )



}


export default Reset