import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
    points: number;
    setPoints: React.Dispatch<React.SetStateAction<number>>;
    energy: number;
    setEnergy: React.Dispatch<React.SetStateAction<number>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC = ({ children }:any) => {
    const [points, setPoints] = useState<number>(0);
    const [energy, setEnergy] = useState<number>(1000);

    return (
        <AppContext.Provider value={{ points, setPoints, energy, setEnergy }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
