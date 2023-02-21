import React, {useState,useContext} from 'react'
import '../css/Admin.css'
import ArticleTable from './ArticleTable'
import Header from '../Include/Header'
import Sidebar from '../Include/Sidebar'
import { wowContext } from '../../../context/Context'


const Article = ({user,setUser}) => {
    const itemsPerPage = 5;
    const {articleState:{articles},articleDispatch}=useContext(wowContext)
    return (
    <div className="row flex-nowrap">
        
        <Sidebar/>     
        <div className="col admin-header">
            <Header user={user} setUser={setUser}/>           
            <ArticleTable  articleDisptach={articleDispatch} articles={articles} user={user}  /> 
           
        </div>
           
       </div>
            
    )
}

export default Article
