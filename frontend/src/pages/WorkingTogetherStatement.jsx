import React from 'react'
import '../components/css/Main.css'
import Common from '../components/images/PositivelyPositive.png'
import Headertop from '../components/Include/Headertop'
import Header from '../components/Include/Header'
import TopFooter from '../components/Include/TopFooter'
import Footer from '../components/Include/Footer'

function WorkingTogetherStatements({quotes, promo1Data, promo2Data}) {
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
                        <h1>Working Together Statement</h1>
                        <p>We value the ideas, insight and content of weird people and safeguard its use and modification. Often, we enhance stories with additional facts through our secondary research department. Primary research is difficult with dead people.</p>
                        <p>We do not favor social media posts or content beyond the use of these sites to promote and extend our brand and humor. Tell us your ideas about how we might work together submitting your idea, interest or concern.</p>
                        <p>Join us with positive people, places and things that gets the mouth to open, the jaw to drop and an exhale while saying “ahh.” Moments of awe make our days and weeks of effort worthwhile.</p>
                        <button className='btn edit-btn py-2'>Click here for our contact form.</button>
                    </div>
                </div>
            </div>
        </div>
        <TopFooter promo1Data={promo1Data} promo2Data={promo2Data}/>
        <Footer />

        </div>
    )
    
}

export default WorkingTogetherStatements
