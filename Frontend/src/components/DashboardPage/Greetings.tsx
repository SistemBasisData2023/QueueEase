import React from 'react';

function Greetings() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-y-2 left-1/4 transform -translate-x-1/4 z-10 p-14 mt-[-3rem] text-white font-bold">
      <div className="text-xl mb-4" style={{ opacity: 0.3 }}>
        {currentDate}
      </div>
      <div className="text-2xl mt-[-1rem]">Hello Ngab, Good Morning!</div>
    </div>
  );
}

export default Greetings;
