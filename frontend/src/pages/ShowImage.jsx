import React,{useState,useContext} from 'react'
import { wowContext } from '../context/Context'

const ShowImage = () => {
    const [image,setImage]=useState(null)

 const {articleState:{articles}} = useContext(wowContext);
    const title=window.location.pathname.split("/")[2]
    const encoded=  decodeURI(title)

  React.useEffect(() => {
    articles.map((article)=>{
        if(article.title===encoded){
            setImage(article.imageFile)
        }
    })

  }, [encoded,title ,articles])


  return (
    <div className='d-flex align-items-center justify-content-center'>
       <div className='d-flex align-items-center justify-content-center'>
       {
        image!==null?
        <img src={image} alt="" height={700} width={600} style={{objectFit:'contain'}}/>
        :
        <h1>No Image</h1>
         }
       </div>
    </div>
  )
}

export default ShowImage