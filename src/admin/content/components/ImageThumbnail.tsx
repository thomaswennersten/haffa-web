import { Box, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export const ImageThumbnail = (props: {
    url: string
    onDelete: () => void
}) => (
    <Box component="div" sx={{ position: 'relative' }}>
        <Box component="img" src={props.url} height={128} />
        <IconButton
            color="warning"
            size="small"
            onClick={props.onDelete}
            sx={{ position: 'absolute', top: 0, left: 0 }}
        >
            <DeleteIcon />
        </IconButton>
    </Box>
)
