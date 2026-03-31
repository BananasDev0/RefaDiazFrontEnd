import { useMemo, useState } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import type { VehicleNote } from '../../types/vehicleNote.types';
import { getPublicStorageUrl } from '../../utils/storage';
import { useVehicleNoteMutations } from '../../hooks/useVehicleNotes';

interface VehicleNoteCardProps {
  note: VehicleNote;
}

const getExcerpt = (contentMarkdown: string) =>
  contentMarkdown
    .replace(/[#>*_`\-\[\]]/g, ' ')
    .replace(/\((.*?)\)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 140);

const VehicleNoteCard = ({ note }: VehicleNoteCardProps) => {
  const navigate = useNavigate();
  const { deleteVehicleNote, isDeleting } = useVehicleNoteMutations();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const coverImageUrl = useMemo(
    () => getPublicStorageUrl(note.files?.[0]?.storagePath),
    [note.files]
  );

  const excerpt = getExcerpt(note.contentMarkdown);
  const menuOpen = Boolean(anchorEl);

  const handleDeleteConfirm = async () => {
    if (!note.id) {
      return;
    }

    await deleteVehicleNote(note.id);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardHeader
          title={note.title}
          subheader={note.updatedAt ? `Actualizada ${new Date(note.updatedAt).toLocaleDateString()}` : undefined}
          action={(
            <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
              <MoreVertIcon />
            </IconButton>
          )}
        />
        <CardActionArea onClick={() => navigate(`/vehicle-notes/${note.id}`)} sx={{ flexGrow: 1, alignItems: 'stretch' }}>
          {coverImageUrl && (
            <CardMedia
              component="img"
              height="180"
              image={coverImageUrl}
              alt={note.title}
              sx={{ objectFit: 'cover' }}
            />
          )}
          <CardContent>
            <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', rowGap: 1 }}>
              {note.carModel?.brand?.name && <Chip label={note.carModel.brand.name} size="small" variant="outlined" />}
              {note.carModel?.name && <Chip label={note.carModel.name} size="small" />}
              {!note.carModel && <Chip label="Nota general" size="small" color="default" />}
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {excerpt || 'Sin contenido disponible.'}
            </Typography>
            {note.files?.length > 1 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  {note.files.length} imagenes adjuntas
                </Typography>
              </Box>
            )}
          </CardContent>
        </CardActionArea>
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => {
          navigate(`/vehicle-notes/${note.id}`);
          setAnchorEl(null);
        }}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Ver</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          navigate(`/vehicle-notes/edit/${note.id}`);
          setAnchorEl(null);
        }}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          setIsDialogOpen(true);
          setAnchorEl(null);
        }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Eliminar</ListItemText>
        </MenuItem>
      </Menu>

      <ConfirmDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Eliminar nota"
        description={`Se eliminara la nota "${note.title}".`}
        isSubmitting={isDeleting}
      />
    </>
  );
};

export default VehicleNoteCard;
