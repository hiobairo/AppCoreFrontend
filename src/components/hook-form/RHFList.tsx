import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  StackProps,
  Typography,
} from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import Scrollbar from '../Scrollbar';

interface RHFListItem {
  label: string;
  value: string;
}

type RHFListProps = {
  name: string;
  items: RHFListItem[];
  label?: string;
  dense?: boolean;
  emptyMessage?: React.ReactNode;
} & StackProps;

function RHFList({ name, label, items, emptyMessage, ...props }: RHFListProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const selectedItems = (field.value || []) as string[];
        const isSelected = (item: RHFListItem) => selectedItems.includes(item.value);

        const handleToggle = (item: RHFListItem) => () => {
          const newSelection = isSelected(item)
            ? selectedItems.filter((selectedItem) => selectedItem !== item.value)
            : [...selectedItems, item.value];
          field.onChange(newSelection);
        };

        return (
          <Scrollbar sx={{ maxHeight: '60vh' }}>
            <List direction="column" {...props} dense component={Stack}>
              {label && (
                <Typography variant="body1" fontWeight="bold" alignSelf="center">
                  {label}
                </Typography>
              )}

              {items.length ? (
                items.map((item) => (
                  <ListItem key={item.value} disablePadding>
                    <ListItemButton onClick={handleToggle(item)}>
                      <ListItemIcon>
                        <Checkbox checked={isSelected(item)} onChange={handleToggle(item)} />
                      </ListItemIcon>

                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                ))
              ) : typeof emptyMessage === 'string' || typeof emptyMessage === 'undefined' ? (
                <Typography variant="body1" color="text.secondary" alignSelf="center">
                  {emptyMessage ?? 'No items found'}
                </Typography>
              ) : (
                emptyMessage
              )}
            </List>
          </Scrollbar>
        );
      }}
    />
  );
}

export default RHFList;
