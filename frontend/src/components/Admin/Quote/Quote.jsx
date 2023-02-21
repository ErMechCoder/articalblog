import React from 'react'
import '../css/Admin.css'
import QuoteComp from './QuoteComp'
import Header from '../Include/Header'
import Sidebar from '../Include/Sidebar'


const Quote = ({quotes,setQuotes}) => {
    return (
    <div className="row flex-nowrap">
        <Sidebar/>     
        <div className="col admin-header">
            <Header/>           
            <QuoteComp quotes={quotes} setQuotes={setQuotes}/>         
        </div>
    </div>
    )
}

export default Quote
