import { FormControl } from '@mui/base';
import CustomLabelForm from '../../components/UserComponents/CustomLabelForm';
import * as React from 'react';
import dayjs from 'dayjs';  
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function UserPage() {
  const [value, setValue] = React.useState(dayjs());

  const handleDateChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <FormControl>
      <CustomLabelForm labelText="Nombre" />
      <CustomLabelForm labelText="Apellido" />
        
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Selecciona la fecha de nacimiento"
          value={value}
          onChange={handleDateChange}
          renderInput={(params) => (
            <input
              {...params.inputProps}
              type="text"
              placeholder="Seleccione una fecha"
              readOnly 
            />
          )}
        />
      </LocalizationProvider>
    </FormControl>
  );
}
