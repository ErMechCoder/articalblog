import React from 'react'
import '../components/css/Main.css'
import Common from '../components/images/PositivelyPositive.png'
import Headertop from '../components/Include/Headertop'
import Header from '../components/Include/Header'
import TopFooter from '../components/Include/TopFooter'
import Footer from '../components/Include/Footer'

function CommonCausesStatements({quotes , promo1Data, promo2Data}) {
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
                        <h1>Common Causes Statements</h1>
                        <p>Wonder of Weird is a site that is dedicated to positive news, views, insight, and entertainment. We share this common cause with other entities and individuals and refuse to be baited, cajoled, or incented to include non-weird content or activities. Namely, odd, strange, bizarre, or outrageous. We are in the “awe” business to create moments of wonder, contemplation, bring a smile or learn something new. Our weird is positively positive.</p>
                        <p>Wonder of Weird favors others who are interested in factual presentation of ideas, innovations, efforts, causes or events. We work hard to avoid non-factual inflation of our content for entertainment.</p>
                        <p>Our blog and websites are oasis for guests. We hold the right to solely determine what content offered by others is presented on our site, or the links we provide to other commerce, information, or social media sites.</p>
                        <p>Join us with positive people, places and things that gets the mouth to open, the jaw to drop and an exhale while saying “ahh.” Moments of awe make our days and weeks of effort worthwhile.</p>
                    </div>
                </div>
            </div>
        </div>
        <TopFooter promo1Data={promo1Data} promo2Data={promo2Data}/>
        <Footer />

        </div>
    )
    
}

export default CommonCausesStatements
