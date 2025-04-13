import { useState } from 'react'
import './App.css'

function App() {

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [questions, setQuestions] = useState([]);
  const [Tready, setTready] = useState(false);
  const [Dready, setDready] = useState(false);

  const handleTitle = (event) =>{
    setTitle(event.target.value)
  }

  const handleDesc = (event) => {
    setDesc(event.target.value)
  }

  const AddQuestion = () =>{

    const newQues = {
      id : Date.now(),
      text : '',
      type: 'short-answer',
      options: []
    };
    
    setQuestions([...questions, newQues]);
  };

  const handleAddQues = (index, event) =>{

    const updatedQues = [...questions];
    updatedQues[index].text = event.target.value;

    setQuestions(updatedQues);
    }

    const handleTypeChange = (index, event) =>{

      const updatedQues = [...questions];
      updatedQues[index].type = event.target.value;

      if(
        ['multiple-choice', 'check-box', 'dropdown'].includes(event.target.value)
      ){
        updatedQues[index].options = [''];
      }
      else{
        updatedQues[index].options = [];
      }
  
      setQuestions(updatedQues);
      }

      const handleOptions = (qindex, optIndex, event) => {
        const updatedQues = [...questions];
        updatedQues[qindex].options[optIndex] = event.target.value;
        setQuestions(updatedQues);
      }

  const AddOption = (qIndex) => {
    const updatedQues = [...questions];
    updatedQues[qIndex].options.push('');
    setQuestions(updatedQues);
  }

  const removeQues = (index) => {
    const updatedQues = [...questions];
    updatedQues.splice(index,1);
    setQuestions(updatedQues);
  }

  const removeOpt = (qIndex, optIndex) => {
    const updatedQues = [...questions];
    updatedQues[qIndex].options.splice(optIndex, 1);
    setQuestions(updatedQues);
  }

  return (
    <>
      <div>
        <h2>Create a Simple form</h2>
        <form> 
          { !Tready ? (
            <>
            <input
          type = "text"
          value = {title}
          placeholder='Enter the title for the form'
          onChange={handleTitle}
       
          />  

          <button type='button' onClick={() => setTready(true)}>Done</button>
          </> )
        : (
        <h3>{title }</h3>
        )
        }
        <br />
      
      { !Dready ? (
        <>
        <input 

        type='text'
        value = {desc}
        placeholder='Enter short description about form'
        onChange={handleDesc}
       
        />

        <button type='button' onClick={() => setDready(true)}>Done</button>
        </>
       )  

       : (

        <h4>{desc}</h4>
      )
      }
        
        <br /> 

        <button type='button' onClick={AddQuestion}>Add Question</button>
      
        <br /> 

        {questions.map((question,index) => (
          <div key={question.id}>
            <input
            type='text'
            placeholder={`Enter question ${index+1}`}
            value={question.text}
            onChange={(e) => handleAddQues(index,e)}
            />

         <select 
         value={question.type}
         onChange={(e) => handleTypeChange(index,e)}
         >
          <option value= "multiple-choice">Multiple Choice</option>
          <option value= "check-box">Check-box</option>
          <option value= "short-answer">Short Answer</option>
          <option value= "long-answer">Long Answer</option>
          <option value= "date">Date</option>
          <option value= "time">Time</option>
          <option value= "file">File Upload</option>
          <option value= "email">Email</option>
        </select>

        <button type='button' onClick={() => removeQues(index)}><b>-</b></button>
         <br />
        
        {['multiple-choice', 'check-box', 'dropdown'].includes(question.type) && (

          <div> 
            {question.options.map((opt, optIndex) => 
            <div key={optIndex}>
              {question.type == 'multiple-choice' && <input type='radio' />}
              {question.type == 'check-box' && <input type='checkbox' />}

              <input 
              type = "text"
              placeholder=  {`Option ${optIndex + 1}`}
              value={opt}
              onChange={(e) => handleOptions(index, optIndex, e)}
              />

<button type='button' onClick={() => removeOpt(index, optIndex)} ><b>-</b></button>
              </div>
              
            )}

            <button type='button' onClick={() => AddOption(index)}> Add Option</button>
            
            </div>
        )}

        {question.type == 'short-answer' && (
          <input type='text' placeholder='Short Answer' />
        )}

        {question.type == 'long-answer' && (
          <textarea placeholder='Long Answer' />
        )}

       {question.type == 'email' && (
          <textarea placeholder='Enter your Email' />
        )}

        {question.type == 'dropdown' && (
          <select>
            <option>Select</option>
            {question.options.map((opt,i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        )}

        {question.type == 'date' && <input type='date' />}
        {question.type == 'time' && <input type='time' />}
        {question.type == 'file' && <input type='file' />}        

          </div>
        ))} <br />

          <button type='submit'>Submit</button>
 
        </form>
      </div>
    </>
  )
}

export default App






