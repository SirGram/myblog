const mockData = {
  entries: [
    {
      id: 1,
      author: {
        name: "John Doe",
        image: "https://via.placeholder.com/150",
        registrationDate: new Date("2023-10-15"), // Registration date for John Doe
        about: "I like using JavaScript and exploring new technologies.", // Comment about John Doe
      },
      date: new Date("2024-05-28"),
      likes: 10,
      visits: 50,
      published:true,
      comments: [
        { id: 1, author: "Alice", content: "Great post!" },
        { id: 2, author: "Bob", content: "I learned a lot from this." },
      ],
      title: "Understanding JavaScript Closures",
      image: "https://via.placeholder.com/150",
      content: `
  Welcome to my blog post. Here is some content written in **Markdown**.  \n &nbsp;
  
  Closures are a fundamental concept in JavaScript, allowing functions to retain access to variables from their containing scope even after the outer function has finished executing.
  \n &nbsp;
  
  \`\`\`javascript
  function outer() {
    let counter = 0;
    function inner() {
      counter++;
      console.log(counter);
    }
    return inner;
  }
  const increment = outer();
  increment(); // 1
  increment(); // 2
  \`\`\`
  \n &nbsp;

  This can be very powerful for maintaining state in asynchronous operations and event handlers.
      `,
    },
    {
      id: 2,
      author: {
        name: "Jane Smith",
        image: "https://via.placeholder.com/150",
        registrationDate: new Date("2023-09-20"), // Registration date for Jane Smith
        about: "I'm passionate about front-end development and UI/UX design.", // Comment about Jane Smith
      },
      date: new Date("2024-05-25"),
      likes: 15,
      visits: 60,
      comments: [
        { id: 1, author: "Charlie", content: "Nice article!" },
        { id: 2, author: "David", content: "Keep up the good work." },
      ],published:true,
      title: "Exploring CSS Grid Layout",
      image: "https://via.placeholder.com/150",
      content: `

  
  
  CSS Grid Layout is a powerful layout system available in CSS. It allows you to create complex layouts using a grid-based approach.
  \n &nbsp;
  \`\`\`css
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  .item {
    background-color: #ddd;
    padding: 20px;
    text-align: center;
  }
  \`\`\`
  \n &nbsp;

  By using CSS Grid, you can achieve responsive and flexible designs with minimal effort.
      `,
    },
    {
      id: 3,
      author: {
        name: "Alice Johnson",
        image: "https://via.placeholder.com/150",
        registrationDate: new Date("2024-01-05"), // Registration date for Alice Johnson
        about: "I'm a full-stack developer with a passion for open-source projects.", // Comment about Alice Johnson
      },published:true,
      date: new Date("2024-06-01"),
      likes: 20,
      visits: 70,
      comments: [
        { id: 1, author: "Eve", content: "Very informative!" },
        { id: 2, author: "Frank", content: "I appreciate the examples." },
      ],
      title: "Getting Started with React Hooks",
      image: "https://via.placeholder.com/150",
      content: `

  In this post, we'll dive into React Hooks and how they can simplify your React code.
  \n &nbsp;

  Hooks are functions that let you use state and other React features without writing a class.
  \n &nbsp;

  \`\`\`jsx
  import React, { useState, useEffect } from 'react';
  
  function Example() {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      document.title = \`You clicked \${count} times\`;
    }, [count]);
    
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }
  \`\`\`
  \n &nbsp;

  Hooks provide a more direct API to the React concepts you already know and love.
      `,
    },
    {
      id: 4,
      author: {
        name: "Bob Williams",
        image: "https://via.placeholder.com/150",
        registrationDate: new Date("2024-02-15"), // Registration date for Bob Williams
        about: "I'm a backend developer who enjoys building scalable systems.", // Comment about Bob Williams
      },published:false,
      date: new Date("2024-05-20"),
      likes: 12,
      visits: 45,
      comments: [
        { id: 1, author: "George", content: "Great insights!" },
        { id: 2, author: "Hannah", content: "This is really helpful." },
      ],
      title: "Understanding Asynchronous JavaScript",
      image: "https://via.placeholder.com/150",
      content: `
  
  Asynchronous JavaScript can be tricky, but it's essential for modern web development.
  \n &nbsp;

  Promises and async/await make it easier to work with asynchronous code.
  \n &nbsp;

  \`\`\`javascript
  function fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Data fetched');
      }, 2000);
    });
  }
  
  async function getData() {
    const data = await fetchData();
    console.log(data);
  }
  
  getData();
  \`\`\`
  \n &nbsp;

  By understanding these concepts, you can write more efficient and readable asynchronous code.
      `,
    },
    {
      id: 5,
      author: { name: "Charlie Brown", image: "https://via.placeholder.com/150", registrationDate: new Date("2024-03-10"), about: "I'm a frontend developer passionate about creating beautiful user interfaces."},
      date: new Date("2024-06-10"),
      likes: 18,
      visits: 80,
      comments: [
        { id: 1, author: "Isla", content: "This article is fantastic!" },
        { id: 2, author: "Jack", content: "I learned a lot, thanks!" },
      ],published:true,
      title: "Mastering Flexbox for Responsive Design",
      image: "https://via.placeholder.com/150",
      content: `

  Flexbox is a powerful tool for creating responsive layouts with CSS.
  \n &nbsp;

  \`\`\`css
  .container {
    display: flex;
    justify-content: space-between;
  }
  .item {
    background-color: #f4f4f4;
    padding: 10px;
    margin: 5px;
  }
  \`\`\`
  \n &nbsp;

  By mastering Flexbox, you can build flexible and responsive designs with ease.
      `,
    },
    {
      id: 6,
      author: {
        name: "Diane Evans",
        image: "https://via.placeholder.com/150",
        registrationDate: new Date("2023-12-01"), // Registration date for Diane Evans
        about: "I'm a software engineer who enjoys working on both frontend and backend technologies.", // Comment about Diane Evans
      },published:false,
      date: new Date("2024-06-15"),
      likes: 22,
      visits: 90,
      comments: [
        { id: 1, author: "Liam", content: "Very well explained!" },
        { id: 2, author: "Mia", content: "Thanks for sharing this." },
      ],
      title: "Building a RESTful API with Node.js",
      image: "https://via.placeholder.com/150",
      content: `

  In this guide, we'll build a RESTful API using Node.js and Express.
  \n &nbsp;

  \`\`\`javascript
  const express = require('express');
  const app = express();
  const port = 3000;
  
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  
  app.listen(port, () => {
    console.log(\`Server running on port \${port}\`);
  });
  \`\`\`
  \n &nbsp;
  
  
  This setup will get you started with building scalable APIs in Node.js.
      `,
    },
  ],
};

export default mockData;
