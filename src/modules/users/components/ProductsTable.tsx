'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import { useSelection } from '../../../hooks/useSelection';
import EntityContextMenu from '../../../components/context-menu/EntityContextMenu';
import { DASHBOARD_ROUTES } from '../../../routes';
import { useNavigate } from 'react-router-dom';
import { ProductType } from '../../products/@types/ProductType';
import LoadingContent from '../../../components/loading-content/LoadingContent';
import NoDataContent from '../../../components/no-data-content/NoDataContent';

function noop(): void {
  // do nothing
}

interface ProductsTableProps {
  count?: number;
  page?: number;
  rows?: ProductType[];
  rowsPerPage?: number;
  isLoading: boolean;
  changePagination?: (page: number, rowsPerPage: number) => void;
}

export function ProductsTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
  isLoading = true,
  changePagination,
}: ProductsTableProps): React.JSX.Element {
  const navigate = useNavigate();
  const rowIds = React.useMemo(() => {
    return rows.map((customer) => customer.id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  return (
    <Box>
      <Box sx={{ overflowX: 'auto', minHeight: '250px' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Modulo</TableCell>
              <TableCell>Esta activo?</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id);

              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row.id);
                        } else {
                          deselectOne(row.id);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.module.name}</TableCell>
                  <TableCell>{row.active ? 'Si' : 'No'}</TableCell>
                  <TableCell>{dayjs(row.createdAt).format('MMM D, YYYY')}</TableCell>
                  <TableCell>
                    <EntityContextMenu
                      entity={row}
                      items={[
                        {
                          id: 'edit',
                          label: 'Editar',
                          icon: 'eva:edit-2-outline',
                          onPress: (entity) => {
                            navigate(DASHBOARD_ROUTES.PRODUCTS.EDIT(entity.id));
                          }
                        },
                        {
                          id: 'delete',
                          label: 'Eliminar',
                          icon: 'eva:trash-2-outline',
                          onPress: (entity) => {
                            console.log('Delete', entity);
                          }
                        }
                      ]}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <LoadingContent display={isLoading} />
        <NoDataContent display={(rows.length === 0 && !isLoading) ? true : false} />
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={(_, page) => changePagination?.(page, rowsPerPage)}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
}
