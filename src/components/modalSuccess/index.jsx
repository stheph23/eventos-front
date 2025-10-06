import React from 'react';

const ModalSuccess = ({ showModalSuccess, closeModalSuccess, fill, text }) => {
  if (!showModalSuccess) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full bg-black bg-opacity-50">
      <div className="w-[80%] lg:w-[33.33%] h-auto p-2 bg-white rounded-3xl shadow-lg flex flex-col  ">
        <div className='flex justify-end'>
          <button
            onClick={closeModalSuccess}
            className="rounded-md"
          >
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3378_54586)">
<path d="M8.00048 7.42876L11.3005 3.95508L12.2431 4.94736L8.94315 8.42104L12.2431 11.8947L11.3005 12.887L8.00048 9.41332L4.70048 12.887L3.75781 11.8947L7.05781 8.42104L3.75781 4.94736L4.70048 3.95508L8.00048 7.42876Z" fill="#545454"/>
</g>
<defs>
<clipPath id="clip0_3378_54586">
<rect width="16" height="16.8421" fill="white"/>
</clipPath>
</defs>
</svg>

          </button>
        </div>
        <div className='flex flex-col items-center justify-center gap-3 px-4 pb-3'>
          <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M75 0C33.5789 0 0 33.5789 0 75C0 116.423 33.5789 150 75 150C116.423 150 150 116.423 150 75C150 33.5789 116.423 0 75 0ZM75 140.773C38.8148 140.773 9.375 111.185 9.375 74.9997C9.375 38.8145 38.8148 9.37471 75 9.37471C111.185 9.37471 140.625 38.8147 140.625 74.9997C140.625 111.185 111.185 140.773 75 140.773ZM104.932 47.557L60.928 91.8375L41.1116 72.0211C39.2811 70.1906 36.3139 70.1906 34.4811 72.0211C32.6506 73.8516 32.6506 76.8187 34.4811 78.6492L57.6819 101.852C59.5124 103.68 62.4795 103.68 64.3124 101.852C64.5233 101.641 64.7039 101.412 64.868 101.173L111.565 54.1874C113.393 52.3569 113.393 49.3897 111.565 47.557C109.732 45.7266 106.765 45.7266 104.932 47.557Z"
           fill={fill}/>
          </svg>

          <p className="mb-2 text-[14px] text-center font-itcdemi">
            {text}
          </p>
        </div>
          
        </div>
      </div>
  );
};
export default ModalSuccess;
