import React from 'react'
import '../css/Admin.css'
import PromoTwoComp from './PromoTwoComp'
import Header from '../Include/Header'
import Sidebar from '../Include/Sidebar'


const PromoTwo = () => {
    return (
    <div className="row flex-nowrap">
        <Sidebar/>     
        <div className="col admin-header">
            <Header/>           
            <PromoTwoComp/>         
        </div>
    </div>
    )
}

export default PromoTwo
