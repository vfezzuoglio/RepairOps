import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllParts, createPart } from '../../api/inventoryApi';

function InventoryPage() {
  const navigate = useNavigate();
  const [parts, setParts] = useState([]);
  const [newPart, setNewPart] = useState({
    name: '',
    partNumber: '',
    quantity: '',
    lowStockThreshold: ''
  });

  useEffect(() => {
    getAllParts().then(res => setParts(res.data));
  }, []);

  const handleCreatePart = async () => {
    await createPart({
      name: newPart.name,
      partNumber: parseInt(newPart.partNumber),
      quantity: parseInt(newPart.quantity),
      lowStockThreshold: parseInt(newPart.lowStockThreshold)
    });
    const res = await getAllParts();
    setParts(res.data);
    setNewPart({ name: '', partNumber: '', quantity: '', lowStockThreshold: '' });
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Inventory</h2>
        <button onClick={() => navigate('/')}>← Back to Queue</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Part Number</th>
            <th>Quantity</th>
            <th>Low Stock</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part) => (
            <tr key={part.id} style={{ color: part.isLowStock ? 'red' : 'inherit' }}>
              <td>{part.name}</td>
              <td>{part.partNumber}</td>
              <td>{part.quantity}</td>
              <td>{part.isLowStock ? '⚠️ Low Stock' : '✓'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New Part</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input
          placeholder="Name"
          value={newPart.name}
          onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
        />
        <input
          placeholder="Part Number"
          value={newPart.partNumber}
          onChange={(e) => setNewPart({ ...newPart, partNumber: e.target.value })}
        />
        <input
          placeholder="Quantity"
          value={newPart.quantity}
          onChange={(e) => setNewPart({ ...newPart, quantity: e.target.value })}
        />
        <input
          placeholder="Low Stock Threshold"
          value={newPart.lowStockThreshold}
          onChange={(e) => setNewPart({ ...newPart, lowStockThreshold: e.target.value })}
        />
        <button onClick={handleCreatePart}>Add Part</button>
      </div>
    </div>
  );
}

export default InventoryPage;