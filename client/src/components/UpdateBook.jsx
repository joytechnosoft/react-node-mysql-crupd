import axios from "axios";
import { useEffect, useState } from "preact/hooks";
import { useNavigate, useParams } from "react-router-dom";
function UpdateBook() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [values, setValues] = useState({
    publisher: "",
    name: "",
    date: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting values:", values); // Log the values before submission

    axios
      .put("http://localhost:3000/update/"+id, values)
      .then((res) => {
        if (res.data.Error) {
          console.error("API Error:", res.data.Error); // Log the detailed error message
        } else {
          console.log("API Response:", res.data);
          navigate("/");
        }
      })
      .catch((err) =>
        console.error("Axios Error:", err.response ? err.response.data : err)
      );
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/getrecord/" + id)
      .then((res) =>{
        setValues({
          ...values,
          publisher: res.data[0].publisher,
          name: res.data[0].name,
          date: res.data[0].date,
        })
        console.log(res.data)
      } 
      )
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="d-flex align-items-center flex-column mt-3">
      <form className="w-50" onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <h1>Update Book</h1>
          <label htmlFor="Publisher" className="form-label">
            Publisher:
          </label>
          <input
            type="text"
            className="form-control"
            id="Publisher"
            value={values.publisher}
            onChange={(e) =>
              setValues({ ...values, publisher: e.target.value })
            }
            placeholder="Enter Publisher"
            name="publisher"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Book Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            placeholder="Enter Book Name"
            name="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            onChange={(e) => setValues({ ...values, date: e.target.value })}
            placeholder="Enter Date"
            name="date"
            value={values.date}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UpdateBook;
