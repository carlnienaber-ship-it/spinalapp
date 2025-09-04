import React, { useState, useCallback, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Screen, Task, StockData, NewStockDelivery, User } from '../types';
import { OPENING_TASKS, CLOSING_TASKS, INITIAL_STOCK_DATA } from '../constants';
import WelcomeScreen from './screens/WelcomeScreen';
import TasksScreen from './screens/TasksScreen';
import StocktakeScreen from './screens/StocktakeScreen';
import MotivationalScreen from './screens/MotivationalScreen';
import NewStockDeliveryScreen from './screens/NewStockDeliveryScreen';
import SummaryScreen from './screens/SummaryScreen';
import PendingApprovalScreen from './screens/PendingApprovalScreen';
import Button from './ui/Button';
import Header from './ui/Header';

// The Google Sheet URL is now securely loaded from an environment variable
const GOOGLE_SHEET_WEB_APP_URL = import.meta.env.VITE_GOOGLE_SHEET_WEB_APP_URL;

const App: React.FC = () => {
  const { 
    isLoading, 
    isAuthenticated, 
    user: auth0User, 
    loginWithRedirect, 
    logout 
  } = useAuth0();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Welcome);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [clockOutTime, setClockOutTime] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [openingTasks, setOpeningTasks] = useState<Task[]>(OPENING_TASKS);
  const [closingTasks, setClosingTasks] = useState<Task[]>(CLOSING_TASKS);

  const [openingStock, setOpeningStock] = useState<StockData>(JSON.parse(JSON.stringify(INITIAL_STOCK_DATA)));
  const [closingStock, setClosingStock] = useState<StockData>(JSON.parse(JSON.stringify(INITIAL_STOCK_DATA)));
  const [newStockDeliveries, setNewStockDeliveries] = useState<NewStockDelivery[]>([]);

  // "Deny by Default" logic: User is approved only if they have an assigned role.
  const roles = auth0User?.['https://spinalapp.com/roles'] as string[] || [];
  const isApproved = roles.includes('Normal User') || roles.includes('Admin');
  
  useEffect(() => {
    if (isAuthenticated && auth0User) {
        const appUser: User = {
            name: auth0User.name || auth0User.email || 'User',
            email: auth0User.email || '',
            picture: auth0User.picture,
        };
        setCurrentUser(appUser);

        // Check for persisted shift state when logging in
        const savedShiftStateJSON = localStorage.getItem('bartenderShiftState');
        if (savedShiftStateJSON) {
          const savedState = JSON.parse(savedShiftStateJSON);
          setCurrentScreen(savedState.currentScreen ?? Screen.Welcome);
          setClockInTime(savedState.clockInTime ? new Date(savedState.clockInTime) : null);
          setOpeningTasks(savedState.openingTasks ?? OPENING_TASKS);
          setClosingTasks(savedState.closingTasks ?? CLOSING_TASKS);
          setOpeningStock(savedState.openingStock ?? JSON.parse(JSON.stringify(INITIAL_STOCK_DATA)));
          setClosingStock(savedState.closingStock ?? JSON.parse(JSON.stringify(INITIAL_STOCK_DATA)));
          setNewStockDeliveries(savedState.newStockDeliveries ?? []);
        } else {
          setCurrentScreen(Screen.Welcome);
        }
    } else {
        setCurrentUser(null);
    }
  }, [isAuthenticated, auth0User]);

  // Effect to save shift state to localStorage whenever it changes
  useEffect(() => {
    if (currentUser && isAuthenticated) {
      const stateToPersist = {
        currentScreen,
        clockInTime: clockInTime ? clockInTime.toISOString() : null,
        openingTasks,
        closingTasks,
        openingStock,
        closingStock,
        newStockDeliveries,
      };
      localStorage.setItem('bartenderShiftState', JSON.stringify(stateToPersist));
    }
  }, [currentUser, isAuthenticated, currentScreen, clockInTime, openingTasks, closingTasks, openingStock, closingStock, newStockDeliveries]);

  const handleSignOut = useCallback(() => {
    localStorage.removeItem('bartenderShiftState');
    logout({ logoutParams: { returnTo: window.location.origin } });
  }, [logout]);

  const handleClockIn = useCallback(() => {
    setClockInTime(new Date());
    setCurrentScreen(Screen.OpeningTasks);
  }, []);

  const handleOpeningTasksComplete = useCallback(() => {
    setCurrentScreen(Screen.OpeningStocktake);
  }, []);

  const handleOpeningStocktakeComplete = useCallback(() => {
    setCurrentScreen(Screen.Motivational);
  }, []);
  
  const handleBeginClosing = useCallback(() => {
    setCurrentScreen(Screen.ClosingStocktake);
  }, []);

  const handleGoToNewStock = useCallback(() => {
    setCurrentScreen(Screen.NewStockDelivery);
  }, []);

  const handleNewStockAdded = useCallback((deliveries: NewStockDelivery[]) => {
    setNewStockDeliveries(deliveries);
    setCurrentScreen(Screen.Motivational);
  }, []);

  const handleClosingStocktakeComplete = useCallback(() => {
    setCurrentScreen(Screen.ClosingTasks);
  }, []);

  const processAndSendData = useCallback(async (clockOutTimestamp: Date) => {
    if (!GOOGLE_SHEET_WEB_APP_URL || !GOOGLE_SHEET_WEB_APP_URL.startsWith('https://script.google.com')) {
      console.error("Google Sheets Web App URL is not set correctly in environment variables.");
      setSubmitError("Application is not configured correctly. Please contact the administrator.");
      setIsSubmitting(false);
      return;
    }

    const processedOpeningStock = JSON.parse(JSON.stringify(openingStock));
    
    newStockDeliveries.forEach(delivery => {
        for (const category in processedOpeningStock) {
            const items = processedOpeningStock[category as keyof StockData];
            const item = items.find(i => i.name === delivery.productName);
            if (item) {
                if ('storeRoom' in item) {
                    item.storeRoom = (item.storeRoom || 0) + delivery.quantity;
                } else if ('quantity' in item) {
                    item.quantity = (item.quantity || 0) + delivery.quantity;
                }
                break;
            }
        }
    });

    const addFullBottleTotal = (stock: StockData) => {
        const newStock = JSON.parse(JSON.stringify(stock));
        newStock.spirits = newStock.spirits.map((spirit: any) => ({
            ...spirit,
            fullBottlesTotal: (spirit.frontOfHouse || 0) + (spirit.storeRoom || 0)
        }));
        return newStock;
    };

    const finalReport = {
        user: currentUser,
        clockIn: clockInTime?.toISOString(),
        clockOut: clockOutTimestamp.toISOString(),
        openingTasks,
        closingTasks,
        newStockDeliveries,
        openingStock: addFullBottleTotal(processedOpeningStock),
        closingStock: addFullBottleTotal(closingStock),
    };
    
    console.log("--- SENDING FINAL REPORT ---");
    console.log(JSON.stringify(finalReport, null, 2));

    try {
      const response = await fetch(GOOGLE_SHEET_WEB_APP_URL, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(finalReport),
        redirect: 'follow',
      });

      if (!response.ok) {
          throw new Error(`Submission failed with status: ${response.status} ${response.statusText}`);
      }

      console.log("Data submission request was successful.");
      setCurrentScreen(Screen.Summary);
    } catch (error) {
      console.error('Error submitting data:', error);
      setSubmitError('Failed to save shift data. Please check your internet connection and verify the Web App URL.');
    } finally {
      setIsSubmitting(false);
    }

  }, [clockInTime, openingTasks, closingTasks, newStockDeliveries, openingStock, closingStock, currentUser]);


  const handleClockOut = useCallback(() => {
    const now = new Date();
    setClockOutTime(now);
    setIsSubmitting(true);
    setSubmitError(null);
    processAndSendData(now);
  }, [processAndSendData]);

  const handleStartNewShift = useCallback(() => {
    localStorage.removeItem('bartenderShiftState');
    
    setClockInTime(null);
    setClockOutTime(null);
    setIsSubmitting(false);
    setSubmitError(null);
    setOpeningTasks(JSON.parse(JSON.stringify(OPENING_TASKS)));
    setClosingTasks(JSON.parse(JSON.stringify(CLOSING_TASKS)));
    setOpeningStock(JSON.parse(JSON.stringify(INITIAL_STOCK_DATA)));
    setClosingStock(JSON.parse(JSON.stringify(INITIAL_STOCK_DATA)));
    setNewStockDeliveries([]);
    setCurrentScreen(Screen.Welcome);
  }, []);

  const renderScreen = () => {
    if (isLoading) {
      return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (!isAuthenticated) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <Header title="Bartender Shift App" subtitle="Please log in or sign up to continue" />
          <div className="w-full max-w-sm mt-8">
            <Button onClick={() => loginWithRedirect()}>Login / Sign Up</Button>
          </div>
        </div>
      );
    }
    
    if (!isApproved) {
        return <PendingApprovalScreen onSignOut={handleSignOut} userEmail={auth0User.email} />;
    }

    switch (currentScreen) {
      case Screen.Welcome:
        return <WelcomeScreen user={currentUser} onClockIn={handleClockIn} onSignOut={handleSignOut} />;
      case Screen.OpeningTasks:
        return <TasksScreen 
                    title="START OF SHIFT"
                    tasks={openingTasks}
                    setTasks={setOpeningTasks}
                    onComplete={handleOpeningTasksComplete}
                    buttonText="Begin Opening Stocktake"
                />;
      case Screen.OpeningStocktake:
        return <StocktakeScreen 
                    title="Opening Stocktake"
                    stockData={openingStock}
                    setStockData={setOpeningStock}
                    onComplete={handleOpeningStocktakeComplete}
                />;
      case Screen.Motivational:
        return <MotivationalScreen onBeginClosing={handleBeginClosing} onNewStock={handleGoToNewStock} />;
      case Screen.NewStockDelivery:
        return <NewStockDeliveryScreen onFinish={handleNewStockAdded} />;
      case Screen.ClosingStocktake:
        return <StocktakeScreen 
                    title="Closing Stocktake"
                    stockData={closingStock}
                    setStockData={setClosingStock}
                    onComplete={handleClosingStocktakeComplete}
                    buttonText="Complete Stocktake & Move to Closing Tasks"
                />;
      case Screen.ClosingTasks:
        return <TasksScreen 
                    title="END OF SHIFT"
                    tasks={closingTasks}
                    setTasks={setClosingTasks}
                    onComplete={handleClockOut}
                    buttonText={isSubmitting ? "Submitting..." : "Clock Out"}
                    isSubmitting={isSubmitting}
                    submitError={submitError}
                />;
      case Screen.Summary:
        return <SummaryScreen clockOutTime={clockOutTime} onStartNewShift={handleStartNewShift} />;
      default:
        // Fallback to Welcome screen if state is unexpected
        return <WelcomeScreen user={currentUser} onClockIn={handleClockIn} onSignOut={handleSignOut} />;
    }
  };

  return (
    <div className="min-h-screen bg-black font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;