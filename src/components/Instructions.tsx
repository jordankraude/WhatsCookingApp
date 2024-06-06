import React, { useEffect } from 'react';

const Instructions: React.FC = () => {
  // useEffect(() => {
  //   const handleScroll = () => {
  //     console.log('Scrolling...');
  //     const elements = document.querySelectorAll('.fade-in');
  //     console.log(elements)
  //     elements.forEach((element: Element) => {
  //       const rect = element.getBoundingClientRect();
  //       console.log(rect)
  //       const windowHeight = window.innerHeight;
  //       const offset = windowHeight - rect.top;
  //       const opacity = offset / windowHeight;
  //       (element as HTMLElement).style.opacity = `${opacity}`;
  //     });
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   console.log('Scroll event listener added.');


  // }, []);

  // basic instructions for app use for users
  return (
    <div className="fixed inset-0 overflow-y-auto bg-gray-100 p-4 z-0 h-screen text-xl pt-32">
      <p className="text-2xl text-gray-700 mb-20 mx-20 fade-out">
        Ever wonder what you're gonna have for dinner? Do you ever feel like you have no idea what you can cook with what you have in your kitchen? Well, just enter what ingredients you have lying around and we can help you find <span className='dancing-header text-2xl'>What's Cooking!</span>
      </p>
      <div className="text-center mt-72 fade-out">
        <span className="text-lg font-semibold">Scroll down to learn more!</span>
      </div>
      <div className="list-none pl-6 text-4xl fade-in h-screen">
        <h4 className="mt-40 mb-20 h-1/3 text-left"><span className="font-semibold">Step 1:</span>Enter the ingredients you have in your kitchen or a meal idea in the search bar.</h4>
        <h4 className="mt-20 mb-20 h-1/3 text-left"><span className="font-semibold">Step 2:</span>Click on the "Search" button.</h4>
        <h4 className="mt-20 mb-20 h-1/3 text-left"><span className="font-semibold">Step 3:</span>Browse through the list of recipes generated based on your ingredients or idea.</h4>
        <h4 className="mt-20 mb-20 h-1/3 text-left"><span className="font-semibold">Step 4:</span> Select a recipe to view its details and cooking instructions.</h4>
        <h4 className="mt-20 mb-20 h-1/3 text-left"><span className="font-semibold">Step 5:</span> Get Cooking!</h4>
      </div>
    </div>
  );
};

export default Instructions;
