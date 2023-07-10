import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import EditIcon from '@mui/icons-material/Edit'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import AdressIcon from '@mui/icons-material/LocationCity'
import { Profile } from 'profile/types'
import { FC, PropsWithChildren, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { PhraseContext } from 'phrases/PhraseContext'
import { AuthContext } from 'auth'
import { Editorial } from 'editorials'

const PropBox: FC<PropsWithChildren & { icon: React.JSX.Element }> = ({
    children,
    icon,
}) => (
    <Grid container sx={{ alignItems: 'center' }}>
        <Grid item sx={{ m: 1 }}>
            {icon}
        </Grid>
        <Grid item sx={{ flex: 1 }}>
            {children}
        </Grid>
    </Grid>
)

const InfoText = /* markdown */ `
# Din profil är viktig!

När du skapar en annons kopieras innehållet i din profil till den nya annonsen. 

Du kan fortfarande ändra alla uppgifter i annonsen, men skriver du
bara rätt här slipper du kanske lite pyssel senare.
`
export const ProfileView: FC<{ profile: Profile }> = ({ profile }) => {
    const { signout } = useContext(AuthContext)
    const navigate = useNavigate()

    const { SIGNOUT, EDIT_PROFILE } = useContext(PhraseContext)
    return (
        <Card>
            <CardContent>
                <Editorial variant="info">{InfoText}</Editorial>
                <PropBox icon={<EmailIcon />}>
                    <Typography variant="h5" component="div" gutterBottom>
                        {profile.email}
                    </Typography>
                </PropBox>
                <PropBox icon={<PhoneIcon />}>
                    <Typography variant="h6" gutterBottom>
                        {profile.phone}
                    </Typography>
                </PropBox>
                <PropBox icon={<AdressIcon />}>
                    {[
                        profile.adress,
                        profile.zipCode,
                        profile.city,
                        profile.country,
                    ]
                        .map((v) => v && v.trim())
                        .filter((v) => v)
                        .map((v, index) => (
                            <Typography
                                key={index}
                                variant="body1"
                                gutterBottom
                            >
                                {v}
                            </Typography>
                        ))}
                </PropBox>
            </CardContent>
            <CardActions>
                <Button color="primary" component={NavLink} to="/profile/edit">
                    <EditIcon />
                    {EDIT_PROFILE}
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    sx={{ marginLeft: 'auto' }}
                    onClick={() => {
                        navigate('/')
                        signout()
                    }}
                >
                    <LogoutIcon />
                    {SIGNOUT}
                </Button>
            </CardActions>
        </Card>
    )
}