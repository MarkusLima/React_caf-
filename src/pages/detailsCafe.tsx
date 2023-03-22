import React, {useEffect} from "react";
import { Container } from '@mui/material';
import MenuDetails from '../components/MenuDetails';
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
  const [id, setId] = React.useState('');

  useEffect(() => {

    if(localStorage.getItem("item_cafe_title") !== null){

      const item_cafe_title = localStorage.getItem("item_cafe_title");
      if( item_cafe_title !== null){
        setName(item_cafe_title);
      }
          
    }

    if(localStorage.getItem("item_cafe_category") !== null){

      const item_cafe_category = localStorage.getItem("item_cafe_category");
      if( item_cafe_category !== null){
        setTipo(item_cafe_category);
      }

    }

    if(localStorage.getItem("item_cafe_id") !== null){

      const item_cafe_id = localStorage.getItem("item_cafe_id");
      if( item_cafe_id !== null){
        setId(item_cafe_id);
      }

    }

  }, []);

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
        if (cafe.constructor === Array) {
          
          var new_cafe:any = cafe.filter(value => value.id !== id);

          var _cafe = {
            title: name,
            category: tipo,
            id: id
          }

          new_cafe.push(_cafe);

          localStorage.setItem('cafe', JSON.stringify(new_cafe));
        }
      }

  }

  function delCafe (){
    var cafe:any = localStorage.getItem("cafe");
    cafe = JSON.parse(cafe);
    
    if (cafe !== null) {
      if (cafe.constructor === Array) {
        
        var new_cafe:any = cafe.filter(value => value.id !== id);

        localStorage.setItem('cafe', JSON.stringify(new_cafe));
        changeRoute('List');
      }
    }


  }

  return (
    <Container>
      <MenuDetails navegue={sendRoute} saveCafe={saveCafe} deleteCafe={delCafe}/>
      <Typography variant="h4" component="h2">
        Dados gerais 
        {/* {name} {tipo} */}
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