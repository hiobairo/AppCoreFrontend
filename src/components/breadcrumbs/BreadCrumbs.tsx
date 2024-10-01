import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';
import { Breadcrumbs, Card, Link } from '@mui/material';
import Iconify from '../iconify/Iconify';
import { localization }  from '@hiobairo/app-core'

const BreadCrumbs = ({
  items
}: {
  items: { name: string; url: string; icon: string }[]
}) => {
  return (
    <Card>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {localization.localize('general.home')}
        </Link>
        {items.map((item) => (
          <Link
            key={item.url}
            underline='hover'
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
            color="inherit"
            href={item.url}
          >
            {item.url === '' && <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />}
            {item.url !== '' && <Iconify icon={item.icon} fontSize={20} />}
            {item.name}
          </Link>
        ))}
      </Breadcrumbs>
    </Card>
  )
}

export default BreadCrumbs;
