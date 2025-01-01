'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { Box, TextField, Button } from '@mui/material';

interface Item {
  name: string;
  description: string;
  price: number;
}

export default function AddItem() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<Item>({
    name: '',
    description: '',
    price: 0,
  });

  const mutation = useMutation(
    (newItem: Item) => axios.post('http://localhost:3001/items', newItem),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('items'); // รีเฟรชรายการเมื่อเพิ่มสำเร็จ
        setForm({ name: '', description: '', price: 0 }); // ล้างฟอร์ม
      },
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'price' ? +value : value }); // แปลง price เป็นตัวเลข
  };

  const handleSubmit = () => {
    if (form.name && form.price > 0) mutation.mutate(form);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Add Item
      </Button>
    </Box>
  );
}
