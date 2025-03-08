"use client";

// import React from 'react';

// const page: React.FC = () => {
//   const pdfUrl = 'docs/모여봐요개인정보처리방침_v2.pdf';

//   return (
//     <div className="h-screen flex justify-center items-center bg-gray-50">
//       <iframe
//         src={pdfUrl}
//         title="Privacy Policy"
//         className="w-full h-full border-0"
//       />
//     </div>
//   );
// };

// export default page;

import React from "react";

const Page: React.FC = () => {
  const pdfUrl = "/docs/모여봐요개인정보처리방침_v2.pdf";

  return (
    <div className="h-screen flex justify-center items-center bg-gray-50">
      <button
        onClick={() => window.open(pdfUrl, "_blank")}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md"
      >
        개인정보처리방침 보기
      </button>
    </div>
  );
};

export default Page;