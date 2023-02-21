import React from 'react'
import '../components/css/Main.css'
import Common from '../components/images/PositivelyPositive.png'
import Headertop from '../components/Include/Headertop'
import Header from '../components/Include/Header'
import TopFooter from '../components/Include/TopFooter'
import Footer from '../components/Include/Footer'

function Disclaimer({quotes,promo1Data,promo2Data}) {
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
                        <h1>Disclaimer Statement</h1>
                        <p>Pudding Rock LLC makes no copyright claims for any third-party content included on this blob site. Pudding Rock LLC retains a copyright to all original text and images on this site in perpetuity.</p>
                    </div>
                </div>
            </div>
        </div>
        <TopFooter promo1Data={promo1Data} promo2Data={promo2Data} />
        <Footer />

        </div>
    )
    
}

export default Disclaimer
