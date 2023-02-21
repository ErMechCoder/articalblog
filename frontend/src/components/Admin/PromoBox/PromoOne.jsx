import React from 'react'
import '../css/Admin.css'
import PromoOneComp from './PromoOneComp'
import Header from '../Include/Header'
import Sidebar from '../Include/Sidebar'


const PromoOne = () => {
    return (
    <div className="row flex-nowrap">
        <Sidebar/>     
        <div className="col admin-header">
            <Header/>           
            <PromoOneComp/>         
        </div>
    </div>
    )
}

export default PromoOne
