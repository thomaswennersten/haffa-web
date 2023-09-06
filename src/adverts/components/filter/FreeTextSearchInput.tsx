import { AdvertFilterInput } from 'adverts'
import { FC } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField } from '@mui/material'
import { SortingButton } from './SortingButton'
import { FilterButton } from './FilterButton'

export const FreeTextSearchInput: FC<{
    searchParams: AdvertFilterInput
    setSearchParams: (p: AdvertFilterInput) => void
    onFilterButtonClick: () => void
}> = ({ searchParams, setSearchParams, onFilterButtonClick }) => (
    <TextField
        value={searchParams.search}
        type="search"
        fullWidth
        sx={{ my: 2 }}
        InputProps={{
            style: { fontSize: '150%' },
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            ),
            endAdornment: (
                <InputAdornment position="end" sx={{ gap: 1 }}>
                    <SortingButton
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                    />
                    <FilterButton onClick={onFilterButtonClick} />
                </InputAdornment>
            ),
        }}
        onChange={(e) =>
            setSearchParams({
                ...searchParams,
                search: e.target.value,
            })
        }
    />
)
