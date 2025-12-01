import { useState } from "react";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";

export default function Quiz({ quiz }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleChange = (index, value) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = () => {
    let s = 0;
    quiz.forEach((q, i) => {
      if (answers[i] === q.answer) {
        s++;
      }
    });
    setScore(s);
    setSubmitted(true);
  };

  const handleRetry = () => {
    setAnswers({});
    setScore(0);
    setSubmitted(false);
  };

  return (
    <Box sx={{ mt: 2, p: 2, border: "1px solid #aaa", borderRadius: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Quiz
      </Typography>

      {quiz.map((q, index) => (
        <Box
          key={index}
          sx={{ mb: 3, p: 2, border: "1px solid #ddd", borderRadius: 1 }}
        >
          <Typography variant="h6">{q.question}</Typography>

          <RadioGroup
            value={answers[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
          >
            {q.choices.map((choice, ci) => (
              <FormControlLabel
                key={ci}
                value={choice}
                control={<Radio />}
                label={choice}
                disabled={submitted}
              />
            ))}
          </RadioGroup>

          {submitted && (
            <Typography
              sx={{ mt: 1 }}
              color={answers[index] === q.answer ? "green" : "red"}
            >
              {answers[index] === q.answer
                ? "Correct!"
                : `Incorrect. Answer: ${q.answer}`}
            </Typography>
          )}
        </Box>
      ))}

      {!submitted ? (
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, backgroundColor: "#3b7aa5" }}
          onClick={handleSubmit}
        >
          Submit Quiz
        </Button>
      ) : (
        <>
          <Typography variant="h6" sx={{ mt: 2, textAlign: "center" }}>
            Score: {score} / {quiz.length}
          </Typography>

          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleRetry}
          >
            Retry Quiz
          </Button>
        </>
      )}
    </Box>
  );
}
