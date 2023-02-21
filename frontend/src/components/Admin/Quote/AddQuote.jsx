import React from 'react'
import Header from '../Include/Header'
import '../css/Admin.css'
import AddQuoteComp from './AddQuoteComp'
import Sidebar from '../Include/Sidebar'

const AddQuote = ({quotes,setQuotes}) => {
    return (
    <div className="row flex-nowrap">
        <Sidebar/>
        <div className="col admin-header">
        <Header/>
        <AddQuoteComp quotes={quotes} setQuotes={setQuotes}/>
        </div>
    </div>
    )
}

export default AddQuote
