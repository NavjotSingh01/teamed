import React, { useState } from "react";

function Questions({ triageQuestions, profile }) {
  const [choices, setChoices] = useState(
    triageQuestions.symptom_question.map((question) => ({
      question: question.pk,
      choices: [],
    }))
  );

  return (
    <div className="symptoms-listing">
      {triageQuestions.symptom_question.map((question) => (
        <div>
          <p style={{ marginTop: "10px" }}>{question.name}</p>
          <ul>
            {question.question_choices.map((choice) => (
              <li>
                <label for={choice.name} class="checkbox-custom-label">
                  <span>{choice.name}</span>
                </label>
                <input
                  type="checkbox"
                  className="checkbox-custom"
                  name={question.pk}
                  value={choice.name}
                  //   checked={choices.question
                  //     .find((o) => o.question === question.pk)
                  //     .choices.includes(choices.name)}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Questions;
