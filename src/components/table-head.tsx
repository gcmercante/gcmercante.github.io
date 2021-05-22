import React, { MouseEvent, useState } from 'react';

import { TableCell, TableRow, IconButton, Menu, ListItem, ListSubheader, ListItemSecondaryAction, ListItemText, Checkbox, Divider } from '@material-ui/core';
import { lightBlue, grey } from '@material-ui/core/colors';
import { MoreVertRounded } from '@material-ui/icons';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';

import Util, { Column } from '../utils/util';

const utilFunctions = new Util();

interface Props {
    onNotCheckedChange(value: string[]): void,
    onQuantityChange(value: number): void
}

const CustomCheckbox = withStyles((theme: Theme) => (
    createStyles({
        root: {
            color: lightBlue[100],
            '&$checked': {
                color: lightBlue[200],
            },
        },
        checked: {}
    })
))(Checkbox);

const CustomIconButton = withStyles((theme: Theme) => (
    createStyles({
        root: {
            color: lightBlue[200]
        }
    })
))(IconButton)

const CustomListItemText = withStyles((theme: Theme) => (
    createStyles({
        primary: {
            fontSize: '0.9rem'
        }
    })
))(ListItemText);

const CustomListItem = withStyles((theme: Theme) => (
    createStyles({
        root: {
            '&:hover': {
                backgroundColor: lightBlue[50]
            },
        },
    })
))(ListItem)

const CustomTableCell = withStyles((theme: Theme) => (
    createStyles({
        root: {
            fontWeight: 'bold',
            color: grey[700],
            textTransform: "uppercase"
        }
    })
))(TableCell)

const CenteredTableCell = withStyles((theme: Theme) => (
    createStyles({
        root: {
            fontWeight: 'bold',
            color: grey[700],
            textTransform: "uppercase",
            textAlign: 'center'
        }
    })
))(TableCell)

const CustomTableRow = withStyles(() => (
    createStyles({
        root: {
            width: '100%'
        }
    })
))(TableRow)

export default function TableHeadTest({ onQuantityChange, onNotCheckedChange }: Props) {
    const [lineQuantity, setLineQuantity] = useState(50);
    const [checkValue, setCheckValue] = useState(['default']);

    const [colspan, setColspan] = useState(1);

    const [columnsCheck, setColumnsCheck] = useState([
        "id",
        "client",
        "chargebackQuantity",
        "chargebackValue",
        "salesAmount",
        "totalValue",
        "chargebackPercent",
        "chargebackTotal",
        "status"
    ]);
    
    const column: Column[] = utilFunctions.getColumns();

    const checkedColumns: string[] = utilFunctions.getColumnValues();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [notChecked, setNotChecked] = useState(['']);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleChecked = (value: string) => () => {
        const currentIndex = checkValue.indexOf(value);
        const newChecked = [...checkValue];

        if(currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        if (value === 'default' && newChecked.find(element => element === 'fifty')) {
            newChecked.splice(newChecked.indexOf('fifty'), 1);
            setLineQuantity(50);
            onQuantityChange(lineQuantity);
        } else if(value === 'fifty' && newChecked.find(element => element === 'default')) {
            newChecked.splice(newChecked.indexOf('default'), 1);
            setLineQuantity(13);
            onQuantityChange(lineQuantity);
        }

        setCheckValue(newChecked);
    }

    const handleColumnChecked = (option: any) => () => {
        const currentIndex = columnsCheck.indexOf(option.value);
        const notCheckedIndex = notChecked.indexOf(option.value);
        const newChecked = [...columnsCheck];
        const newNotChecked = [...notChecked];
        
        if(currentIndex === -1) {
            newNotChecked.splice(notCheckedIndex, 1);
            newChecked.push(option.value);
            setColspan(colspan - 1);
        } else {
            newNotChecked.push(option.value);
            newChecked.splice(currentIndex, 1);
            setColspan(colspan + 1);
        }


        setNotChecked(newNotChecked);
        onNotCheckedChange(newNotChecked);
        setColumnsCheck(newChecked);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <CustomTableRow>
            {
                checkedColumns.map((columnObj: any) => {
                    return Object.entries(columnObj).map(([columnKey, columnValue]: [string, any]) => {
                        if (!notChecked.find((column: string) => column === columnKey)) {
                            const split = columnValue.split(' ')[0];
                            if(split === 'Qtd.' || split === '%') {
                                return (
                                    <CenteredTableCell>
                                        {columnValue}
                                    </CenteredTableCell>
                                )
                            }                            
                            return (
                                <CustomTableCell>
                                    {columnValue}
                                </CustomTableCell>
                            )
                        }
                        return(<></>);
                    })
                })                    
            }
            <TableCell align="right" colSpan={colspan}>
                <CustomIconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertRounded />
                </CustomIconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                >
                    <ListSubheader disableSticky>
                        Linhas por página
                    </ListSubheader>
                    <CustomListItem button onClick={handleChecked('default')}>
                        <CustomListItemText primary="Padrão"/>
                        <ListItemSecondaryAction>
                            <CustomCheckbox 
                                edge="end"
                                color="primary"
                                onChange={handleChecked('default')}
                                checked={checkValue.indexOf('default') !== -1}
                            />
                        </ListItemSecondaryAction>
                    </CustomListItem>
                    <CustomListItem button onClick={handleChecked('fifty')}>
                        <CustomListItemText primary="50 Linhas"/>
                        <ListItemSecondaryAction>
                            <CustomCheckbox 
                                edge="end"
                                color="primary"
                                onChange={handleChecked('fifty')}
                                checked={checkValue.indexOf('fifty') !== -1}
                            />
                        </ListItemSecondaryAction>
                    </CustomListItem>

                    <Divider />

                    <ListSubheader disableSticky>
                        Colunas
                    </ListSubheader>
                    {
                        column.map((option: any) => (
                            <CustomListItem button onClick={handleColumnChecked(option)} >
                                <CustomListItemText primary={option.name}/>
                                <ListItemSecondaryAction>
                                    <CustomCheckbox 
                                        edge="end"
                                        color="primary"
                                        onChange={handleColumnChecked(option)}
                                        checked={columnsCheck.indexOf(option.value) !== -1}
                                    />
                                </ListItemSecondaryAction>
                            </CustomListItem>
                        ))
                    }
                </Menu>
            </TableCell>
        </CustomTableRow>
    )
}