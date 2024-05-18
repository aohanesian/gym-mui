import React, {useEffect, useState} from 'react';
import Pagination from "@mui/material/Pagination"
import {Box, Stack, Typography} from "@mui/material";
import {exerciseOptions, fetchData} from "../utils/fetchData";
import ExerciseCard from "./exerciseCard";
import bodyPart from "./BodyPart";
import Loader from "./Loader";

const Exercises = ({setExercises, setBodyPart, exercises, bodyPart}) => {
    const paginate = (event, value) => {
        setCurrentPage(value);
        window.scrollTo({top: 1800, behavior: "smooth"})
    };
    useEffect(() => {
        const fetchExercisesData = async () => {
            let exercisesData = [];
            if (bodyPart === `all`) {
                exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises?limit=1300`, exerciseOptions);
            } else {
                exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=1300`, exerciseOptions);
            }
            setExercises(exercisesData);
        }
        fetchExercisesData()
    }, [bodyPart]);
    const [currentPage, setCurrentPage] = useState(1);
    const exercisesPerPage = 9;
    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    const currentExercise = exercises.slice(indexOfFirstExercise, indexOfLastExercise);
    return (
        <Box
            id={"exercises"}
            sx={{mt: {lg: "110px"}}}
            mt={"20px"}
            p={"20px"}
        >
            <Typography variant={"h3"} mb={"46px"}>
                Showing Results
            </Typography>
            <Stack
                direction={"row"}
                sx={{gap: {lg: "110px", xs: "50px"}}}
                flexWrap={"wrap"}
                justifyContent={"center"}
            >
                {exercises ? (
                    currentExercise.map((exercise, index) => (
                        <ExerciseCard key={index} exercise={exercise}/>
                    ))
                ) : (
                    <Loader/>
                )}

            </Stack>
            <Stack mt={"100px"} alignItems={"center"}>
                {exercises.length > exercisesPerPage && (
                    <Pagination
                        color={"standard"}
                        shape={"rounded"}
                        defaultPage={1}
                        count={Math.ceil(exercises.length / exercisesPerPage)}
                        page={currentPage}
                        onChange={paginate} size={"large"}/>
                )}
            </Stack>
        </Box>
    )
        ;
};

export default Exercises;