import React, {useEffect, useState} from 'react';
import {Box, Stack, Button, Typography, TextField} from "@mui/material";
import {fetchData, exerciseOptions} from "../utils/fetchData";
import exercises from "./Exercises";
import HorizontalScrollBar from "./HorizontalScrollBar";

const SearchExercises = ({setExercises, bodyPart, setBodyPart}) => {
    const [search, setSearch] = useState("");

    const [bodyParts, setBodyParts] = useState([]);

    useEffect(() => {
        const fetchExercisesData = async () => {
            const bodyPartsExercises = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions)
            setBodyParts(['All', ...bodyPartsExercises])
        }
        fetchExercisesData()
    }, []);

    const handleSearch = async () => {
        if (search) {
            const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises?limit=1300', exerciseOptions);
            const searchedExercises = exercisesData.filter(
                (item) => item.name.toLowerCase().includes(search)
                    || item.target.toLowerCase().includes(search)
                    || item.equipment.toLowerCase().includes(search)
                    || item.bodyPart.toLowerCase().includes(search),
            );
            setSearch('');
            setExercises(searchedExercises);
            window.scrollTo({top: 1800, left: 100, behavior: 'smooth'});
        }
    }

    return (
        <Stack alignItems={"center"} mt={"37px"} justifyContent={"center"} padding={"20px"}>
            <Typography fontWeight={"700"} sx={{fontSize: {lg: "44px", xs: "30px"}}} textAlign={"center"} mb={"50px"}>Awesome
                Exercises You<br/> Should
                Know</Typography>
            <Box position={"relative"} mb={"72px"}>
                <TextField
                    sx={{
                        input: {
                            fontWeight: "700",
                            border: "none",
                            borderRadius: "4px"
                        },
                        width: {
                            lg: "800px",
                            xs: "350px"
                        },
                        backgroundColor: "#fff",
                        borderRadius: "40px"
                    }}
                    height={"76px"}
                    value={search}
                    onChange={(event) => setSearch(event.target.value.toLowerCase())}
                    placeholder={"Body weight, deadlift, biceps, dumbbell etc."}
                    type={"text"}
                />
                <Button className={"search-btn"}
                        onClick={handleSearch}
                        sx={{
                            backgroundColor: "#FF2625",
                            color: "#FFF",
                            textTransform: "none",
                            width: {
                                lg: "175px",
                                xs: "80px"
                            },
                            fontSize: {
                                lg: "20px",
                                xs: "14px"
                            },
                            height: "56px",
                            position: "absolute",
                            right: "0"
                        }}>
                    Search
                </Button>
            </Box>
            <Box sx={{position: "relative", width: "100%", padding: "20px"}}>
                <HorizontalScrollBar data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart} isBodyPart/>
            </Box>
        </Stack>
    );
};

export default SearchExercises;