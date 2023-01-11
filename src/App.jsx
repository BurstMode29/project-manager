import "./App.css";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useState, useEffect } from "react";

function App() {


  const LeftPanel = () => {

    function Upload() {
     const x = document.getElementById("box");

      if (x.style.display === "none") {
        x.style.display = "initial"
      } else {
        x.style.display = "none"
      }
    }

    return (
      <div className="leftPanel">
        <div>
              <div className="myName"><i class="fa-solid fa-compass-drafting"></i>RAFEEQ WEIDEMAN</div>
        <table className="leftTable">
          <tr>
            <td><button onClick={Upload}>Upload</button><i class="fa-solid fa-folder-plus"></i></td>
          </tr>
          <tr>
            <td><button>Delete</button><i class="fa-sharp fa-solid fa-trash"></i></td>
          </tr>
          <tr>
            <td><button>Edit</button><i class="fa-solid fa-pen-to-square"></i></td>
          </tr>
        </table>
        </div> 
      </div>
    )
  };

  const RightPanel = () => {
    // Read Data
    const [project, setProject] = useState([]);

    const fetchData = async () => {

      await getDocs(collection(db, "projects"))

        .then((querySnapshot) => {
          const newData = querySnapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }));
          setProject(newData);
        })
    };

    useEffect(() => {
      fetchData();
    })

    // Delete Data
    const deleteProject = (id) => {
      console.log(id);
      console.log();
      deleteDoc(doc(db, "projects", id))
      .then(() => {
        console.log("file deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
    }
    return (
      <div className="rightPanel">
        <div className="rightHead">PROJECTS</div>
         <div className="line"></div>
        <table className="projectsTable">
          <thead>
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
          </thead>
          <tbody>
            {
              project?.map((data, i) => (
                <tr key={i}>
                  <td>{data.name}</td>
                  <td>{data.description}</td>
                  <td>{data.type}</td>
                  <td><button key={i} onClick={() => deleteProject(data.id)}><i class="fa-sharp fa-solid fa-trash"></i></button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }

  // Add Data
  const [name, setName] = useState('');
  const [description, setDes] = useState('');
  const [type, setType] = useState('');

  const addProject = async (e) => {
    e.preventDefault(e)
    if (name === '') {
      alert('please complete fields')
      return
    }
    await addDoc(collection(db, 'projects'), {
      name: name,
      description: description,
      type: type
    })
    setName('');
    setDes('');
    setType('');
  }



  return (
    <div className="container">
      <LeftPanel />
      <RightPanel />
      <div id="box" className="box">
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Project Name" />
        <input value={description} onChange={(e) => setDes(e.target.value)} type="text" placeholder="Description" />
        <input value={type} onChange={(e) => setType(e.target.value)} type="text" placeholder="Type" /><br></br>
        <button type="submit" onClick={addProject}>Add Project</button>
      </div>
    </div>
  );
}

export default App;
