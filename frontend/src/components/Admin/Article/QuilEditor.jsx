import React, { useState } from "react";
import { userRequest } from "../../../requestMethods";
import ReactQuill from "react-quill";
import { useNavigate, Link } from "react-router-dom";
import "react-quill/dist/quill.snow.css"; // ES6
import "../css/Admin.css";

import "../css/Admin.css";
import ArticleService from "../../../services/ArticleService";

const AddArticleComp = ({
  id,
  file,
  articleDispatch,
  articles,
  user,
  setFile,
  title,
  setTitle,
  setCat,
  cat,
  editor,
  setEditor,
  setLoading,
}) => {
  const navigate = useNavigate();

  const handleEditorChange = (html) => {
    setEditor(html);
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file.type !== "image/png") {
      alert("Please select a png file");
      return;
    }
    setFile(file);
  };
  const addArticle = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("articleBody", editor);
      formData.append("category", cat);
      formData.append("imageFile", file);
      formData.append("createdBy", user.dbAdmin.email);

      const res = await ArticleService.createArticle(formData);
      if (res.status === 201) {
        setLoading(false);

        // replace the articles imageFile from /home/ekanatechnologies/public_html to https://ekanatechnologies.in/ and then dispatch the articles to the article state
        const articlesCopy = [...articles];
        const article = res.data;
        article.imageFile = article.imageFile.replace(
          "/home/ekanatechnologies/public_html",
          "http://localhost:3000/"
        );
        articleDispatch({ type: "ADD_ARTICLE", payload: article });

        alert("Article Added");
        setCat("");
        setTitle("");
        setFile(null);
        setEditor(null);
        navigate("/admin/article");
      }
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  const updateArticle = async () => {
    setLoading(true);
    try {
      const res = await userRequest.patch(`/article/update/${id}`, {
        title,
        category: cat,
        articleBody: editor,
        imageFile: file,
        id,
      });
      if (res.status === 200) {
        setLoading(false);
        articleDispatch({
          type: "UPDATE_ARTICLE",
          payload: res.data,
        });
        alert("Article Updated");
        setEditor(null);
        setFile(null);
        setTitle("");
        setCat("");
        navigate("/admin/article");
      }
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cat || !title || !editor || !file) {
      alert("Please fill the fields");
      return;
    }
    if (id) {
      updateArticle();
    } else {
      addArticle();
    }
  };
  const handleReset = (e) => {
    e.preventDefault();
    setCat("");
    setTitle("");
    setEditor(null);
    setFile(null);
  };

  const handlePreview = () => {
    localStorage.setItem("Title", title);
    localStorage.setItem("File", file);
    localStorage.setItem("Editor", editor);
  };

  return (
    <div className="my-2 mx-2 shadow">
      <div className="py-3 px-3 admin-content-bg">
        <h4>{!id ? "Add New Article" : "Updating Article"}</h4>
      </div>
      <div className="py-5 px-5">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Article Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              Enter here your article title.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlFile1">Featured Image</label>
            <input
              type="file"
              className="form-control"
              id="exampleFormControlFile1"
              onChange={handleFileChange}
            />
            <div id="emailHelp" className="form-text">
              Upload a featured image for your article.
            </div>
          </div>
          {file && (
            <img className="uploaded-img mb-3" src={file} alt="my-photo" />
          )}
          <div className="mb-3">
            <label className="form-label">Select Category</label>
            <select
              className="form-control"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
            >
              <option>--Choose Category--</option>
              <option value="Weird Place">Weird Place</option>
              <option value="Weird People">Weird People</option>
              <option value="Weird Things">Weird Things</option>
            </select>
          </div>
          <div className="mb-3">
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              onChange={handleEditorChange}
              value={editor}
            />
          </div>

          <button
            type="submit"
            className="btn edit-btn "
            onClick={handleSubmit}
          >
            Publish
          </button>

          <button
            type="submit"
            className="btn delete-btn mx-3"
            onClick={handleReset}
          >
            Reset
          </button>
          <Link to="/preview-article" target="_blank">
            <span className="btn delete-btn" onClick={handlePreview}>
              Preview
            </span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AddArticleComp;
