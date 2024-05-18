import React from 'react';
import {Typography, Stack, Button} from "@mui/material";


const BodyPart = ({item, setBodyPart, bodyPart}) => {
    const Icon = require(`../assets/muscleGroups/${item.replace(/\s/g, '_').toLowerCase()}.png`);

    return (
        <Stack
            type={Button}
            alignItems={"center"}
            justifyContent={"center"}
            className={"bodyPart-card"}
            sx={{
                backgroundColor: "#FFF",
                borderBottomLeftRadius: "20px",
                width: "270px",
                height: "280px",
                cursor: "pointer",
                gap: "47px",
                borderTop: bodyPart === item ? "4px solid #FF2625" : ""
            }}
            onClick={() => {
                setBodyPart(item);
                window.scrollTo({top: 1800, left: 100, behavior: "smooth"})
            }}
        >
            <img src={Icon} alt={`${item} icon`} style={{width: "52px", height: "52px"}}/>
            <Typography fontSize={"24px"} fontWeight={"bold"} color={"#3A1212"} textTransform={"capitalize"}>
                {item}
            </Typography>
        </Stack>
    );
};

export default BodyPart;