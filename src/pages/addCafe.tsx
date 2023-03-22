import React from "react";
import { Container } from '@mui/material';
import MenuAdd from '../components/MenuAdd';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { SelectChangeEvent } from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface  Props {
  readonly  changeRoute: (page: string) =>  void;
}

const ListCafe: React.FC<Props> = ({ changeRoute }) => {
  const [name, setName] = React.useState('');
  const [tipo, setTipo] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
      setTipo(event.target.value as string);
  };

  const sendRoute = () => {
    changeRoute('List');
  }

  function handleChangeName (event: any) {
    setName(event.target.value as string);
  };

  function saveCafe (){
    var cafe:any = localStorage.getItem("cafe");
    cafe = JSON.parse(cafe);

    if (cafe !== null) {

      var new_cafe = {
          title: name,
          category: tipo,
          id: Math.floor(Math.random() * 100000)
      }

      if (cafe !== null) {
        if (cafe.constructor === Array) {
            cafe.push(new_cafe);
            localStorage.setItem('cafe', JSON.stringify(cafe));
            changeRoute('List');
        }
      }
    }
  }

  return (
    <Container>
      <MenuAdd navegue={sendRoute} saveCafe={saveCafe} />
      <Typography variant="h4" component="h2">
        Dados gerais 
      </Typography>;
      <Divider sx={{ mt: 3 }} />
      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
          m: 1
        }}
      >
        <TextField fullWidth label="Nome" id="fullWidth" 
            value={name}
            onChange={async (e) => { handleChangeName(e) }}
        />
         <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tipo}
            label="Tipo"
            onChange={handleChange}
            sx={{
              width: 500,
              maxWidth: '100%',
              mt: 3
            }}
          >
            <MenuItem value={'hot'}>Hot</MenuItem>
            <MenuItem value={'iced'}>Iced</MenuItem>
          </Select>
      </Box>
     </Container>
  )
};

export default ListCafe;