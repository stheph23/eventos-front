import React from 'react';

const ModalAlertWarning = ({ showModalAlertWarning, closeModal, error, accept = closeModal}) => {
  if (!showModalAlertWarning) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full bg-black bg-opacity-50">
      <div className="lg:w-[23.33%] w-[85%] h-auto bg-white rounded-3xl shadow-lg flex flex-col pb-4  ">
        <div className='flex justify-end'>
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-md"
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
        <div className='flex flex-col items-center justify-center gap-3 p-4 px-8'>
            <svg width="35" height="31" viewBox="0 0 35 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.447661 26L14.5637 2.43403C14.8609 1.94437 15.2793 1.53955 15.7785 1.25861C16.2777 0.977665 16.8408 0.830078 17.4137 0.830078C17.9865 0.830078 18.5496 0.977665 19.0488 1.25861C19.548 1.53955 19.9664 1.94437 20.2637 2.43403L34.3797 26C34.6705 26.5041 34.8243 27.0755 34.8259 27.6575C34.8274 28.2394 34.6766 28.8117 34.3884 29.3173C34.1002 29.8228 33.6847 30.2442 33.1832 30.5394C32.6816 30.8346 32.1116 30.9934 31.5297 31H3.29766C2.7155 30.994 2.14507 30.8356 1.6432 30.5405C1.14133 30.2454 0.725537 29.824 0.437234 29.3182C0.148932 28.8124 -0.00181302 28.2399 1.64559e-05 27.6577C0.00184594 27.0756 0.156186 26.504 0.447661 26ZM17.4137 10C17.9441 10 18.4528 10.2107 18.8279 10.5858C19.2029 10.9609 19.4137 11.4696 19.4137 12V18C19.4137 18.5305 19.2029 19.0392 18.8279 19.4142C18.4528 19.7893 17.9441 20 17.4137 20C16.8832 20 16.3745 19.7893 15.9994 19.4142C15.6244 19.0392 15.4137 18.5305 15.4137 18V12C15.4137 11.4696 15.6244 10.9609 15.9994 10.5858C16.3745 10.2107 16.8832 10 17.4137 10ZM15.4137 24C15.4137 23.4696 15.6244 22.9609 15.9994 22.5858C16.3745 22.2107 16.8832 22 17.4137 22H17.4297C17.9601 22 18.4688 22.2107 18.8439 22.5858C19.2189 22.9609 19.4297 23.4696 19.4297 24C19.4297 24.5305 19.2189 25.0392 18.8439 25.4142C18.4688 25.7893 17.9601 26 17.4297 26H17.4137C16.8832 26 16.3745 25.7893 15.9994 25.4142C15.6244 25.0392 15.4137 24.5305 15.4137 24Z" fill="#CA2D00"/>
            </svg>

            <div className='flex flex-col gap-4'>
              <p className="text-sm text-center font-itcdemi">
                {error}
              </p>
              <button
              onClick={accept}
               className='text-sm underline font-itcbold text-blue '>
                Aceptar
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};
export default ModalAlertWarning;
