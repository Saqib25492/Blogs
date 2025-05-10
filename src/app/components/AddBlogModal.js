"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "@/redux/slices/modalSlice";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Card from "@/app/components/BlogCard"; // Adjust path as needed

const AddBlogModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const user = useSelector((state) => state.auth.user);

  const [activeTab, setActiveTab] = useState("create");

  const [blogdata, setBlogdata] = useState({
    title: "",
    content: "",
    image: "",
    imagePreview: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setBlogdata((prev) => ({
        ...prev,
        image: files[0],
        imagePreview: URL.createObjectURL(files[0]),
      }));
    } else {
      setBlogdata((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddBlog = async () => {
    if (blogdata.title && blogdata.content && blogdata.category) {
      const formData = new FormData();
      formData.append("title", blogdata.title);
      formData.append("content", blogdata.content);
      formData.append("category", blogdata.category);
      formData.append("author", user);
      formData.append("image", blogdata.image);
      try {
        const response = await axios.post(
          "http://localhost:5000/blogs/createBlog",
          formData,
          { withCredentials: true }
        );

        toast.success("Blog added successfully!");
        setBlogdata({
          title: "",
          content: "",
          image: "",
          imagePreview: "",
          category: "",
        });
        dispatch(closeModal());
      } catch (error) {
        console.error("Error adding blog:", error);
        toast.error("Error adding blog. Please try again.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
        <div className="modal bg-white p-6 flex flex-col w-[70vw] h-[80vh] rounded-lg shadow-lg relative overflow-y-auto">
          {/* Tabs */}
          <div className="flex gap-4 mb-4 border-b pb-2">
            <button
              className={`px-4 py-2 rounded-full ${
                activeTab === "create"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveTab("create")}
            >
              Create
            </button>
            <button
              className={`px-4 py-2 rounded-full ${
                activeTab === "preview"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveTab("preview")}
            >
              Preview
            </button>
          </div>

          {/* CREATE TAB */}
          {activeTab === "create" && (
            <>
              <h2 className="text-lg font-bold mb-4">Add New Blog</h2>
              <div className="relative w-full mb-4">
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={blogdata.title}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-white border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                />
                <label
                  htmlFor="title"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 
               peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
               peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600"
                >
                  Title
                </label>
              </div>
              <textarea
                name="content"
                placeholder="Content"
                value={blogdata.content}
                onChange={handleChange}
                className="grow w-full mb-3 p-2 border rounded-lg focus:shadow-lg transition-shadow duration-300 ease-in-out"
                rows={5}
              />
              <div className="flex gap-5 justify-between">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full mb-3 p-2 border rounded focus:shadow-lg transition-shadow duration-300 ease-in-out"
                />
                <select
                  value={blogdata.category}
                  name="category"
                  onChange={handleChange}
                  className="w-full mb-3 p-2 border rounded focus:shadow-lg transition-shadow duration-300 ease-in-out"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="technology">Technology</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="education">Education</option>
                  <option value="health">Health</option>
                  <option value="travel">Travel</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleAddBlog}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:shadow-lg hover:bg-blue-600 transition duration-500 ease-in-out"
                >
                  Add Blog
                </button>
                <button
                  onClick={() => dispatch(closeModal())}
                  className="bg-gray-300 px-4 py-2 rounded-full hover:bg-gray-800 hover:shadow-lg transition duration-300 ease-in-out"
                >
                  Cancel
                </button>
              </div>
            </>
          )}

          {/* PREVIEW TAB */}
          {activeTab === "preview" && (
            <div className="flex justify-center py-4">
              <Card
                post={{
                  title: blogdata.title || "Untitled",
                  content: blogdata.content || "No content yet...",
                  image: blogdata.imagePreview || "/placeholder.jpg",
                  category: blogdata.category || "Uncategorized",
                  authorName: user || "Anonymous",
                  timePublished: new Date().toISOString(),
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddBlogModal;
