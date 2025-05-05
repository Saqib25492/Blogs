import React from "react";

const Card = ({ post }) => {
  return (
 <div className="flex flex-col gap-1 overflow-hidden cursor-pointer bg-white border rounded-lg relative shadow-[1.95px_5px_6px_rgba(0,0,0,0.3)] hover:shadow-[0px_5px_15px_rgba(0,0,0,0.35)]">
      <div className="image_container relative h-32 overflow-hidden">
        <img
          className="absolute w-full h-full object-cover object-center"
          src={post.image}
          alt={post.title}
        />
      </div>
      <div>
        <p className="text-[0.6rem] ml-2 p-[2px] px-2 bg-yellow-400 shadow-md inline-block rounded-lg">
          {post.category}
        </p>
      </div>
      <div className="flex flex-col flex-grow">
        <h2 className="text-lg ml-2 font-bold">{post.title}</h2>
        <p className="ml-2 text-xs text-gray-600">
          {post.content.slice(0, 80)}...
        </p>
      </div>
      <div className="author flex gap-2 ml-2 text-xs items-end mt-2">
        <img
          className="h-8 w-8 rounded-full object-cover"
          src="/images/author.jpg" // Replace with dynamic author image if needed
          alt="author"
        />
        <div className="author_info">
          <h4>{post.authorName || "Author"}</h4>
          <p>{new Date(post.timePublished).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
