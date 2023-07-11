import { AdvertFilterInput, AdvertSorting } from 'adverts'
import { FC, useContext, useMemo, useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import { PhraseContext } from 'phrases/PhraseContext'

interface SortOption {
    label: string
    ascending: boolean
    sorting: AdvertSorting
}

export const SortingButton: FC<{
    searchParams: AdvertFilterInput
    setSearchParams: (p: AdvertFilterInput) => void
}> = ({ searchParams, setSearchParams }) => {
    const [sortMenuAnchor, setSortMenuAnchor] = useState<HTMLElement | null>(
        null
    )
    const showSortMenu = (anchor: HTMLElement | null) => {
        setSortMenuAnchor(anchor)
    }

    const applySortOption = (sorting: AdvertSorting) => {
        setSearchParams({
            ...searchParams,
            sorting,
        })
        showSortMenu(null)
    }

    const { phrase } = useContext(PhraseContext)

    const sortOptions = useMemo<SortOption[]>(
        () => [
            {
                label: phrase('SORT_OPTION_TITLE_ASC', 'A-Ö'),
                ascending: true,
                sorting: { field: 'title', ascending: true },
            },
            {
                label: phrase('SORT_OPTION_TITLE_DESC', 'Ö-A'),
                ascending: false,
                sorting: { field: 'title', ascending: false },
            },
            {
                label: phrase('SORT_OPTION_CREATEDAT_ASC', 'Äldst'),
                ascending: true,
                sorting: { field: 'createdAt', ascending: true },
            },
            {
                label: phrase('SORT_OPTION_CREATEDAT_DESC', 'Nyast'),
                ascending: false,
                sorting: { field: 'createdAt', ascending: false },
            },
        ],
        [phrase]
    )

    const bestMatchingOption =
        sortOptions.find(
            (option) =>
                option.sorting.field === searchParams?.sorting?.field &&
                option.sorting.ascending === searchParams?.sorting?.ascending
        ) || sortOptions[0]

    return (
        <>
            <Button
                variant="outlined"
                onClick={(e) => showSortMenu(e.currentTarget)}
            >
                {bestMatchingOption.label}
            </Button>
            <Menu
                anchorEl={sortMenuAnchor}
                open={!!sortMenuAnchor}
                onClose={() => setSortMenuAnchor(null)}
            >
                {sortOptions.map((option, index) => (
                    <MenuItem
                        selected={option === bestMatchingOption}
                        key={index}
                        onClick={() => applySortOption(option.sorting)}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}
