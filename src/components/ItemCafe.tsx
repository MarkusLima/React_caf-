import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IItemCafeData from '../types/itemCafeType';
import VisibilityIcon from '@mui/icons-material/Visibility';


const ItemCafe :React.FC<IItemCafeData> = ({id, title, category, navegueDetails}) => {

  const  goDetails = () => {
    navegueDetails();
  }

  return (
        <TableRow hover  key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={goDetails}>
            <TableCell component="th" scope="row">{id}</TableCell>
            <TableCell align="right">{title}</TableCell>
            <TableCell align="right">{category}</TableCell>
            <TableCell align="right"> <VisibilityIcon /></TableCell>
        </TableRow>
  );
}


export default ItemCafe