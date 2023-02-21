import React from 'react'
import '../components/css/Main.css'
import Common from '../components/images/PositivelyPositive.png'
import Headertop from '../components/Include/Headertop'
import Header from '../components/Include/Header'
import TopFooter from '../components/Include/TopFooter'
import Footer from '../components/Include/Footer'

function CookiePolicy({quotes , promo1Data,promo2Data}) {
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
                            <h1>Cookie Policy Template</h1>
                            <p>Please read this cookie policy (“cookie policy”, "policy") carefully before using https://wonderofweird.com website (“website”, "service") operated by Pudding Rock LLC ("us", 'we", "our").</p>
                            <strong>What are cookies?</strong>
                            <p>Cookies are simple text files that are stored on your computer or mobile device by a website's server. Each cookie is unique to your web browser. It will contain some anonymous information such as a unique identifier, website's domain name, and some digits and numbers.</p>
                            <strong>What types of cookies do we use?</strong>
                            <p>Necessary cookies Necessary cookies allow us to offer you the best possible experience when accessing and navigating through our website and using its features. For example, these cookies let us recognize that you have created an account and have logged into that account. Functionality cookies Functionality cookies let us operate the site in accordance with the choices you make. For example, we will recognize your username and remember how you customized the site during future visits. Analytical cookies These cookies enable us and third-party services to collect aggregated data for statistical purposes on how our visitors use the website. These cookies do not contain personal information such as names and email addresses and are used to help us improve your user experience of the website.</p>
                            <strong>How to delete cookies?</strong>
                            <p>If you want to restrict or block the cookies that are set by our website, you can do so through your browser setting. Alternatively, you can visit www.internetcookies.org, which contains comprehensive information on how to do this on a wide variety of browsers and devices. You will find general information about cookies and details on how to delete cookies from your device.</p>
                            <strong>Contacting us</strong>
                            <p>If you have any questions about this policy or our use of cookies, please contact us at weirdone@wonderofweird.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <TopFooter promo1Data={promo1Data} promo2Data={promo2Data}/>
            <Footer />
        </div>
    )
    
}

export default CookiePolicy
