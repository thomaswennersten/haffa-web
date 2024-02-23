import { Card, CardContent, TextField, Typography } from '@mui/material'
import { FC, useCallback, useState } from 'react'
import { AdminActionPanel } from 'components/AdminActionPanel'
import { AdminEditorialPanel } from 'components/AdminEditorialPanel'
import { objectToOptions, optionsToObject } from 'options/mappers'
import { ImageThumbnail } from 'admin/content/components/ImageThumbnail'
import { ImageBrowseButton } from 'admin/content/components/ImageBrowseButton'
import {
    HtmlOptions,
    type HtmlOptionKeys,
    type Option,
} from '../../options/types'
import { getDefaultHtmlOptions } from './mappers'

export const EditHtmlForm: FC<{
    options: Option<HtmlOptionKeys>[]
    onUpdate: (
        options: Option<HtmlOptionKeys>[]
    ) => Promise<Option<HtmlOptionKeys>[]>
}> = ({ options, onUpdate }) => {
    // Transform and cache
    const [state, setState] = useState<HtmlOptions>({
        ...getDefaultHtmlOptions(),
        ...optionsToObject<HtmlOptionKeys>(options),
    })

    const patch = useCallback(
        (property: Partial<HtmlOptions>) =>
            setState({
                ...state,
                ...property,
            }),
        [state]
    )

    return (
        <>
            <AdminEditorialPanel
                headline="ADMIN_HTML_HEADLINE"
                body="ADMIN_HTML_BODY"
            />
            <AdminActionPanel
                disabled={false}
                onSave={() => onUpdate(objectToOptions<HtmlOptionKeys>(state))}
                onRestore={() => setState(getDefaultHtmlOptions())}
            />
            <Card>
                <CardContent>
                    <TextField
                        fullWidth
                        sx={{ mt: 2 }}
                        value={state.title}
                        label="Titel"
                        helperText="Detta är texten som visas i webbläsarens flikrad"
                        inputProps={{
                            maxLength: 32,
                        }}
                        onChange={({ target: { value: title } }) =>
                            patch({ title })
                        }
                    />
                    <TextField
                        fullWidth
                        sx={{ mt: 2 }}
                        value={state.description}
                        label="Beskrivning"
                        helperText="Beskrivningstext som visas om du delar länken till appen med någon annan"
                        inputProps={{
                            maxLength: 128,
                        }}
                        onChange={({ target: { value: description } }) =>
                            patch({ description })
                        }
                    />
                    <TextField
                        fullWidth
                        sx={{ mt: 2 }}
                        value={state.url}
                        label="Url"
                        helperText="URL som visas om du delar länken till appen med någon annan."
                        onChange={({ target: { value: url } }) =>
                            patch({ url })
                        }
                    />
                    <>
                        <Typography sx={{ my: 2 }}>
                            Bild som visas när du delar länken till appen med
                            någon annan. Den maximala filstorleken är 32kb
                        </Typography>
                        {state.image !== '' && (
                            <ImageThumbnail
                                url={state.image}
                                onDelete={() =>
                                    patch({
                                        image: getDefaultHtmlOptions().image,
                                    })
                                }
                            />
                        )}
                        <ImageBrowseButton
                            maxSize={32 * 1024}
                            onUpdate={(image) => patch({ image })}
                        />
                    </>
                    <>
                        <Typography sx={{ my: 2 }}>
                            Bild som visas i webbläsarens flikrad. Bilden skall
                            vara i formatet .png och ha dimensionerna 16x16
                            eller 32x32 för bästa resultat. Den maximala
                            filstorleken är 16kb
                        </Typography>
                        {state.favicon !== '' && (
                            <ImageThumbnail
                                url={state.favicon}
                                onDelete={() =>
                                    patch({
                                        favicon:
                                            getDefaultHtmlOptions().favicon,
                                    })
                                }
                            />
                        )}
                        <ImageBrowseButton
                            maxSize={16 * 1024}
                            onUpdate={(favicon) => patch({ favicon })}
                            filter="png"
                        />
                    </>
                </CardContent>
            </Card>
        </>
    )
}
