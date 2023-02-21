import React, { useState, useEffect, useContext } from "react";
import Header from "../Include/Header";
import "../css/Admin.css";
import Sidebar from "../Include/Sidebar";
import QuilEditor from "./QuilEditor";
// import ReactLoader from "react-loader-spinner";
import { wowContext } from "../../../context/Context";

const Addarticle = ({ user }) => {
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const [title, setTitle] = useState("");
  const [editor, setEditor] = useState("<p>Hello World!</p>");
  const [id, setId] = useState(window.location.pathname.split("/")[3]);
  const [loading, setLoading] = useState(false);
  const {
    articleState: { articles },
    articleDispatch,
  } = useContext(wowContext);

  useEffect(() => {
    document.title = "Robert M Jhonson";

    if (id) {
      const getSingleArticle = () => {
        try {
          const article = articles.find((article) => article._id === id);
          setCat(article.category);
          setTitle(article.title);
          setFile(article.imageFile);
          setEditor(article.articleBody);
          console.log("article.imageFile",article.imageFile)
        } catch (error) {
          console.log(error.message);
        }
      };

      getSingleArticle();
    } else {
      document.title = "Add Article";
      setCat("");
      setTitle("");
      setFile(null);
      setEditor(null);
    }
  }, [id]);

  return (
    <div className="row flex-nowrap">
      <Sidebar />
      <div className="col admin-header">
        <Header />
        {loading ? (
          // <ReactLoader
          //   heigth="100"
          //   width="100"
          //   color="grey"
          //   arialLabel="loading"
          //   className="loader"
          // />
          <p>Loading...</p>
        ) : (
          <QuilEditor
            id={id}
            editor={editor}
            setEditor={setEditor}
            file={file}
            setFile={setFile}
            cat={cat}
            setCat={setCat}
            title={title}
            setTitle={setTitle}
            user={user}
            articles={articles}
            articleDispatch={articleDispatch}
            setLoading={setLoading}
          />
        )}
      </div>
    </div>
  );
};

export default Addarticle;
