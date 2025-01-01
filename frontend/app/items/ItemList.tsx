'use client';

import { useQuery } from 'react-query';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';

interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
}

// ฟังก์ชันสำหรับดึงข้อมูลทั้งหมด
const fetchItems = async () => {
  const { data } = await axios.get<Item[]>('http://localhost:3001/items');
  return data;
};

export default function ItemList() {
  const { data: items, refetch } = useQuery('items', fetchItems);

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:3001/items/${id}`);
    refetch(); // รีเฟรชข้อมูลหลังจากลบ
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Item List
      </Typography>
      {items?.map((item) => (
        <Box
          key={item._id}
          sx={{ p: 2, border: '1px solid #ddd', mb: 2, borderRadius: '8px' }}
        >
          <Typography variant="h6">{item.name}</Typography>
          <Typography>{item.description}</Typography>
          <Typography>${item.price}</Typography>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDelete(item._id)}
          >
            Delete
          </Button>
        </Box>
      ))}
    </Box>
  );
}
