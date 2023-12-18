const pool = require("../db");
const queries = require("./queries");

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;

  // check email valid or not
  pool.query(queries.checkEmailIsExists, [email], (error, results) => {
    if (results.rows.length) {
      res.send("Email is already esists.");
    }

    // add student
    pool.query(
      queries.addStudent,
      [name, email, age, dob],
      (error, results) => {
        if (error) throw error;
        res.status(200).send("Student added successfully.");
      }
    );
  });
};

const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);

  // check student exists or not.
  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("Student does not found.");
    }

    pool.query(queries.deleteStudent, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Student delete successfully.");
    });
  });
};

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("Student does not found.");
    }

    pool.query(queries.updateStudent, [name, id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Student updated successfully.");
    });
  });
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  deleteStudent,
  updateStudent,
};
