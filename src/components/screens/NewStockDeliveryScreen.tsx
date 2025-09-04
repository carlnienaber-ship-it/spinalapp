import React, { useState } from 'react';
import { NewStockDelivery } from '../../types';
import { ALL_STOCK_ITEMS } from '../../constants';
import Button from '../ui/Button';
import Header from '../ui/Header';
import NumericInput from '../ui/NumericInput';

interface NewStockDeliveryScreenProps {
  onFinish: (deliveries: NewStockDelivery[]) => void;
}

const NewStockDeliveryScreen: React.FC<NewStockDeliveryScreenProps> = ({ onFinish }) => {
    const [deliveries, setDeliveries] = useState<NewStockDelivery[]>([{ id: crypto.randomUUID(), productName: '', quantity: 0 }]);

    const handleUpdate = (id: string, field: 'productName' | 'quantity', value: string | number) => {
        setDeliveries(current =>
            current.map(d => (d.id === id ? { ...d, [field]: value } : d))
        );
    };
    
    const handleAdd = () => {
        setDeliveries(current => [...current, { id: crypto.randomUUID(), productName: '', quantity: 0 }]);
    };
    
    const handleRemove = (id: string) => {
        setDeliveries(current => current.filter(d => d.id !== id));
    };
    
    const isFormValid = deliveries.every(d => d.productName && d.quantity > 0);
    
    const handleSubmit = () => {
        if (isFormValid) {
            onFinish(deliveries);
        }
    };

    return (
        <div className="animate-fade-in">
            <Header title="New Stock Delivery" subtitle="Record any new stock that has arrived."/>
            <div className="space-y-4">
                {deliveries.map((delivery, index) => (
                    <div key={delivery.id} className="p-4 bg-gray-900 rounded-lg border border-gray-800 flex flex-col md:flex-row items-center gap-4">
                        <div className="flex-1 w-full">
                            <label className="block text-sm font-medium text-gray-400 mb-1">Product</label>
                            <select 
                                value={delivery.productName}
                                onChange={e => handleUpdate(delivery.id, 'productName', e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="" disabled>Select a product</option>
                                {ALL_STOCK_ITEMS.map(item => <option key={item} value={item}>{item}</option>)}
                            </select>
                        </div>
                        <div className="w-full md:w-40">
                             <label className="block text-sm font-medium text-gray-400 mb-1">Quantity</label>
                             <NumericInput
                                placeholder="Qty"
                                value={delivery.quantity || undefined}
                                onChange={value => handleUpdate(delivery.id, 'quantity', value || 0)}
                             />
                        </div>
                        {deliveries.length > 1 && (
                             <button onClick={() => handleRemove(delivery.id)} className="p-2 text-red-500 hover:text-red-400 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                             </button>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button 
                    onClick={handleAdd}
                    className="w-full sm:w-auto flex-grow text-blue-400 font-bold py-4 px-4 rounded-lg text-lg transition-all duration-300 ease-in-out bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500"
                >
                    Add Another Item
                </button>
                <div className="w-full sm:w-auto flex-grow">
                  <Button onClick={handleSubmit} disabled={!isFormValid || deliveries.length === 0}>
                      Finish Adding New Stock
                  </Button>
                </div>
            </div>
        </div>
    );
};

export default NewStockDeliveryScreen;
