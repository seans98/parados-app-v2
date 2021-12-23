import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Box,
  Grid,
  Slider,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";

const Survey = (props) => {
  let now = new Date();
  let timeStarted = props.timestarted;
  const { handleSubmit, control } = useForm({
    defaultValues: {
      timeStarted: timeStarted,
      timeCompleted: now,
    },
  });
  const userCollectionRef = collection(db, "feedback-2");

  const onSubmit = async (data) => {
    await addDoc(userCollectionRef, data);
    props.setSubmitSurvey(true);
    console.log(data);
  };
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      {!props.submitSurvey ? (
        <Paper sx={{ width: 0.75 }}>
          <FormControl fullWidth>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h3>
                To enter yourself into the draw for the prize complete the
                survey below.
              </h3>
              <p>*any questions with a scale (1 - lowest, 5 - highest)</p>
              <Box sx={{ minWidth: 120 }}>
                <Controller
                  name="exerciseLengths"
                  control={control}
                  rules={{ required: "Budget Required" }}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <h3>
                        How did you feel about the lengths of the exercises?
                      </h3>
                      <FormControl variant="outlined" sx={{ minWidth: 1 / 2 }}>
                        <InputLabel id="exercise_label">
                          Exercise Lengths
                        </InputLabel>

                        <Select
                          value={value}
                          onChange={onChange}
                          label="Exercise Lengths"
                          labelId="exercise_label"
                        >
                          <MenuItem value="tooLong">
                            They were too long.
                          </MenuItem>
                          <MenuItem value="tooShort">
                            They were too short.
                          </MenuItem>
                          <MenuItem value="goodLength">
                            They were a good length.
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </>
                  )}
                  defaultValue="" // make sure to set up defaultValue
                />
              </Box>
              <FormControl>
                <Controller
                  control={control}
                  name="exp"
                  defaultValue={3}
                  render={({ field: { onChange } }) => (
                    <>
                      <h3>Rate your experience</h3>
                      <Slider
                        max={5}
                        min={1}
                        defaultValue={3}
                        marks={true}
                        step={1}
                        valueLabelDisplay="auto"
                        onChange={(value) => onChange(value)}
                      />
                    </>
                  )}
                />
                <Controller
                  control={control}
                  name="dailyRoutine"
                  defaultValue={3}
                  render={({ field: { onChange } }) => (
                    <>
                      <h3>
                        How likely are you to incorporate using this app into
                        your daily routine?
                      </h3>
                      <Slider
                        max={5}
                        min={1}
                        defaultValue={3}
                        marks={true}
                        step={1}
                        valueLabelDisplay="auto"
                        onChange={(value) => onChange(value)}
                      />
                    </>
                  )}
                />
                <Controller
                  control={control}
                  name="dailyRoutineReasoning"
                  defaultValue=""
                  render={({ field: { onChange } }) => (
                    <>
                      <h3>Explain your reasoning as to why</h3>
                      <TextField
                        id="standard-multiline-flexible"
                        label="Reasoning Explanation"
                        multiline
                        maxRows={4}
                        onChange={(value) => onChange(value)}
                        variant="standard"
                      />
                    </>
                  )}
                />
              </FormControl>
              <Box>
                <Controller
                  control={control}
                  name="otherFeedback"
                  defaultValue=""
                  render={({ field: { onChange } }) => (
                    <FormControl sx={{ width: 3 / 4 }}>
                      <h3>Any other feedback? Please let us know below.</h3>
                      <TextField
                        id="standard-multiline-flexible"
                        label="Feedback"
                        multiline
                        maxRows={4}
                        onChange={(value) => onChange(value)}
                        variant="standard"
                      />
                    </FormControl>
                  )}
                />
              </Box>

              <Button variant="contained" type="submit" sx={{ mb: 2, mt: 2 }}>
                Submit
              </Button>
            </form>
          </FormControl>
        </Paper>
      ) : (
        <Paper>
          <h1>
            Your Survey has been submitted. Once again, thank you for your
            participation.
          </h1>
          <p>
            If you would like to know more about concussion prevention please
            visit the link below:
          </p>
          <a href="https://www.parados.ca/research.html">
            Research and Articles
          </a>
        </Paper>
      )}
    </Grid>
  );
};
export default Survey;
