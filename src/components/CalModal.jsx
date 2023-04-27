import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Cal from "./Calendar.jsx";

const CalModal = (props) => {
    return (
        <Modal open={props.open} onClose={props.handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Cal date={props.date} setDate={props.setDate} />
            </Box>
        </Modal>
    );
};

const CalIcon = (props) => {
    return (
        <IconButton onClick={props.handleOpen} color="inherit">
            <Box sx={{ mr: 1 }}>
                <DateRangeIcon />
            </Box>
            <Typography>
                {props.date.length > 0 ? "Start: " : "Select a date range"}

                {props.date.length > 0 ? (
                    <>
                        {props.date[0].toDateString()}&nbsp;|&nbsp; End:&nbsp;
                        {props.date[1].toDateString()}
                    </>
                ) : (
                    ""
                )}
            </Typography>
        </IconButton>
    );
};

export { CalModal, CalIcon };
