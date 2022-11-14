
function Footer(){

    return(

        <footer className="page-footer font-small blue pt-4 fixed-bottom">

            <div className="d-flex justify-content-around align-items-center bg-dark p-1">

                <div className="d-flex footer-links">

                <p className="text-white">About Us</p>
                
                <p className="text-white">Contact Us</p>

                </div>


                <div className="d-flex">

                    <img src="./logo192.png" alt="" height={80}></img>

                </div>


                <div className="d-flex">

                    <p className = "text-white"> © 2022 Copyright: Team Space Interactive</p>

                </div>


            </div>






        </footer>


    )
}


export default Footer;