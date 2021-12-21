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
              <h1>Post Exercise Survery</h1>
              <p>*any questions with a scale (1 - lowest, 5 - highest)</p>
              <Box sx={{ minWidth: 120 }}>
                <Controller
                  name="exerciseLengths"
                  control={control}
                  rules={{ required: "Budget Required" }}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <h3>
                        How did you feel about the lengths of today's exercises?
                      </h3>
                      <FormControl variant="outlined">
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
                  defaultValue="tooLong" // make sure to set up defaultValue
                />
              </Box>
              <FormControl>
                <Controller
                  control={control}
                  name="expVideo"
                  defaultValue={3}
                  render={({ field: { onChange } }) => (
                    <>
                      <h3>Rate your experience with the videos</h3>
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
                  name="expAudio"
                  defaultValue={3}
                  render={({ field: { onChange } }) => (
                    <>
                      <h3>Rate your experience with the audio</h3>
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
                        your daily routine? (If the exercises are curated
                        specifically for your biometrics)
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
                  name="$/month"
                  control={control}
                  rules={{ required: "Budget Required" }}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <h3>
                        How much $/month do you think this service is worth for
                        an individual user?
                      </h3>
                      <FormControl variant="outlined">
                        <InputLabel id="price_label">$/Month</InputLabel>

                        <Select
                          value={value}
                          onChange={onChange}
                          label="$/Month"
                          labelId="price_label"
                        >
                          <MenuItem value="free">
                            This service should be free.
                          </MenuItem>
                          <MenuItem value="$5/month">$5/month</MenuItem>
                          <MenuItem value="$10/month">$10/month</MenuItem>
                          <MenuItem value="$15/month">$15/month</MenuItem>
                        </Select>
                      </FormControl>
                    </>
                  )}
                  defaultValue="$5/month" // make sure to set up defaultValue
                />
                <Controller
                  control={control}
                  name="otherFeedback"
                  defaultValue=""
                  render={({ field: { onChange } }) => (
                    <FormControl fullWidth>
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
        </Paper>
      )}
    </Grid>
  );
};
export default Survey;
