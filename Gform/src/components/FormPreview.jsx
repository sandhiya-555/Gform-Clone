import React from "react";
import { useParams } from "react-router-dom";

const FormPreview = () => {
  const { formId } = useParams(); // Get form ID from URL
  const [formData, setFormData] = React.useState(null);

  // Example: Fetch form data using the formId (Replace with real fetch logic)
  React.useEffect(() => {
    // Simulating fetching form data based on formId
    const fetchedForm = {
      title: "Sample Form",
      description: "Please fill out the form below.",
      questions: [
        {
          id: 1,
          question: "What is your name?",
          type: "short-answer",
        },
        {
          id: 2,
          question: "What are your hobbies?",
          type: "long-answer",
        },
        {
          id: 3,
          question: "Choose your favorite fruits",
          type: "multiple-choice",
          options: ["Apple", "Banana", "Orange"],
        },
      ],
    };
    setFormData(fetchedForm);
  }, [formId]);

  if (!formData) return <p>Form not found.</p>;

  return (
    <div className="form-preview p-6">
      <h1 className="text-2xl mb-4">{formData.title}</h1>
      <p>{formData.description}</p>

      {formData.questions.map((question, index) => (
        <div key={question.id} className="mt-4">
          <h3 className="text-lg font-semibold">{question.question}</h3>

          {/* Render the appropriate input based on question type */}
          {question.type === "short-answer" && (
            <input type="text" className="border px-2 py-1 mt-2 w-full" placeholder="Your answer" />
          )}
          {question.type === "long-answer" && (
            <textarea className="border px-2 py-1 mt-2 w-full" placeholder="Your answer"></textarea>
          )}
          {question.type === "multiple-choice" && (
            <div>
              {question.options.map((option, optIndex) => (
                <div key={optIndex}>
                  <input type="radio" id={`option-${optIndex}`} name={`question-${index}`} value={option} />
                  <label htmlFor={`option-${optIndex}`} className="ml-2">{option}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormPreview;
