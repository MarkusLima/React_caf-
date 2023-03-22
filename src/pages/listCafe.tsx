import React, { useState, useEffect } from "react";
import { Container } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ItemCafe from '../components/ItemCafe';
import MenuList from '../components/MenuList';
import ICafeData from '../types/cafeType';
import Cafeservice from "../services/cafeRequest";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

interface  Props {
  readonly  changeRoute: (page: string) =>  void;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const ListCafe: React.FC<Props> = ({ changeRoute }) => {
  const [cafe, setCafe] = useState<Array<ICafeData>>([]);
  const [tipo, setTipo] = React.useState("");

  const retrieveCafe = (tipo: string) => {
    Cafeservice.getAll(tipo)
      .then((response: any) => {
        setCafeDto(response.data, tipo);
        localStorage.setItem("cafe", JSON.stringify(response.data));
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {

    if(localStorage.getItem("cafe") !== undefined){
      const cafes = localStorage.getItem("cafe")?.length;
      if( cafes === undefined){
        retrieveCafe(tipo);
      } else {
          const cafes = localStorage.getItem("cafe");
          if( cafes !== null){
            setCafe(JSON.parse(cafes));
          }
      }
    } else {
      const cafes = localStorage.getItem("cafe");
      if( cafes !== null){
        setCafe(JSON.parse(cafes));
      }
    }

  }, [tipo]);

  const handleChange = (event: SelectChangeEvent) => {
      setTipo(event.target.value as string);
      retrieveCafe(event.target.value as string)
  };

  const sendRoute = () => {
    changeRoute('Add');
  }

  const sendRouteDetails = (cafe:any) => {
    changeRoute('Details');
    localStorage.setItem("item_cafe_id", cafe.id);
    localStorage.setItem("item_cafe_title", cafe.title);
    localStorage.setItem("item_cafe_category", cafe.category);
  }

  function setCafeDto (obj: any, tipo:string){
    let new_cafe:any = [];
    for (let index = 0; index < obj.length; index++) {
      obj[index]['category'] = tipo;
      new_cafe[index] = obj[index];
    }

    setCafe(new_cafe);
  }

  return (
    <Container>
      <MenuList navegue={sendRoute} />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tipo}
                  label="Tipo"
                  onChange={handleChange}
                >
                  <MenuItem value={''}></MenuItem>
                  <MenuItem value={'hot'}>Hot</MenuItem>
                  <MenuItem value={'iced'}>Iced</MenuItem>
                </Select>
              </FormControl>
            </Item>
          </Grid>
      </Grid>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Titulo</TableCell>
              <TableCell align="right">Categoria</TableCell>
              <TableCell align="right">Detalhes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {cafe &&
                  cafe.map((cafe, index) => (
                    <ItemCafe id={cafe.id} title={cafe.title} category={cafe.category} navegueDetails={()=>sendRouteDetails(cafe)}/>
                  ))
              }
          </TableBody>
        </Table>
      </TableContainer>
     </Container>
  )
};

export default ListCafe;