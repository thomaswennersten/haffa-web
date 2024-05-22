import EventBusyIcon from '@mui/icons-material/EventBusy'
import EditIcon from '@mui/icons-material/Edit'
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser'
import { NavLink } from 'react-router-dom'
import { ReactNode } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { sortBy } from 'lib/sort-by'
import {
    GridAlignment,
    GridColDef,
    GridColType,
    GridRenderCellParams,
} from '@mui/x-data-grid'
import { AdvertTableRow, AdvertsTableContextType } from './AdvertsTable/types'

export const createLink = (to: string | undefined, icon: ReactNode) => (
    <NavLink to={to ?? ''} style={{ color: 'inherit', textDecoration: 'none' }}>
        {icon}
    </NavLink>
)

export const createAdvertImage = (image?: string) => (
    <Box
        component="img"
        src={image ?? '/empty-advert.svg'}
        sx={{
            height: 48,
            width: 48,
            objectFit: 'cover',
        }}
    />
)

const createTagList = (tags?: string[]) => (
    <Stack direction="column">
        {tags?.sort(sortBy((tag) => tag.toLowerCase())).map((tag, index) => (
            <Box key={index}>
                <Typography style={{ whiteSpace: 'nowrap' }}>{tag}</Typography>
            </Box>
        ))}
    </Stack>
)

export const createColumns = ({
    categoryTree,
    fields,
}: AdvertsTableContextType): GridColDef<AdvertTableRow>[] =>
    [
        {
            field: 'image',
            headerAlign: 'center' as GridAlignment,
            sortable: false,
            headerName: 'Bild',
            renderCell: ({ value }: GridRenderCellParams<any, string>) =>
                createAdvertImage(value),
            minWidth: 68,
            maxWidth: 68,
        },
        {
            field: 'title',
            headerName: fields.title?.label || '',
            width: 250,
        },
        {
            field: 'category',
            sortable: false,
            headerName: fields.category?.label || '',
            valueGetter: (value: string) =>
                categoryTree
                    .pathById(value)
                    .map(({ label }) => label)
                    .join(' - '),
        },
        {
            field: 'tags',
            sortable: false,
            headerName: fields.tags?.label || '',
            renderCell: ({ value }: GridRenderCellParams<any, string[]>) =>
                createTagList(value),
        },
        {
            field: 'reference',
            headerName: fields.reference?.label || '',
            headerAlign: 'right' as GridAlignment,
            align: 'right' as GridAlignment,
        },
        {
            field: 'notes',
            headerName: fields.notes?.label || '',
        },
        {
            field: 'lendingPeriod',
            type: 'number' as GridColType,
            headerName: fields.lendingPeriod?.label || '',
            valueGetter: (value: string) => Number(value),
        },
        {
            field: 'isOverdue',
            minWidth: 48,
            maxWidth: 48,
            align: 'center' as GridAlignment,
            sortable: false,
            headerName: 'Försenad?', // eslint-disable-next-line react/no-unstable-nested-components
            renderCell: ({ value }: GridRenderCellParams<any, boolean>) =>
                value && <EventBusyIcon />,
        },
        {
            field: 'visitLink',
            minWidth: 48,
            maxWidth: 48,
            align: 'center' as GridAlignment,
            sortable: false,
            headerName: 'Gå till',
            renderCell: ({ value }: GridRenderCellParams<any, string>) =>
                createLink(value, <OpenInBrowserIcon />),
        },
        {
            field: 'editLink',
            minWidth: 48,
            maxWidth: 48,
            align: 'center' as GridAlignment,
            sortable: false,
            headerName: 'Redigera',
            renderCell: ({ value }: GridRenderCellParams<any, string>) =>
                createLink(value, <EditIcon />),
        },
    ].filter(({ field }) => field)
