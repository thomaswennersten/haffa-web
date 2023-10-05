import { FC, useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Terms } from 'terms/types'
import { AdvertInput, AdvertMutationResult } from '../../types'
import { PhraseContext } from '../../../phrases/PhraseContext'
import { sanitizeAdvertInput } from '../../repository/mappers'
import { AdvertForm } from './form'
import { Category } from '../../../categories/types'

export const AdvertEditor: FC<{
    title: string
    onUpdate: (advert: AdvertInput) => Promise<AdvertMutationResult>
    advert: AdvertInput
    terms: Terms
    categories: Category[]
}> = ({ title, onUpdate, advert: inputAdvert, terms, categories }) => {
    const [advert, setAdvert] = useState<AdvertInput>(
        sanitizeAdvertInput(inputAdvert)
    )
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const { ERROR_UNKNOWN } = useContext(PhraseContext)
    const navigate = useNavigate()

    const save = useCallback(
        async (a: AdvertInput) => {
            setSaving(true)
            setAdvert(a)
            try {
                const result = await onUpdate(a)
                setSaving(false)
                setError(result.status ? result.status.message : '')
                if (result.status) {
                    setAdvert(sanitizeAdvertInput(result.advert || advert))
                } else if (result.advert) {
                    navigate(`/advert/${result.advert.id}`)
                }
            } catch (error) {
                console.log(error)
                setError(ERROR_UNKNOWN)
                setSaving(false)
            }
        },
        [advert]
    )
    return (
        <AdvertForm
            title={title}
            error={error}
            advert={advert}
            terms={terms}
            categories={categories}
            disabled={saving}
            onSave={save}
        />
    )
}
