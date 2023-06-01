import React from 'react';

function Rectangles() {
  return (
    <div className="fixed inset-y-0 left-1/3 transform -translate-x-1/3 z-10 p-14 mt-9">
      <div className="flex">
        <div className="w-1/4">
          <div className="rounded-md bg-red-500 p-4">
            <div className="text-white font-bold">To be fulfilled</div>
            <div className="text-white text-4xl font-bold">52</div>
          </div>
        </div>
        <div className="w-1/4">
          <div className="rounded-md bg-green-500 p-4">
            <div className="text-white font-bold">To be fulfilled</div>
            <div className="text-white text-4xl font-bold">21</div>
          </div>
        </div>
        <div className="w-1/4">
          <div className="rounded-md bg-blue-500 p-4">
            <div className="text-white font-bold">To be fulfilled</div>
            <div className="text-white text-4xl font-bold">13</div>
          </div>
        </div>
        <div className="w-1/4">
          <div className="rounded-md bg-purple-500 p-4">
            <div className="text-white font-bold">To be fulfilled</div>
            <div className="text-white text-4xl font-bold">5</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rectangles;
