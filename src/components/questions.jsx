import React, { useEffect, useState } from "react";
import url from "../urls";

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
  const handleSubmit = event => {
    alert(libelle)
    event.preventDefault();
    var data={
        'libelle': libelle,
        'ops1': ops1,
        'ops2': ops2,
        'ops3': ops3,
        'ops4': ops4,
        'ans': ans,
    };
    fetch('http://127.0.0.1:8000/api/add/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify(data),
    })
    .then(res=>res.json())
    .then(
        (result) => {
            alert(result['message'])
            if (result['status']==='ok') {
                window.location.reload();
        }
    }
    )
}
const [libelle, setlibelle] = useState('')
const [ops1, setops1] = useState('')
const [ops2, setops2] = useState('')
const [ops3, setops3] = useState('')
const [ops4, setops4] = useState('')
const [ans, setans] = useState('')

//Update questions

  return (
    <div>
        <div>
            <label>Add question</label>
            <label>Libelle</label>
            <input type="text" onChange={(e)=>setlibelle(e.target.value)} name="libelle" value={libelle}/><br/>
            <label>Option 1</label>
            <input type="text" onChange={(e)=>setops1(e.target.value)} name="libelle" value={ops1}/><br/>
            <label>Option 2</label>
            <input type="text" onChange={(e)=>setops2(e.target.value)} name="libelle" value={ops2}/><br/>
            <label>Option 3</label>
            <input type="text" onChange={(e)=>setops3(e.target.value)} name="libelle" value={ops3}/><br/>
            <label>Option 4</label>
            <input type="text" onChange={(e)=>setops4(e.target.value)} name="libelle" value={ops4}/><br/>
            <label>Reponse </label>
            <input type="text" onChange={(e)=>setans(e.target.value)} name="libelle" value={ans}/><br/>

            <input type="submit" onClick={handleSubmit} namevalue="Valider"/>
        </div>
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
              <td>
                <label>{questions.libelle}</label><br/>
                <input type="radio" name={questions.ops1}/>
                <label>{questions.ops1}</label><br/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
