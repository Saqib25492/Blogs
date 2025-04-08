import React from "react";

const Card = () => {
  return (
    <div className="card_container grid grid-cols-autofill gap-4 p-5 bg-gray-200 shadow-[0px_5px_15px_rgba(0,0,0,0.35)] rounded-md w-[70vw] mx-auto mt-4 ">
      <div className="flex flex-col gap-1 overflow-hidden cursor pointer bg-white border rounded-lg relative shadow-[1.95px_5px_6px_rgba(0, 0, 0, 0.3)] hover:shadow-[0px_5px_15px_rgba(0,0,0,0.35)]">
        <div className="image_container relative h-32 overflow-hidden">
          <img
            className="absolute w-full h-full object-cover
                    object-center"
            src="../images/P1.jpg"
            alt="Blog image"
          />
        </div>
        <div>
          <p className="text-[0.6rem] ml-2 p-[2px] px-2 bg-yellow-400 shadow-[rgba(50,50,93,0.25)_0px_50px_100px_-20px,rgba(0,0,0,0.3)_0px_30px_60px_-30px,rgba(10,37,64,0.35)_0px_-2px_6px_0px_inset]  inline-block rounded-lg">
            Category
          </p>
        </div>
        <div className="flex flex-col flex-grow">
          <h2 className="text-lg ml-2 font-bold">Title of the card</h2>
          <p className="ml-2 text-xs text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="author flex gap-2 ml-2 text-xs items-end">
          <img className="h-8 rounded-full overflow-hidden" src="../images/author.jpg" alt="author" />
          <div className="author_info">
            <h4>Author</h4>
            <p>Time Posted</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 overflow-hidden cursor pointer bg-white border rounded-lg relative shadow-[1.95px_5px_6px_rgba(0, 0, 0, 0.3)] hover:shadow-[0px_5px_15px_rgba(0,0,0,0.35)]">
        <div className="image_container relative h-32 overflow-hidden">
          <img
            className="absolute w-full h-full object-cover
                    object-center"
            src="../images/P1.jpg"
            alt="Blog image"
          />
        </div>
        <div>
          <p className="text-[0.6rem] ml-2 p-[2px] px-2 bg-yellow-400 shadow-[rgba(50,50,93,0.25)_0px_50px_100px_-20px,rgba(0,0,0,0.3)_0px_30px_60px_-30px,rgba(10,37,64,0.35)_0px_-2px_6px_0px_inset]  inline-block rounded-lg">
            Category
          </p>
        </div>
        <div className="flex flex-col flex-grow">
          <h2 className="text-lg ml-2 font-bold">Title of the card</h2>
          <p className="ml-2 text-xs text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="author flex gap-2 ml-2 text-xs items-end">
          <img className="h-8 rounded-full overflow-hidden" src="../images/author.jpg" alt="author" />
          <div className="author_info">
            <h4>Author</h4>
            <p>Time Posted</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 overflow-hidden cursor pointer bg-white border rounded-lg relative shadow-[1.95px_5px_6px_rgba(0, 0, 0, 0.3)] hover:shadow-[0px_5px_15px_rgba(0,0,0,0.35)]">
        <div className="image_container relative h-32 overflow-hidden">
          <img
            className="absolute w-full h-full object-cover
                    object-center"
            src="../images/P1.jpg"
            alt="Blog image"
          />
        </div>
        <div>
          <p className="text-[0.6rem] ml-2 p-[2px] px-2 bg-yellow-400 shadow-[rgba(50,50,93,0.25)_0px_50px_100px_-20px,rgba(0,0,0,0.3)_0px_30px_60px_-30px,rgba(10,37,64,0.35)_0px_-2px_6px_0px_inset]  inline-block rounded-lg">
            Category
          </p>
        </div>
        <div className="flex flex-col flex-grow">
          <h2 className="text-lg ml-2 font-bold">Title of the card</h2>
          <p className="ml-2 text-xs text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="author flex gap-2 ml-2 text-xs items-end">
          <img className="h-8 rounded-full overflow-hidden" src="../images/author.jpg" alt="author" />
          <div className="author_info">
            <h4>Author</h4>
            <p>Time Posted</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 overflow-hidden cursor pointer bg-white border rounded-lg relative shadow-[1.95px_5px_6px_rgba(0, 0, 0, 0.3)] hover:shadow-[0px_5px_15px_rgba(0,0,0,0.35)]">
        <div className="image_container relative h-32 overflow-hidden">
          <img
            className="absolute w-full h-full object-cover
                    object-center"
            src="../images/P1.jpg"
            alt="Blog image"
          />
        </div>
        <div>
          <p className="text-[0.6rem] ml-2 p-[2px] px-2 bg-yellow-400 shadow-[rgba(50,50,93,0.25)_0px_50px_100px_-20px,rgba(0,0,0,0.3)_0px_30px_60px_-30px,rgba(10,37,64,0.35)_0px_-2px_6px_0px_inset]  inline-block rounded-lg">
            Category
          </p>
        </div>
        <div className="flex flex-col flex-grow">
          <h2 className="text-lg ml-2 font-bold">Title of the card</h2>
          <p className="ml-2 text-xs text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="author flex gap-2 ml-2 text-xs items-end">
          <img className="h-8 rounded-full overflow-hidden" src="../images/author.jpg" alt="author" />
          <div className="author_info">
            <h4>Author</h4>
            <p>Time Posted</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 overflow-hidden cursor pointer bg-white border rounded-lg relative shadow-[1.95px_5px_6px_rgba(0, 0, 0, 0.3)] hover:shadow-[0px_5px_15px_rgba(0,0,0,0.35)]">
        <div className="image_container relative h-32 overflow-hidden">
          <img
            className="absolute w-full h-full object-cover
                    object-center"
            src="../images/P1.jpg"
            alt="Blog image"
          />
        </div>
        <div>
          <p className="text-[0.6rem] font-serif ml-2 p-[2px] px-2 bg-yellow-400 shadow-[rgba(50,50,93,0.25)_0px_50px_100px_-20px,rgba(0,0,0,0.3)_0px_30px_60px_-30px,rgba(10,37,64,0.35)_0px_-2px_6px_0px_inset]  inline-block rounded-lg">
            Category
          </p>
        </div>
        <div className="flex flex-col flex-grow">
          <h2 className="text-lg ml-2 font-bold">Title of the card</h2>
          <p className="ml-2 text-xs text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="author flex gap-2 ml-2 text-xs items-end">
          <img className="h-8 rounded-full overflow-hidden" src="../images/author.jpg" alt="author" />
          <div className="author_info">
            <h4>Author</h4>
            <p>Time Posted</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Card;
