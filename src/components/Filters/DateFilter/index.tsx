import { useState } from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';

import { setDateFilter } from '@/store/filters';
import { useDispatch } from '@/hooks/useDispatch';

type FilterVariant = 'ASC' | 'DESC';

const DateFilter = () => {
  const dispatch = useDispatch();
  const [filterValue, setFilterValue] = useState<FilterVariant>('DESC');

  const handleFilterChange = (e: SelectChangeEvent) => {
    setFilterValue(e.target.value as FilterVariant);

    dispatch(setDateFilter(e.target.value as FilterVariant));
  };

  return (
    <Select
      id="author_name"
      name="author_name"
      value={filterValue}
      onChange={handleFilterChange}
      variant="outlined"
      style={{ width: '250px', borderRadius: '12px' }}
    >
      <MenuItem value="DESC">От новых до старых</MenuItem>
      <MenuItem value="ASC">От старых до новых</MenuItem>
    </Select>
  );
};

export default DateFilter;
