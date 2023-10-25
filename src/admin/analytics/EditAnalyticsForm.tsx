import {
    Button,
    Card,
    CardActions,
    CardContent,
    FormControl,
    FormLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material'
import { FC, useContext, useState } from 'react'
import { Editorial } from 'editorials'
import SaveIcon from '@mui/icons-material/Save'
import { PhraseContext } from 'phrases'
import { getOption } from 'options'
import { AnalyticsOptions } from 'analytics/types'
import type { Option } from '../../options/types'

const NS = 'ANALYTICS'

export const EditAnalyticsForm: FC<{
    options: Option<AnalyticsOptions>[]
    onUpdate: (options: Option<AnalyticsOptions>[]) => void
}> = ({ options, onUpdate }) => {
    const { phrase } = useContext(PhraseContext)

    const [provider, setProvider] = useState(
        getOption('provider', options) ?? 'none'
    )
    const [config, setConfig] = useState(getOption('config', options) ?? '')

    return (
        <Card>
            <Editorial>
                {phrase(
                    `${NS}_SECTION_EDITORIAL`,
                    'Definitioner för web-analys'
                )}
            </Editorial>
            <CardContent>
                <FormControl fullWidth>
                    <FormLabel id="analytics-provider-label">
                        {phrase(`${NS}_FIELD_PROVIDER`, 'Leverantör')}
                    </FormLabel>
                    <Select
                        labelId="analytics-provider-label"
                        value={provider}
                        onChange={(event) => {
                            setProvider(event?.target.value)
                        }}
                    >
                        <MenuItem value="none">
                            {phrase(`${NS}_PROVIDER_OPTION_NONE`, 'Ej aktiv')}
                        </MenuItem>
                        <MenuItem value="matomo">
                            {phrase(`${NS}_PROVIDER_OPTION_MATOMO`, 'Matomo')}
                        </MenuItem>
                        <MenuItem value="google">
                            {phrase(`${NS}_PROVIDER_OPTION_GOOGLE`, 'Google')}
                        </MenuItem>
                    </Select>
                    <FormLabel
                        id="analytics-config-label"
                        sx={{ paddingTop: 3 }}
                    >
                        {phrase(`${NS}_FIELD_CONFIG`, 'Konfiguration')}
                    </FormLabel>
                    <TextField
                        fullWidth
                        value={config}
                        disabled={provider === 'none'}
                        onChange={(event) => {
                            setConfig(event?.target.value)
                        }}
                    />
                </FormControl>
            </CardContent>
            <CardActions>
                <Button
                    id={`${NS}_ACTION_SAVE`}
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={() =>
                        onUpdate([
                            {
                                key: 'config',
                                value: config,
                            },
                            {
                                key: 'provider',
                                value: provider,
                            },
                        ])
                    }
                >
                    {phrase(`${NS}_ACTION_SAVE`, 'Spara')}
                </Button>
            </CardActions>
        </Card>
    )
}
