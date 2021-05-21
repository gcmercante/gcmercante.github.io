import React, { useState, MouseEvent } from 'react';
import { Paper, Table, TableBody, TableContainer, TablePagination, TableCell, TableRow, TableFooter, IconButton } from '@material-ui/core';
import { withStyles, Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { lightBlue, red } from '@material-ui/core/colors';
import { TrendingUpRounded, FirstPageRounded, LastPageRounded, KeyboardArrowRightRounded, KeyboardArrowLeftRounded } from '@material-ui/icons';

import './table.css'
import Util from '../utils/util';

import TableHead from '../components/table-head'

const utilFunctions = new Util();

const data: any[] = utilFunctions.getData();

const StripedTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
          '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
          "&$hover:hover": {
                backgroundColor: lightBlue[50],
            },
        },
        hover: {}
    })
)(TableRow)

const CustomTrendingUpRounded = withStyles((theme: Theme) => (
    createStyles({
        root: {
            marginRight: 15,
        }
    })
))(TrendingUpRounded)

const CustomTableCellChargeback = withStyles((theme: Theme) => (
    createStyles({
        root: {
            color: red[500],
            fontSize: '0.85rem',
            textAlign: 'center'
        }
    })
))(TableCell)

const CustomTableCell = withStyles((theme: Theme) => (
    createStyles({
        root: {
            fontSize: '0.85rem',
        }
    })
))(TableCell)

const CenteredTableCell = withStyles((theme: Theme) => (
    createStyles({
        root: {
            fontSize: '0.85rem',
            textAlign: 'center'
        }
    })
))(TableCell)


function formatMonetary(value: number) {
    return `R$${value.toFixed(2).toString().replace('.', ',')}`
}

function formatPercent(value: number) {
    return `${value.toFixed(2).toString().replace('.', ',')}%`
}

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onChangePage: (event: MouseEvent<HTMLButtonElement>, newPage: number) => void;
  }

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }),
);
function TablePaginationActions(props: TablePaginationActionsProps) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;
  
    const handleFirstPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, 0);
    };
  
    const handleBackButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, page - 1);
    };
  
    const handleNextButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageRounded /> : <FirstPageRounded />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRightRounded /> : <KeyboardArrowLeftRounded />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeftRounded /> : <KeyboardArrowRightRounded />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageRounded /> : <LastPageRounded />}
        </IconButton>
      </div>
    );
  }

export default function TableTest() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(13);

    const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    return (
        <div style={{ width: '100%' }}>
            <Paper className="paper">
                <TableContainer>
                    <Table
                        className='table'
                        aria-labelledby="tableTitle"
                        size='medium'
                        aria-label="enhanced table"
                    >
                        <TableBody>
                            <TableHead />
                            {
                                data
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(client => (
                                    <StripedTableRow
                                        hover
                                        key={client.id}
                                    >
                                        <CustomTableCell scope="row" component="th">
                                            {client.id}
                                        </CustomTableCell>
                                        <CustomTableCell>{client.client}</CustomTableCell>
                                        <CenteredTableCell>{client.chargebackQuantity}</CenteredTableCell>
                                        <CustomTableCell>{formatMonetary(client.chargebackValue)}</CustomTableCell>
                                        <CenteredTableCell>{client.salesAmount}</CenteredTableCell>
                                        <CustomTableCell>{formatMonetary(client.totalValue)}</CustomTableCell>
                                        <CustomTableCellChargeback><CustomTrendingUpRounded fontSize="small" color="error"/>{formatPercent(client.chargebackPercent)}</CustomTableCellChargeback>
                                        <CustomTableCellChargeback><CustomTrendingUpRounded fontSize="small" color="error"/>{formatPercent(client.chargebackTotal)}</CustomTableCellChargeback>
                                        <CustomTableCell>{client.status}</CustomTableCell>
                                        <TableCell></TableCell>
                                    </StripedTableRow>
                                ))
                            }
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    colSpan={10}
                                    count={data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: false,
                                    }}
                                    rowsPerPageOptions={[]}
                                    onChangePage={handleChangePage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}