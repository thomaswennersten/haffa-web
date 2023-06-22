import React, { FC, PropsWithChildren, useCallback, useContext, useState } from 'react'
import { Alert, Box, Button, Grid, GridProps } from '@mui/material'
import { Advert } from '../lib/adverts/types'
import { useFormControls } from '../hooks/use-form-controls'
import SaveIcon from '@mui/icons-material/Save'
import { AdvertsContext } from '../lib/adverts/AdvertsContext'
import { useNavigate } from 'react-router-dom'
import { Phrase } from '../phrases/Phrase'

const Row: FC<PropsWithChildren & GridProps> = (props) => <Grid container spacing={2} sx={{ pt: 2 }} {...props}>{props.children}</Grid>
const Cell: FC<PropsWithChildren & GridProps> = (props) => <Grid item {...props}>{props.children}</Grid>

const AdvertForm: FC<{advert: Advert, disabled: boolean, onSave: (advert: Advert) => void}> = ({ advert, onSave, disabled }) => {
	const { model, simplifiedFactory: { textField } } = useFormControls<Advert>(advert)
	const layout = [
		[
			() => textField('title', 'Titel',{ required: true, disabled  }),
		], [
			() => textField('description', 'Beskrivning',{ required: true, multiline: true, minRows: 4, disabled }),
		],
	]
	return (
		<Box component="form" onSubmit={e => {
			e.preventDefault()
			onSave(model)
			return false}}>
			{layout.map((row, rowIndex) => (
				<Row key={rowIndex}>
					{row.map((cell, cellIndex) => (
						<Cell key={cellIndex}>{cell()}</Cell>
					))}

				</Row>))}
			<Row justifyContent="flex-end">
				<Cell>
					<Button type="submit" variant="contained" startIcon={<SaveIcon/>} disabled={disabled}>Spara annonsen</Button>
				</Cell>
			</Row>
		</Box>)

}

export const EditNewAdvert: FC = () => {
	const [ advert, setAdvert ] = useState<Advert>({ id: '', title: '', description: '' })
	const [ saving, setSaving ] = useState(false)
	const [ error, setError ] = useState(false)
	const { createAdvert } = useContext(AdvertsContext)
	const navigate = useNavigate()

	const save = useCallback(async (a: Advert) => {
		setSaving(true)
		setAdvert(a)
		try {
			const { id } = await createAdvert(a)
			setSaving(false)
			setError(false)
			navigate(`/advert/${id}`)
		} catch (error) {
			setError(true)
			setSaving(false)
		}
	},[advert])
	return (
		<>
			{error && <Alert severity='error'><Phrase key='ERROR_UNKNOWN' value='Ajsing bajsing, något gick sönder :('/></Alert>}
			<AdvertForm advert={advert} disabled={saving} onSave={save}/>
		</>)
}