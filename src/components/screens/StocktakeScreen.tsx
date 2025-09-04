import React, { useMemo } from 'react';
import { StockData, SpiritItem, StockItem, FoodItem } from '../../types';
import Button from '../ui/Button';
import Header from '../ui/Header';
import NumericInput from '../ui/NumericInput';

interface StocktakeScreenProps {
  title: string;
  stockData: StockData;
  setStockData: React.Dispatch<React.SetStateAction<StockData>>;
  onComplete: () => void;
  buttonText?: string;
}

const StockCategory: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-400" style={{ fontFamily: '"Avenir Next Bold", sans-serif' }}>{title}</h2>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const StocktakeScreen: React.FC<StocktakeScreenProps> = ({ title, stockData, setStockData, onComplete, buttonText = "Stocktake Completed" }) => {

    const handleUpdate = <T,>(category: keyof StockData, index: number, field: keyof T, value: number | undefined) => {
        setStockData(prevData => {
            const newData = { ...prevData };
            const items = [...newData[category]] as T[];
            items[index] = { ...items[index], [field]: value };
            (newData as any)[category] = items;
            return newData;
        });
    };
    
    const isComplete = useMemo(() => {
        return Object.values(stockData).every(category => 
            category.every(item => 
                Object.keys(item).filter(key => key !== 'name').every(key => 
                    (item as any)[key] !== undefined && (item as any)[key] !== null
                )
            )
        );
    }, [stockData]);

    return (
        <div className="animate-fade-in">
            <Header title={title} subtitle="Please record all current stock levels."/>

            <StockCategory title="Spirits">
                {stockData.spirits.map((item, index) => (
                    <div key={item.name} className="p-3 bg-gray-800 rounded-md">
                        <h3 className="font-semibold mb-2">{item.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                           <NumericInput placeholder="Full Bottles (FOH)" value={item.frontOfHouse} onChange={v => handleUpdate<SpiritItem>('spirits', index, 'frontOfHouse', v)} />
                           <NumericInput placeholder="Full Bottles (Store)" value={item.storeRoom} onChange={v => handleUpdate<SpiritItem>('spirits', index, 'storeRoom', v)} />
                           <NumericInput placeholder="Open Bottle Weight (g)" value={item.weight} onChange={v => handleUpdate<SpiritItem>('spirits', index, 'weight', v)} integerOnly={false} />
                        </div>
                    </div>
                ))}
            </StockCategory>

            <StockCategory title="Cans & Bottles">
                {stockData.cansAndBottles.map((item, index) => (
                    <div key={item.name} className="p-3 bg-gray-800 rounded-md">
                        <h3 className="font-semibold mb-2">{item.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <NumericInput placeholder="Front of House" value={item.frontOfHouse} onChange={v => handleUpdate<StockItem>('cansAndBottles', index, 'frontOfHouse', v)} />
                            <NumericInput placeholder="Store Room" value={item.storeRoom} onChange={v => handleUpdate<StockItem>('cansAndBottles', index, 'storeRoom', v)} />
                        </div>
                    </div>
                ))}
            </StockCategory>

            <StockCategory title="Food">
                {stockData.food.map((item, index) => (
                    <div key={item.name} className="p-3 bg-gray-800 rounded-md">
                         <h3 className="font-semibold mb-2">{item.name}</h3>
                         <NumericInput placeholder="Quantity" value={item.quantity} onChange={v => handleUpdate<FoodItem>('food', index, 'quantity', v)} />
                    </div>
                ))}
            </StockCategory>

            <StockCategory title="Brewer's Reserve">
                {stockData.brewersReserve.map((item, index) => (
                     <div key={item.name} className="p-3 bg-gray-800 rounded-md">
                        <h3 className="font-semibold mb-2">{item.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                           <NumericInput placeholder="Front of House" value={item.frontOfHouse} onChange={v => handleUpdate<StockItem>('brewersReserve', index, 'frontOfHouse', v)} />
                           <NumericInput placeholder="Store Room" value={item.storeRoom} onChange={v => handleUpdate<StockItem>('brewersReserve', index, 'storeRoom', v)} />
                        </div>
                    </div>
                ))}
            </StockCategory>

            <div className="mt-8">
                <Button onClick={onComplete} disabled={!isComplete}>{buttonText}</Button>
            </div>
        </div>
    );
};

export default StocktakeScreen;
