'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal} from '@/redux/slices/modalSlice';


const AddBlogButton = () => {
    const dispatch = useDispatch();
    const { isOpen } = useSelector((state) => state.modal);
    const token = useSelector((state) => state.auth.token);

    




    const handleClick = () => {
        dispatch(openModal());
    };

    if (!token) return null; // Don't render the button if token is not present

    return (
        <div className="fixed bottom-4 right-12 z-50" >
            <button className="bg-gray-800 text-white text-2xl px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-200" onClick={handleClick}>
            +</button>
        </div>
    );
};

export default AddBlogButton;