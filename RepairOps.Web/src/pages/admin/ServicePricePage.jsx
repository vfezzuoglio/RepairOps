import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllServicePrices, createServicePrice, deleteServicePrice } from '../../api/adminApi';

function ServicePricePage() {
  const navigate = useNavigate();
  const [prices, setPrices] = useState([]);
  const [newPrice, setNewPrice] = useState({ serviceName: '', brand: '', model: '', price: '' });

  useEffect(() => {
    getAllServicePrices().then(res => setPrices(res.data));
  }, []);

  const handleCreate = async () => {
    if (!newPrice.serviceName || !newPrice.brand || !newPrice.model || !newPrice.price) return;
    await createServicePrice({
      ...newPrice,
      price: parseFloat(newPrice.price)
    });
    const res = await getAllServicePrices();
    setPrices(res.data);
    setNewPrice({ serviceName: '', brand: '', model: '', price: '' });
  };

  const handleDelete = async (id) => {
    await deleteServicePrice(id);
    setPrices(prices.filter(p => p.id !== id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Service Price List</h2>
        <button onClick={() => navigate('/admin')}>← Back to Admin</button>
      </div>

      {/* Add New Price Form */}
      <div style={{ backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px' }}>Add New Service Price</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            placeholder="Service Name (e.g. Screen Repair)"
            value={newPrice.serviceName}
            onChange={(e) => setNewPrice({ ...newPrice, serviceName: e.target.value })}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
          />
          <input
            placeholder="Brand (e.g. Apple)"
            value={newPrice.brand}
            onChange={(e) => setNewPrice({ ...newPrice, brand: e.target.value })}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
          />
          <input
            placeholder="Model (e.g. iPhone 14)"
            value={newPrice.model}
            onChange={(e) => setNewPrice({ ...newPrice, model: e.target.value })}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
          />
          <input
            placeholder="Price (e.g. 150)"
            value={newPrice.price}
            onChange={(e) => setNewPrice({ ...newPrice, price: e.target.value })}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '120px' }}
          />
          <button
            onClick={handleCreate}
            style={{ backgroundColor: '#2563eb', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
          >
            Add Price
          </button>
        </div>
      </div>

      {/* Price List Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Service</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Brand</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Model</th>
            <th style={{ padding: '12px', textAlign: 'right' }}>Price</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price, index) => (
            <tr key={price.id} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb' }}>
              <td style={{ padding: '12px' }}>{price.serviceName}</td>
              <td style={{ padding: '12px' }}>{price.brand}</td>
              <td style={{ padding: '12px' }}>{price.model}</td>
              <td style={{ padding: '12px', textAlign: 'right' }}>${price.price}</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>
                <button
                  onClick={() => handleDelete(price.id)}
                  style={{ backgroundColor: '#dc2626', color: 'white', padding: '4px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServicePricePage;
