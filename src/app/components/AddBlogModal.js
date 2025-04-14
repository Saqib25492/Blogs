"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "@/redux/slices/modalSlice";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";


const AddBlogModal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.modal.isOpen);
    const user = useSelector((state) => state.auth.user);
    console.log("userID: ",user);
    

    const [blogdata, setBlogdata] = useState({
        title: "",
        content: "",
        image: "",
        category: "",
});



const handleChange = (e) => {
    const { name, value, files } = e.target;

    // const { title, content, category } = blogdata;
    // console.log("title:", title, "content:", content, "category:", category);
    setBlogdata((prev) => ({
    ...prev,
    [name]: name === "image" ? files[0] : value,
    }));
};

const handleAddBlog = async () => {
    console.log("Image selected:", blogdata.image);
    if (blogdata.title && blogdata.content && blogdata.category) {
    const formData = new FormData();
    formData.append("title", blogdata.title);
    formData.append("content", blogdata.content);
    formData.append("category", blogdata.category);
    formData.append("author", user); // Make sure `user` is a string or simple object
    formData.append("image", blogdata.image); // Attach file
    try {
        const response = await axios.post(
        "http://localhost:5000/createBlog",
        formData);
        
        toast.success("Blog added successfully!");

        setBlogdata({
            title: "",
            content: "",
            image: "",
            category: "",
            });
        

        console.log("Blog added successfully:", response.data);
        dispatch(closeModal());

    } catch (error) {
        console.log("Error adding blog:", error);
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
        <div className="modal bg-white p-6 flex flex-col w-[70vw] h-[60vh] rounded-lg shadow-lg relative">
        <h2 className="text-lg font-bold mb-4">Add New Blog</h2>
        <input
            name="title"
            type="text"
            placeholder="Title"
            value={blogdata.title}
            className="w-full mb-3 p-2 border rounded focus:shadow-lg transition-shadow duration-300 ease-in-out"
            onChange={handleChange}
        />
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
        </div>
    </div>
    </>
);
``;
};

export default AddBlogModal;
