import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import fiLocale from 'date-fns/locale/fi';

export default function AddTraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: "",
        activity: "",
        duration: "",
        customer: "",
    });

    const handleClickOpen = () => {
        setOpen(true);
        setTraining({
            date: "",
            activity: "",
            duration: "",
            customer: props.data.links[1].href,
        });
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const handleSave = () => {
        props.addTraining(training);
        setOpen(false);
    };

    return (
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add training to customer
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add training</DialogTitle>
            <DialogContent>
              <DialogContentText></DialogContentText>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fiLocale}>
                <DatePicker
                    label="Date"
                    inputFormat='dd.MM.yyyy p'
                    value={training.date}
                    onChange={value => setTraining({...training, date: value})}
                    renderInput={(params) => <TextField variant='standard' {...params} />}
                />
                </LocalizationProvider>
              <TextField
                autoFocus
                margin="dense"
                label="Duration in minutes"
                type="number"
                value={training.duration}
                onChange={(e) => setTraining({ ...training, duration: e.target.value })}
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                label="Activity"
                value={training.activity}
                onChange={(e) => setTraining({ ...training, activity: e.target.value })}
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}