import React from 'react';
import {Button, Stack, Typography, List, ListItem, ListItemText, Paper} from "@mui/material";
import BodyPartImage from '../assets/icons/body-part.png'
import TargetImage from '../assets/icons/target.png'
import EquipmentImage from '../assets/icons/equipment.png'

const Detail = ({exerciseDetail}) => {

    const {bodyPart, gifUrl, name, target, equipment, instructions} = exerciseDetail;
    const extraDetail = [
        {
            icon: BodyPartImage,
            name: bodyPart
        },
        {
            icon: TargetImage,
            name: target
        },
        {
            icon: EquipmentImage,
            name: equipment
        },
    ]

    return (
        <Stack gap={"60px"} sx={{flexDirection: {lg: "row"}, padding: "20px", alignItems: "center"}}>
            <img src={gifUrl} alt={name} loading={"lazy"} className={'detail-image'}/>
            <Stack sx={{gap: {lg: "35px", xs: "20px"}}}>
                <Typography variant={"h3"} textTransform={"capitalize"}>
                    {name}
                </Typography>
                <List>
                    {instructions?.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={item}/>
                        </ListItem>
                    ))}
                </List>
                {extraDetail.map((item, index) => (
                    <Stack key={index} direction={"row"} gap={"24px"} alignItems={"center"}>
                        <Button sx={{
                            background: "#FF2B",
                            borderRadius: "50%",
                            width: "100px",
                            height: "100px",
                            cursor: "default"
                        }}>
                            <img src={item.icon} alt={bodyPart} style={{width: "50px", height: "50px"}}/>
                        </Button>
                        <Typography textTransform={"capitalize"} variant={"h5"}>
                            {item.name}
                        </Typography>
                    </Stack>
                ))}
            </Stack>
        </Stack>
    );
};

export default Detail;