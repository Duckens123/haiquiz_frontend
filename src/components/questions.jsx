import React, { useEffect, useState } from "react";
import url from "../urls";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Question() {
  const urllink = url;
  const [questions, setquestions] = useState([]);
  useEffect(() => {
    QuestionGet();
  }, []);

  const QuestionGet = () => {
    fetch("http://127.0.0.1:8000/api/all/", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setquestions(result);
      });
  };

  //Add Question
  const handleSubmit = (event) => {
    alert(libelle);
    event.preventDefault();
    var data = {
      libelle: libelle,
      ops1: ops1,
      ops2: ops2,
      ops3: ops3,
      ops4: ops4,
      ans: ans,
    };
    fetch("http://127.0.0.1:8000/api/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result["message"]);
        if (result["status"] === "ok") {
          window.location.reload();
        }
      });
  };
  const [libelle, setlibelle] = useState("");
  const [ops1, setops1] = useState("");
  const [ops2, setops2] = useState("");
  const [ops3, setops3] = useState("");
  const [ops4, setops4] = useState("");
  const [ans, setans] = useState("");

  //Update questions

  return (
    <div class="col-md-12 row d-flex justify-content-center">
      <div className="col-md-6">
        <label class="col-md-12 text-center">Ajouter question</label>
        <label>Question</label>
        <input
          className="form-control"
          type="text"
          onChange={(e) => setlibelle(e.target.value)}
          name="libelle"
          value={libelle}
        />
        <div class="row d-flex col-md-12 justify-content-between">
          <div class="col-md-6">
            <label>Option 1</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setops1(e.target.value)}
              name="libelle"
              value={ops1}
            />
          </div>
          <div class="col-md-6">
            <label>Option 2</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setops2(e.target.value)}
              name="libelle"
              value={ops2}
            />
          </div>
        </div>
        <div class="row d-flex col-md-12 justify-content-between">
          <div class="col-md-6">
            {" "}
            <label>Option 3</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setops3(e.target.value)}
              name="libelle"
              value={ops3}
            />
          </div>
          <div class="col-md-6">
            <label>Option 4</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setops4(e.target.value)}
              name="libelle"
              value={ops4}
            />
          </div>
        </div>
        <label>Reponse </label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setans(e.target.value)}
          name="libelle"
          value={ans}
        />
        <br />

        <input
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary mt-2"
          value="Ajouter"
        />
      </div>
      <div>
        <label>Liste of questions</label>
        <table>
          <thead>
            <tr>
              <th>Questions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((questions) => (
              <tr key={questions.id}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    {questions.libelle}
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value={questions.ops1}
                      control={<Radio />}
                      label={questions.ops1}
                    />
                    <FormControlLabel
                      value={questions.ops2}
                      control={<Radio />}
                      label={questions.ops2}
                    />
                    <FormControlLabel
                      value={questions.ops3}
                      control={<Radio />}
                      label={questions.ops3}
                    />
                    <FormControlLabel
                      value={questions.ops4}
                      control={<Radio />}
                      label={questions.ops4}
                    />
                  </RadioGroup>
                </FormControl>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
