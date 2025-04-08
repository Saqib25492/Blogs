'use client';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '@/redux/slices/modalSlice';
// import { addBlog } from '@/redux/slices/blogSlice'; // if needed


const AddBlogModal = () => {


    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.modal.isOpen);
    const [category, setCategory] = useState()


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleAddBlog = () => {
        if (title && content) {
            const newBlog = { title, content };
            console.log('New blog:', newBlog);

            // Optionally dispatch to Redux here:
            // dispatch(addBlog(newBlog));

            setTitle('');
            setContent('');
            dispatch(closeModal());
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
            <div className="modal bg-white p-6 flex flex-col w-[70vw] h-[60vh] rounded-lg shadow-lg relative">
                <h2 className="text-lg font-bold mb-4">Add New Blog</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mb-3 p-2 border rounded"
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full mb-3 p-2 border rounded"
                    rows={5}
                />
            
                <div className='flex gap-5 justify-between' >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                console.log('Selected image:', file);
                            }
                        }}
                        className="w-full mb-3 p-2 border rounded"
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full mb-3 p-2 border rounded"
                    >
                        <option value="" disabled>Select Category</option>
                        <option value="technology">Technology</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="education">Education</option>
                        <option value="health">Health</option>
                        <option value="travel">Travel</option>
                    </select>
                </div>
            
                <div className="flex justify-end space-x-2">
            <button onClick={handleAddBlog} className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Blog
            </button>
            <button onClick={() => dispatch(closeModal())} className="bg-gray-300 px-4 py-2 rounded">
                Cancel
            </button>
        </div>

            </div>

        </div>
    );``
};

export default AddBlogModal;
