import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

interface Props {
  window?: () => Window;
  readonly  navegue: (page: string) =>  void;
  readonly  saveCafe: () =>  void;
  readonly  deleteCafe: () =>  void;
}

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const { navegue} = props;
  const { saveCafe} = props;
  const { deleteCafe} = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  const  goList = () => {
    navegue('List');
  }

  const goSave = () => {
    saveCafe();
  }

  const goDelete = () => {
    deleteCafe();
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" color="secondary">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <IconButton color="primary" aria-label="upload picture" component="label" onClick={goList}>
              <KeyboardBackspaceIcon />
            </IconButton>

            Detalhes do Café
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button variant="contained" color="primary" onClick={goDelete}>Excluir</Button>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button variant="contained" color="primary" onClick={goSave}>Salvar</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true}}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
              Detalhes do Café
            </Typography>
            <Divider />
            <IconButton color="primary" aria-label="upload picture" component="label" onClick={goList}>
              <KeyboardBackspaceIcon />
            </IconButton>
            <Button variant="contained" color="primary" onClick={goDelete}>Excluir</Button>
            <Button variant="contained" color="primary" onClick={goSave}>Salvar</Button>
          </Box>

        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}