export const lessons = [
  {
    id: 0,
    title: 'Introduction to SQL',
    content: `
      <p>SQL (Structured Query Language) is a standard language for managing relational databases. In this course, you'll learn how to use SQL to query, manipulate, and manage data.</p>
      <p>Let's start with a simple SELECT statement:</p>
      <pre><code>SELECT * FROM users;</code></pre>
      <p>This query retrieves all columns (*) from the 'users' table.</p>
    `,
    initialQuery: 'SELECT * FROM users;',
    expectedResult: [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ],
  },
  {
    id: 1,
    title: 'Basic Queries: SELECT and WHERE',
    content: `
      <p>The WHERE clause is used to filter records. Let's retrieve only users with an ID greater than 1:</p>
      <pre><code>SELECT * FROM users WHERE id > 1;</code></pre>
      <p>Try modifying the query to get the expected result.</p>
    `,
    initialQuery: 'SELECT * FROM users WHERE id > 0;',
    expectedResult: [
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ],
  },
  {
    id: 2,
    title: 'Sorting Data: ORDER BY',
    content: `
      <p>The ORDER BY clause is used to sort the result-set in ascending or descending order. Let's retrieve all users sorted by their names in descending order:</p>
      <pre><code>SELECT * FROM users ORDER BY name DESC;</code></pre>
      <p>Try writing a query to sort users by their names in descending order.</p>
    `,
    initialQuery: 'SELECT * FROM users;',
    expectedResult: [
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      { id: 1, name: 'John Doe', email: 'john@example.com' },
    ],
  },
  {
    id: 3,
    title: 'Quiz: Basic Queries',
    content: `
      <p>Let's test your knowledge of basic SQL queries:</p>
      <ol>
        <li>Write a query to select all users whose name starts with 'J'.</li>
        <li>Order the results by email in ascending order.</li>
      </ol>
    `,
    initialQuery: 'SELECT * FROM users;',
    expectedResult: [
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      { id: 1, name: 'John Doe', email: 'john@example.com' },
    ],
  },
  {
    id: 4,
    title: 'Aggregating Data: COUNT, SUM, AVG',
    content: `
      <p>Aggregate functions perform calculations on a set of values and return a single result. Let's explore COUNT, SUM, and AVG:</p>
      <pre><code>SELECT COUNT(*) as user_count, AVG(id) as avg_id FROM users;</code></pre>
      <p>Try writing a query to count the number of users and calculate the average ID.</p>
    `,
    initialQuery: 'SELECT * FROM users;',
    expectedResult: [
      { user_count: 2, avg_id: 1.5 },
    ],
  },
  {
    id: 5,
    title: 'Grouping Data: GROUP BY',
    content: `
      <p>The GROUP BY statement groups rows that have the same values in specified columns. Let's add some more data and group users by their status:</p>
      <pre><code>
        INSERT INTO users (id, name, email, status) VALUES (3, 'Alice Johnson', 'alice@example.com', 'active');
        INSERT INTO users (id, name, email, status) VALUES (4, 'Bob Wilson', 'bob@example.com', 'inactive');
        SELECT status, COUNT(*) as count FROM users GROUP BY status;
      </code></pre>
      <p>Try writing a query to group users by status and count them.</p>
    `,
    initialQuery: 'SELECT * FROM users;',
    expectedResult: [
      { status: 'active', count: 3 },
      { status: 'inactive', count: 1 },
    ],
  },
  {
    id: 6,
    title: 'Joining Tables: INNER JOIN',
    content: `
      <p>Joins are used to combine rows from two or more tables based on a related column between them. Let's create a new table and perform an INNER JOIN:</p>
      <pre><code>
        CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, product TEXT, price REAL);
        INSERT INTO orders (id, user_id, product, price) VALUES (1, 1, 'Book', 15.99);
        INSERT INTO orders (id, user_id, product, price) VALUES (2, 2, 'Pen', 1.99);
        SELECT users.name, orders.product, orders.price
        FROM users
        INNER JOIN orders ON users.id = orders.user_id;
      </code></pre>
      <p>Try writing a query to join the users and orders tables.</p>
    `,
    initialQuery: 'SELECT * FROM users; SELECT * FROM orders;',
    expectedResult: [
      { name: 'John Doe', product: 'Book', price: 15.99 },
      { name: 'Jane Smith', product: 'Pen', price: 1.99 },
    ],
  },
  {
    id: 7,
    title: 'Quiz: Aggregations and Joins',
    content: `
      <p>Let's test your knowledge of aggregations and joins:</p>
      <ol>
        <li>Write a query to find the total value of orders for each user.</li>
        <li>Include the user's name and order count in the results.</li>
        <li>Order the results by total value in descending order.</li>
      </ol>
    `,
    initialQuery: 'SELECT * FROM users; SELECT * FROM orders;',
    expectedResult: [
      { name: 'John Doe', order_count: 1, total_value: 15.99 },
      { name: 'Jane Smith', order_count: 1, total_value: 1.99 },
    ],
  },
  {
    id: 8,
    title: 'Subqueries and Nested Queries',
    content: `
      <p>Subqueries are queries nested within another query. They can be used in various parts of SQL statements. Let's find users who have placed orders:</p>
      <pre><code>
        SELECT name, email
        FROM users
        WHERE id IN (SELECT DISTINCT user_id FROM orders);
      </code></pre>
      <p>Try writing a query to find users who have not placed any orders.</p>
    `,
    initialQuery: 'SELECT * FROM users; SELECT * FROM orders;',
    expectedResult: [
      { name: 'Alice Johnson', email: 'alice@example.com' },
      { name: 'Bob Wilson', email: 'bob@example.com' },
    ],
  },
  {
    id: 9,
    title: 'Modifying Data: INSERT, UPDATE, DELETE',
    content: `
      <p>Let's practice modifying data in our tables:</p>
      <ol>
        <li>Insert a new user named 'Charlie Brown' with email 'charlie@example.com' and status 'active'.</li>
        <li>Update Bob Wilson's status to 'active'.</li>
        <li>Delete the order for 'Pen'.</li>
      </ol>
      <p>After performing these operations, write a query to show all active users and their order count (if any).</p>
    `,
    initialQuery: 'SELECT * FROM users; SELECT * FROM orders;',
    expectedResult: [
      { name: 'John Doe', order_count: 1 },
      { name: 'Jane Smith', order_count: 0 },
      { name: 'Alice Johnson', order_count: 0 },
      { name: 'Bob Wilson', order_count: 0 },
      { name: 'Charlie Brown', order_count: 0 },
    ],
  },
  {
    id: 10,
    title: 'Advanced SQL: Window Functions',
    content: `
      <p>Window functions perform calculations across a set of rows that are related to the current row. Let's use them to rank users by their order total:</p>
      <pre><code>
        SELECT users.name,
               COALESCE(SUM(orders.price), 0) as total_orders,
               RANK() OVER (ORDER BY COALESCE(SUM(orders.price), 0) DESC) as rank
        FROM users
        LEFT JOIN orders ON users.id = orders.user_id
        GROUP BY users.id, users.name;
      </code></pre>
      <p>Try writing this query to rank users by their total order value.</p>
    `,
    initialQuery: 'SELECT * FROM users; SELECT * FROM orders;',
    expectedResult: [
      { name: 'John Doe', total_orders: 15.99, rank: 1 },
      { name: 'Jane Smith', total_orders: 0, rank: 2 },
      { name: 'Alice Johnson', total_orders: 0, rank: 2 },
      { name: 'Bob Wilson', total_orders: 0, rank: 2 },
      { name: 'Charlie Brown', total_orders: 0, rank: 2 },
    ],
  },
  {
    id: 11,
    title: 'Final Test: Comprehensive SQL Challenge',
    content: `
      <p>Congratulations on making it to the final test! This challenge will test your overall SQL knowledge:</p>
      <ol>
        <li>Create a new table called 'products' with columns: id, name, price, and category.</li>
        <li>Insert at least 5 products with various prices and categories.</li>
        <li>Write a query that shows each category, the number of products in that category, the average price of products in that category, and the name of the most expensive product in that category.</li>
        <li>Include categories that have no products, showing 0 for count and NULL for average price and most expensive product.</li>
        <li>Order the results by the number of products in descending order.</li>
      </ol>
      <p>This challenge combines table creation, data insertion, joins, aggregations, and window functions. Good luck!</p>
    `,
    initialQuery: 'CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL, category TEXT);',
    expectedResult: [
      { category: 'Electronics', product_count: 2, avg_price: 549.99, most_expensive: 'Smartphone' },
      { category: 'Books', product_count: 2, avg_price: 24.99, most_expensive: 'SQL Guide' },
      { category: 'Clothing', product_count: 1, avg_price: 39.99, most_expensive: 'T-shirt' },
      { category: 'Food', product_count: 0, avg_price: null, most_expensive: null },
    ],
  },
];