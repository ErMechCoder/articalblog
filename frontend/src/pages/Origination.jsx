import React from 'react'
import '../components/css/Main.css'
import Common from '../components/images/PositivelyPositive.png'
import Headertop from '../components/Include/Headertop'
import Header from '../components/Include/Header'
import TopFooter from '../components/Include/TopFooter'
import Footer from '../components/Include/Footer'

function Origination({quotes,promo1Data,promo2Data}) {
    return (
        <div>
        <Headertop/>
        <Header quotes={quotes}/>
        <div className="row testrow">
            <div className="col-md-6 area5">
                <div className="img_bg">
                    <img className='art__img' src={Common} alt='wornderofweird'/>
                </div>
            </div>
            <div className="col-md-6 area6">
                <div className="img_bg2">
                    <div className="text_bg">
                        <h1>Original Graphics and Text</h1>
                        <p>Pudding Rock LLC originates on an ongoing basis art and text that is unique and consider intellectual property of the company. Wonder of Weird retains the copyright to site colors and layout as retained by the United States Copyright Office.</p>
                    </div>
                </div>
            </div>
        </div>
        <TopFooter promo1Data={promo1Data} promo2Data={promo2Data} />
        <Footer />

        </div>
    )
    
}

export default Origination
