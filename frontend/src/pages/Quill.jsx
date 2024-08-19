// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.bubble.css'; 
// import 'app.css'

// const MyComponent = () => {
//   const [value, setValue] = useState('');

//   const modules = {
//     toolbar: [
//       [{ 'header': [1, 2, 3, 4, false] }],
//       ['bold', 'italic', 'underline','strike', 'blockquote'],
//       [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
//       ['link', 'image'],
//       ['clean']
//     ],
//   };

//   const formats = [
//     'header',
//     'bold', 'italic', 'underline', 'strike', 'blockquote',
//     'list', 'bullet', 'indent',
//     'link', 'image'
//   ];

//   return (
//     <div>
//         {value}
//       <ReactQuill 
//         value={value} 
//         onChange={setValue} 
//         modules={modules}
//         formats={formats}
//       />
//     </div>
//   );
// };

// export default MyComponent;
