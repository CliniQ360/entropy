// import React from 'react';

const Work = () => {
  return (
    <div className="flex flex-col mt-20 px-6 md:px-18 mb-24">
      {/* Heading */}
      <h2 className="text-4xl font-bold mb-4 pl-10 text-center md:text-left">
        The 3-P problem of Health Care Ecosystem
      </h2>
      <p className="text-lg pl-10 text-center md:text-left">
        The Tri Facto of Patient, Provider and Payor is a complex problem that
        can only be solved by an integrated product for collective incentive
        alignment
      </p>
      {/* Cards */}
      <div className="flex flex-col md:flex-row justify-center">
        {/* Card 1 */}
        <div className="bg-blue-800 text-white p-4 md:p-8 m-4 rounded-lg flex-grow md:w-auto">
          <button className="mb-2 bg-blue-300 text-white font-bold py-2 px-4 border border-blue-700 rounded-lg">
            Patient
          </button>
          <h1 className="text-xl md:text-2xl">
            Building Digital Healthcare For Bharat
          </h1>
          <ul className="mt-2 md:mt-4 text-sm md:text-base">
            <li className="pt-2"> * Lack of Technology</li>
            <li className="pt-2"> * Administrative Load</li>
            <li className="pt-2"> * Insufficient Cash Flow</li>
            <li className="pt-2"> * Lack of Longitudinal Records </li>
            <li className="pt-2"> * Lack of Trust</li>
            <li className="pt-2"> * Sack Care Model</li>
          </ul>
        </div>

        {/* Card 2 */}
        <div className="bg-blue-800 text-white p-4 md:p-8 m-4 rounded-lg flex-grow md:w-auto">
          <button className="mb-2 bg-blue-300 text-white font-bold py-2 px-4 border border-blue-700 rounded-lg">
            Provider
          </button>
          <h1 className="text-xl md:text-2xl">
            Building Digital Healthcare For Bharat
          </h1>
          <ul className="mt-2 md:mt-4 text-sm md:text-base">
            <li className="pt-2"> * Lack of Technology</li>
            <li className="pt-2"> * Administrative Load</li>
            <li className="pt-2"> * Insufficient Cash Flow</li>
            <li className="pt-2"> * Lack of Longitudinal Records </li>
            <li className="pt-2"> * Lack of Trust</li>
            <li className="pt-2"> * Sack Care Model</li>
          </ul>
        </div>

        {/* Card 3 */}
        <div className="bg-blue-800 text-white p-4 md:p-8 m-4 rounded-lg flex-grow md:w-auto">
          <button className="mb-2 bg-blue-300 text-white font-bold py-2 px-4 border border-blue-700 rounded-lg">
            Payor
          </button>
          <h1 className="text-xl md:text-2xl">
            Building Digital Healthcare For Bharat
          </h1>
          <ul className="mt-2 md:mt-4 text-sm md:text-base">
            <li className="pt-2"> * Lack of Technology</li>
            <li className="pt-2"> * Administrative Load</li>
            <li className="pt-2"> * Insufficient Cash Flow</li>
            <li className="pt-2"> * Lack of Longitudinal Records </li>
            <li className="pt-2"> * Lack of Trust</li>
            <li className="pt-2"> * Sack Care Model</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Work;

// import React from 'react';
// import { Fade, Zoom, Slide } from 'react-reveal';

// const Work = () => {
//   return (
//     <div className="flex flex-col mt-20 px-18 mb-24">
//       {/* Heading */}
//       <Fade>
//         <h2 className="text-4xl font-bold mb-4 pl-10">The 3-P problem of Health Care Ecosystem</h2>
//       </Fade>
//       <Fade>
//         <p className='text-lg pl-10'>The Tri Facto of Patient, Provider and Payor is a complex problem that can only be solved by an integrated product for collective incentive alignment</p>
//       </Fade>
//       {/* Cards */}
//       <div className="flex justify-center mt-5">
//         {/* Card 1 */}
//         <Zoom>
//           <div className="bg-blue-800 text-white p-8 m-4 rounded-lg flex-grow">
//             <button className="mb-2 bg-blue-300 text-white font-bold py-2 px-4 border border-blue-700 rounded-lg">
//               Patient
//             </button>
//             <h1 className='text-2xl'>Building Digital Healthcare For Bharat</h1>
//             <ul className='mt-2'>
//               <li className='pt-2'> * Lack of Technology</li>
//               <li className='pt-2'> * Administrative Load</li>
//               <li className='pt-2'> * Insufficient Cash Flow</li>
//               <li className='pt-2'> * Lack of Longitudinal Records </li>
//               <li className='pt-2'> * Lack of Trust</li>
//               <li className='pt-2'> * Sack Care Model</li>
//             </ul>
//           </div>
//         </Zoom>

//         {/* Card 2 */}
//         <Slide left>
//           <div className="bg-blue-800 text-white p-8 m-4 rounded-lg flex-grow">
//             <button className="mb-2 bg-blue-300 text-white font-bold py-2 px-4 border border-blue-700 rounded-lg">
//               Provider
//             </button>
//             <h1 className='text-2xl'>Building Digital Healthcare For Bharat</h1>
//             <ul className='mt-4'>
//               <li className='pt-2'> * Lack of Technology</li>
//               <li className='pt-2'> * Administrative Load</li>
//               <li className='pt-2'> * Insufficient Cash Flow</li>
//               <li className='pt-2'> * Lack of Longitudinal Records </li>
//               <li className='pt-2'> * Lack of Trust</li>
//               <li className='pt-2'> * Sack Care Model</li>
//             </ul>
//           </div>
//         </Slide>

//         {/* Card 3 */}
//         <Zoom>
//           <div className="bg-blue-800 text-white p-8 m-4 rounded-lg flex-grow">
//             <button className="mb-2 bg-blue-300 text-white font-bold py-2 px-4 border border-blue-700 rounded-lg">
//               Payor
//             </button>
//             <h1 className='text-2xl'>Building Digital Healthcare For Bharat</h1>
//             <ul className='mt-4'>
//               <li className='pt-2'> * Lack of Technology</li>
//               <li className='pt-2'> * Administrative Load</li>
//               <li className='pt-2'> * Insufficient Cash Flow</li>
//               <li className='pt-2'> * Lack of Longitudinal Records </li>
//               <li className='pt-2'> * Lack of Trust</li>
//               <li className='pt-2'> * Sack Care Model</li>
//             </ul>
//           </div>
//         </Zoom>
//       </div>
//     </div>
//   );
// };

// export default Work;

// import React from 'react';

// const Work = () => {
//   return (
//     <div className="flex flex-col mt-20 px-16 h-screen">
//       {/* Heading */}
//       <h2 className="text-4xl font-bold mb-4 ">The 3-P problem of Health Care Ecosystem</h2>
//       <p className='text-lg'>The Tri Facto of Patient, Provider and Payor is a complex problem that can only be solved by an integrated product for collective incentive allignment</p>
//       {/* Cards */}
//       <div className="flex justify-center mt-5">
//         {/* Card 1 */}
//         <div className="bg-blue-800 text-white p-8 m-4 rounded-lg flex-grow ">
//         <button class=" mb-2 bg-blue-300 text-white font-bold py-2 px-4 border border-blue-700 rounded-lg">
//             Patient
//           </button>
//           <h1 className='text-2xl '>Building Digital Healthcare For Bharat</h1>
//           <ul className='mt-2'>
//             <li className='pt-2'> * Lack of Technology</li>
//             <li className='pt-2'> * Administrative Load</li>
//             <li className='pt-2'> * Insuffient Cash Flow</li>
//             <li className='pt-2'> * Lack of Longitudional Records </li>
//             <li className='pt-2'> * Lack of Trust</li>
//             <li className='pt-2'> * Sack Care Model</li>
//           </ul>
//         </div>

//         {/* Card 2 */}

//         <div className="bg-blue-800 text-white p-8 m-4 rounded-lg flex-grow ">
//         <button class=" mb-2 bg-blue-300 text-white font-bold py-2 px-4 border border-blue-700 rounded-lg">
//             Provider
//           </button>
//           <h1 className='text-2xl'>Building Digital Healthcare For Bharat</h1>
//           <ul className='mt-4'>
//             <li className='pt-2'> * Lack of Technology</li>
//             <li className='pt-2'> * Administrative Load</li>
//             <li className='pt-2'> * Insuffient Cash Flow</li>
//             <li className='pt-2'> * Lack of Longitudional Records </li>
//             <li className='pt-2'> * Lack of Trust</li>
//             <li className='pt-2'> * Sack Care Model</li>
//           </ul>
//         </div>

//         {/* Card 3 */}
//         <div className="bg-blue-800 text-white p-8 m-4 rounded-lg flex-grow ">
//         <button class=" mb-2 bg-blue-300 text-white font-bold py-2 px-4 border border-blue-700 rounded-lg">
//             Payor
//           </button>
//           <h1 className='text-2xl'>Building Digital Healthcare For Bharat</h1>
//           <ul className='mt-4'>
//             <li className='pt-2'> * Lack of Technology</li>
//             <li className='pt-2'> * Administrative Load</li>
//             <li className='pt-2'> * Insuffient Cash Flow</li>
//             <li className='pt-2'> * Lack of Longitudional Records </li>
//             <li className='pt-2'> * Lack of Trust</li>
//             <li className='pt-2'> * Sack Care Model</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Work;
