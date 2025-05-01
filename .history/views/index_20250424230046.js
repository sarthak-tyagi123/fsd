<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Centered Page</title>
  
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body, html {
      height: 100%;
      font-family: Arial, sans-serif;
      background-color: #f0f2f5;
    }

    .center-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      text-align: center;
    }

    h1 {
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 20px;
    }

    a {
      text-decoration: none;
      color: white;
      background-color: #4a90e2;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 1.1rem;
      transition: background-color 0.3s ease;
    }

    a:hover {
      background-color: #357ab8;
    }

  </style>



</head>
<body>
  <div class="center-container">
    <h1>Welcome to the Chat</h1>
    <a href="/chat">Start Chat</a>
  </div>
</body>
</html>


