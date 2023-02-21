import React from 'react'


const OneArticleDisplay = () => {
    /// % symbold from params
    const title=window.location.pathname.split("/")[2];
    // remove the % symbol from the title
    const title2=title.replace("%"," ");

   
console.log(title2)
  return (
    <div>OneArticleDisplay</div>
  )
}

export default OneArticleDisplay