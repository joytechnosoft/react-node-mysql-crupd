import axios from "axios";
import { useEffect, useState } from "preact/hooks";
import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
function Books() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container mt-5">
       <Link to={"/create"} className="btn btn-success">Create Book </Link>
      {books.length !==0 ? 
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Publisher</th>
              <th scope="col">Book Name</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.publisher}</td>
                <td>{book.name}</td>
                <td>{book.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
       : (
        <h2 className="">No Records </h2>
      )}
    </div>
  );
}

export default Books;
