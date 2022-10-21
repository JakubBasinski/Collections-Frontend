import * as React from 'react';
import { Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import TableContainer from '@mui/material/TableContainer';
import MuiTableHead from '@material-ui/core/TableHead';
import TableRow from '@mui/material/TableRow';
import { withStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SearchIcon from '@mui/icons-material/Search';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import BlockIcon from '@mui/icons-material/Block';
import classes from './AdminPage.module.css';

function createData(name, view, block, deleteUser, addAdmin, removeAdmin) {
  return {
    name,
    view,
    block,
    deleteUser,
    addAdmin,
    removeAdmin,
  };
}

const rows = [
  createData(
    'Radek',
    'Profile',
    'Block',
    'Delete',
    'Add Admin',
    'Remove Admin'
  ),
  createData(
    'Radek',
    'Profile',
    'Block',
    'Delete',
    'Add Admin',
    'Remove Admin'
  ),
];
const TableCell = withStyles((theme) => ({
  root: {
    fontFamily: 'Quicksand',
    color: '#DCD7C9',
    borderColor: '#DCD7C9',
    fontSize: '0.9em',
  },
}))(MuiTableCell);

const TableCellHeader = withStyles((theme) => ({
  root: {
    fontFamily: 'Quicksand',
    color: '#DCD7C9',
    borderColor: '#DCD7C9',
    fontSize: '1.1em',
    fontWeight: 600,
  },
}))(MuiTableCell);

const TableHead = withStyles((theme) => ({
  root: {
    fontFamily: 'Quicksand',
    color: 'black',
  },
}))(MuiTableHead);

const AdminPage = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item md={7}>
        <TableContainer sx={{ marginTop: '100px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCellHeader>User</TableCellHeader>
                <TableCellHeader align="center">Show profile</TableCellHeader>
                <TableCellHeader align="center">Delete user</TableCellHeader>
                <TableCellHeader align="center">Block user</TableCellHeader>
                <TableCellHeader align="center">
                  Add admin rights
                </TableCellHeader>
                <TableCellHeader align="center">
                  Remove admin rights
                </TableCellHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  className={classes.tableRow}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">
                    <SearchIcon className={classes.icons} />
                  </TableCell>
                  <TableCell align="center">
                    <DeleteForeverIcon className={classes.icons} />
                  </TableCell>
                  <TableCell align="center">
                    <BlockIcon className={classes.icons} />
                  </TableCell>
                  <TableCell align="center">
                    <ControlPointIcon className={classes.icons} />
                  </TableCell>
                  <TableCell align="center">
                    <RemoveCircleOutlineIcon className={classes.icons} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default AdminPage;
