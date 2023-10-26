import { FC, PropsWithChildren, useCallback, useContext } from 'react'
import { Pagination, Stack, SxProps, Theme } from '@mui/material'
import { AdvertFilterInput, AdvertList } from 'adverts'
import useAbortController from 'hooks/use-abort-controller'
import { createTreeAdapter } from 'lib/tree-adapter'
import { Phrase } from 'phrases/Phrase'
import { AdvertsContext } from '../../AdvertsContext'
import { AdvertsList } from './AdvertsList'
import { ErrorView } from '../../../errors'
import { SearchableAdvertsList } from '../filter'
import { AsyncEnqueue, useLiveSearch } from '../../../hooks/use-live-search'
import useLocalStorage from '../../../hooks/use-local-storage'

const PAGE_SIZE = 5

const createEmptyResult = (): AdvertList => ({
    adverts: [],
    categories: [],
    paging: { pageIndex: 0, pageSize: PAGE_SIZE, pageCount: 0, totalCount: 0 },
})

const AdvertsListPagination: FC<{
    sx?: SxProps<Theme>
    hideEmpty?: boolean
    adverts: AdvertList
    searchParams: AdvertFilterInput
    setSearchParams: (p: AdvertFilterInput) => void
}> = ({
    sx,
    hideEmpty,
    adverts: {
        paging: { totalCount, pageIndex, pageCount },
    },
    searchParams,
    setSearchParams,
}) => (
    <Stack alignItems="center" sx={sx}>
        {totalCount === 0 && !hideEmpty && (
            <Phrase
                id="SEARCH_EMPTY_RESULT"
                value="Hoppsan, det blev inga träffar på den"
            />
        )}
        {pageCount > 1 && (
            <Pagination
                color="primary"
                page={pageIndex + 1}
                count={pageCount}
                showFirstButton
                hideNextButton
                onChange={(_, page) =>
                    setSearchParams({
                        ...searchParams,
                        paging: {
                            pageIndex: page - 1,
                            pageSize: PAGE_SIZE,
                        },
                    })
                }
            />
        )}
    </Stack>
)
export const AdvertsListWithSearch: FC<
    {
        cacheName: string
        defaultSearchParams: Partial<AdvertFilterInput>
    } & PropsWithChildren
> = ({ children, cacheName, defaultSearchParams }) => {
    const { signal } = useAbortController()

    const effectiveInitialSearchParams: AdvertFilterInput = {
        search: '',
        sorting: {
            field: 'title',
            ascending: true,
        },
        paging: { pageIndex: 0, pageSize: PAGE_SIZE },
        ...defaultSearchParams,
    }
    const versionKey = btoa(JSON.stringify(effectiveInitialSearchParams))

    // We store searchpatams in local storage
    // The version key is used to detect when changes in default
    // parameters occus (which could be a schema addition or similar)
    // Change in default parameters are thus treated as a major version change
    const [searchParamsRaw, setSearchParamsRaw] = useLocalStorage(
        `haffa-filter-v2-${cacheName}`,
        {
            versionKey,
            p: effectiveInitialSearchParams,
        }
    )

    const setSearchParams = useCallback(
        (p: AdvertFilterInput) =>
            setSearchParamsRaw({
                versionKey,
                p,
            }),
        [setSearchParamsRaw, versionKey]
    )

    const searchParams =
        searchParamsRaw.versionKey === versionKey
            ? searchParamsRaw.p
            : effectiveInitialSearchParams

    const { listAdverts } = useContext(AdvertsContext)
    const next = useCallback(
        (p: AdvertFilterInput) => {
            setSearchParams(p)
            return listAdverts(p, { signal })
        },
        [setSearchParams, signal]
    )

    const view = useLiveSearch<AdvertList>(() => next(searchParams))

    const listResult = useCallback(
        (adverts: AdvertList, enqueue: AsyncEnqueue<AdvertList>) => (
            <SearchableAdvertsList
                key="sal"
                searchParams={searchParams}
                setSearchParams={(p) =>
                    enqueue(() =>
                        next({
                            ...p,
                            paging: { pageIndex: 0, pageSize: PAGE_SIZE },
                        })
                    )
                }
            >
                <AdvertsListPagination
                    adverts={adverts}
                    searchParams={searchParams}
                    setSearchParams={(p) => enqueue(() => next(p))}
                    sx={{ mb: 1 }}
                />
                <AdvertsList
                    key="al"
                    adverts={adverts?.adverts || []}
                    categories={createTreeAdapter(
                        adverts?.categories || [],
                        (c) => c.id,
                        (c) => c.categories
                    )}
                />
                <AdvertsListPagination
                    adverts={adverts}
                    searchParams={searchParams}
                    setSearchParams={(p) => enqueue(() => next(p))}
                    sx={{ mt: 1 }}
                    hideEmpty
                />
            </SearchableAdvertsList>
        ),
        [searchParams, setSearchParams, next]
    )

    return view({
        pending: (result, enqueue) =>
            listResult(result || createEmptyResult(), enqueue),
        rejected: (error, enqueue) => (
            <SearchableAdvertsList
                key="sal"
                searchParams={searchParams}
                setSearchParams={(p) => enqueue(() => next(p))}
            >
                <ErrorView key="ev" error={error} />
                {children}
            </SearchableAdvertsList>
        ),
        resolved: listResult,
    })
}
