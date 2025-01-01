import Image from 'next/image';
import ItemList from './items/ItemList';
import AddItem from './items/AddItem';

export default function Home() {
  return (
    <main style={{ padding: '20px' }}>
      <h1>Item Management</h1>
      <AddItem />
      <ItemList />
    </main>
  );
}
