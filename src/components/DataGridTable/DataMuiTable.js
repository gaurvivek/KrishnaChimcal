import * as React from 'react';
import { Grid } from '@mui/material';
import { AppButton, AppLink } from '../../components';
import { AppSection } from '../../components/forms';
import ButtonsSection from '../components/Buttons';
import TagsSection from '../components/Tags';
import DialogsSection from '../components/Dialogs';
import AlertsSection from '../components/Alerts';
import LinksSection from '../components/Links';
import IconButtonSection from '../components/IconButtons';
import TypographySection from '../components/Typography';
import SnackBarsSection from '../components/SnackBars';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import CreateCoalEntry from './CreateCoalEntry';
import { useAppStore } from '../../store';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ConfirmDialog from '../../components/dialogs/ConfirmationDialog';
import { AppSnackBarAlert } from '../../components/AppSnackBar';
import { coalList } from './../../store/storeRedux/actions';
import { DataGridTable } from '../../components/DataGridTable';
import Edit from '@mui/icons-material/Edit';

function createData(
  _id,
  cName,
  cQuality,
  cQuantity,
  cWater,
  dName,
  cFare,
  cRate,
  cInvoiceNumber,
  cDate) {
  return {
    _id,
    cName,
    cQuality,
    cQuantity,
    cWater,
    dName,
    cFare,
    cRate,
    cInvoiceNumber,
    cDate
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
const headCells = [
  {
    id: 'companyName',
    numeric: false,
    disablePadding: false,
    label: 'Company Name',
  },
  {
    id: 'cQuality',
    numeric: false,
    disablePadding: false,
    label: 'Coal Quality',
  },
  {
    id: 'cQuantity',
    numeric: false,
    disablePadding: false,
    label: 'Coal Quantity',
  },
  {
    id: 'cWater',
    numeric: false,
    disablePadding: false,
    label: 'Coal Water',
  },
  {
    id: 'dName',
    numeric: false,
    disablePadding: false,
    label: 'Driver Name',
  },
  {
    id: 'cFare',
    numeric: false,
    disablePadding: false,
    label: 'Driver Fare',
  },
  {
    id: 'cRate',
    numeric: false,
    disablePadding: false,
    label: 'Coal Amount',
  },
  {
    id: 'cInvoiceNumber',
    numeric: false,
    disablePadding: false,
    label: 'Coal Invoice Number',
  },
  {
    id: 'cDate',
    numeric: false,
    disablePadding: false,
    label: 'Unload Date',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Coal Data
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
const CoalList = () => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showCoalManageDialog, setShowCoalManageDialog] = React.useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState(false);
  const [hideConfirmSuccess, setHideConfirmSuccess] = React.useState(false);
  const [deleteCoalItem, setDeleteCoalItem] = React.useState({});
  const [editCoalItem, setEditCoalItem] = React.useState({});
  const [tableRows, setTableRows] = React.useState([]);
  const dispatch = useDispatch();
  let coalListArr = useSelector((state) => state.coalList);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const updateCoalList = (coalList) => {
    const coalTableList = [];
    if(coalListArr && coalListArr.length){
      coalListArr.map(cList => {
        coalTableList.push(createData(
          cList._id,
          cList.cName,
          cList.cQuality,
          cList.cQuantity,
          cList.cWater,
          cList.dName,
          cList.cFare,
          cList.cRate,
          cList.cInvoiceNumber,
          cList.cDate
        ));
      })
      setTableRows(coalTableList)
      console.log(coalTableList)
    }else{
      setTableRows([]);
    }
  }
  useEffect( () => {
    updateCoalList(coalListArr);
  }, [coalListArr])
  console.log(coalListArr, tableRows)
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = tableRows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableRows.length) : 0;

  const visibleRows = React.useMemo(
    () => stableSort(tableRows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, tableRows]
  );
  const handleCreateEntry = () => {
    setShowCoalManageDialog(true);
  };
  const onClose = () => {
    setShowCoalManageDialog(false);
    setOpenDeleteConfirm(false);
    setDeleteCoalItem({});
    setHideConfirmSuccess(false)
  };
  const onConfirm = () => {
    updateCoalList(coalListArr);
    setShowCoalManageDialog(false);
  };
  const handleDeleteCoalItem = () => {
    console.log(deleteCoalItem._id, deleteCoalItem.cName, deleteCoalItem.index)
    setOpenDeleteConfirm(false);
    setHideConfirmSuccess(true)
    const filteredCoalList = coalListArr.filter(function(cItem) { 
      return cItem._id !== deleteCoalItem._id;
    });
    dispatch(coalList(filteredCoalList));
    setDeleteCoalItem({});
  }
  return (
    <Grid container spacing={2}>
      <CreateCoalEntry title={'Add Coal Entry'} open={showCoalManageDialog} onClose={onClose} onConfirm={onConfirm} />
      <ConfirmDialog title="Delete Coal Entry" text={<span>Do you want to delete <b>{deleteCoalItem.cName}</b> entry ?</span>} open={openDeleteConfirm} onClose={onClose} onConfirm={handleDeleteCoalItem}/>
      <AppSnackBarAlert
          key="2"
          open={hideConfirmSuccess}
          message={'Coal Entry Deleted Successfully...'}
          severity="success"
          onClose={onClose}
        />
      <Grid item xs={12}>
        <AppSection title="Coal Managment">
          <AppButton startIcon="add" label="Add Coal Entry" color="primary" onClick={handleCreateEntry} sx={{display: "flex", flexDirection: "row-reverse"}}/>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <EnhancedTableToolbar numSelected={selected.length} />
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="CoalData" size={dense ? 'small' : 'medium'}>
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={tableRows.length}
                  />
                  <TableBody>
                    {visibleRows.map((row, index) => {
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          // onClick={(event) => handleClick(event, row.name)}
                          // role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.name}
                          selected={isItemSelected}
                          // sx={{ cursor: 'pointer' }}
                        >
                          {/* <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          </TableCell> */}
                          <TableCell align="center" component="th" id={labelId} scope="row" padding="none">
                            {row.companyName}
                          </TableCell>
                          <TableCell align="center">{row.cQuality}</TableCell>
                          <TableCell align="center">{row.cQuantity}</TableCell>
                          <TableCell align="center">{row.cWater}</TableCell>
                          <TableCell align="center">{row.dName}</TableCell>
                          <TableCell align="center">{row.cFare}</TableCell>
                          <TableCell align="center">{row.cFare}</TableCell>
                          <TableCell align="center">{row.cInvoiceNumber}</TableCell>
                          <TableCell align="center">{row.cDate}</TableCell>
                          <TableCell align="center">
                            <DeleteIcon onClick={() => {setOpenDeleteConfirm(true); setDeleteCoalItem({_id: row._id, index: index, cName: row.companyName})}} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: (dense ? 33 : 53) * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={tableRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
            {/* <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
            /> */}
          </Box>
        </AppSection>
      </Grid>
    </Grid>
  );
};

export default CoalList;
