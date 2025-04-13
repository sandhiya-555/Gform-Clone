import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";  // For generating unique IDs

const FormBuilder = () => {
  const [form, setForm] = useState([]);

  // Add a new question to the form
  const addQuestion = () => {
    setForm([
      ...form,
      {
        id: uuidv4(), // Unique ID for each question
        question: "",
        type: "short-answer", // Default question type
        options: [], // Options for multiple-choice or checkbox
      },
    ]);
  };

  // Handle changes in the question text
  const handleQuestionChange = (index, value) => {
    const updatedForm = [...form];
    updatedForm[index].question = value;
    setForm(updatedForm);
  };

  // Handle changes in the question type
  const handleQuestionTypeChange = (index, value) => {
    const updatedForm = [...form];
    updatedForm[index].type = value;
    updatedForm[index].options = []; // Clear options if question type changes
    setForm(updatedForm);
  };

  // Handle changes in the options (for multiple-choice or checkbox)
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedForm = [...form];
    updatedForm[questionIndex].options[optionIndex] = value;
    setForm(updatedForm);
  };

  // Add an option to a question
  const addOption = (questionIndex) => {
    const updatedForm = [...form];
    updatedForm[questionIndex].options.push(""); // Add empty option
    setForm(updatedForm);
  };

  // Remove an option from a question
  const removeOption = (questionIndex, optionIndex) => {
    const updatedForm = [...form];
    updatedForm[questionIndex].options.splice(optionIndex, 1); // Remove the option
    setForm(updatedForm);
  };

  // Remove a question
  const removeQuestion = (index) => {
    const updatedForm = [...form];
    updatedForm.splice(index, 1); // Remove the question at the specified index
    setForm(updatedForm);
  };

  return (
    <div className="form-builder p-6">
      <h1 className="text-2xl mb-4">Create Your Form</h1>

      {/* Add Question Button */}
      <button
        onClick={addQuestion}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Question
      </button>

      {/* Render all the questions */}
      {form.map((question, index) => (
        <div key={question.id} className="border-b mb-4 p-4">
          {/* Question input */}
          <input
            type="text"
            value={question.question}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            className="border px-2 py-1 w-full"
            placeholder="Enter question"
          />

          {/* Question type dropdown */}
          <select
            value={question.type}
            onChange={(e) => handleQuestionTypeChange(index, e.target.value)}
            className="border px-2 py-1 mt-2"
          >
            <option value="short-answer">Short Answer</option>
            <option value="long-answer">Long Answer</option>
            <option value="multiple-choice">Multiple Choice</option>
            <option value="checkbox">Checkbox</option>
            <option value="file-upload">File Upload</option>
            <option value="date">Date</option>
            <option value="time">Time</option>
            <option value="rating">Rating</option>
          </select>

          {/* Add options for multiple-choice or checkbox */}
          {["multiple-choice", "checkbox"].includes(question.type) && (
            <div>
              {question.options.map((option, optIndex) => (
                <div key={optIndex} className="flex items-center gap-2 my-1">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                    className="border px-2 py-1 w-full"
                    placeholder={`Option ${optIndex + 1}`}
                  />
                  <button
                    onClick={() => removeOption(index, optIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑️
                  </button>
                </div>
              ))}
              <button
                onClick={() => addOption(index)}
                className="mt-2 text-blue-500 hover:text-blue-700"
              >
                Add Option
              </button>
            </div>
          )}

          {/* Remove Question button */}
          <button
            onClick={() => removeQuestion(index)}
            className="mt-4 text-red-500 hover:text-red-700"
          >
            Remove Question
          </button>
        </div>
      ))}
    </div>
  );
};

export default FormBuilder;
