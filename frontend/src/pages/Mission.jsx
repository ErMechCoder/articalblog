import React from 'react'
import '../components/css/Main.css'
import Common from '../components/images/PositivelyPositive.png'
import Headertop from '../components/Include/Headertop'
import Header from '../components/Include/Header'
import TopFooter from '../components/Include/TopFooter'
import Footer from '../components/Include/Footer'

function Mission({quotes,promo1Data,promo2Data}) {
 
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
                        <h1>Mission</h1>
                        <p>Wonder of Weird is a site dedicated to positive stories about people, places and things that bring humor, awe and learning to individuals of all ages. Our humor is our intent through the use of characters that present and participate in weirdness. We will continue on our mission as it makes us smile as well.</p>
                    </div>
                </div>
            </div>
        </div>
        <TopFooter promo1Data={promo1Data} promo2Data={promo2Data} />
        <Footer />

        </div>
    )
    
}

export default Mission
