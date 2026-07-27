import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { 
  AnalysisResult, 
  ProductComparison, 
  WishlistItem, 
  UserProfile, 
  ActiveTab 
} from '../types';
import { 
  initialUser, 
  initialAnalyses, 
  initialWishlist, 
  initialComparisons 
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  user: UserProfile | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateUserBudget: (budget: number) => void;
  
  analyses: AnalysisResult[];
  addAnalysis: (analysis: AnalysisResult) => void;
  deleteAnalysis: (id: string) => void;
  selectedAnalysis: AnalysisResult | null;
  setSelectedAnalysis: (analysis: AnalysisResult | null) => void;
  
  wishlist: WishlistItem[];
  addWishlistItem: (item: Omit<WishlistItem, 'id' | 'addedAt'>) => void;
  removeWishlistItem: (id: string) => void;
  updateWishlistStatus: (id: string, status: WishlistItem['status']) => void;
  
  comparisons: ProductComparison[];
  addComparison: (comparison: ProductComparison) => void;
  
  toasts: ToastMessage[];
  showToast: (title: string, message?: string, type?: ToastMessage['type']) => void;
  dismissToast: (id: string) => void;

  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('worthit_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('worthit_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Active Tab navigation
  const [activeTab, setActiveTab] = useState<ActiveTab>('landing');

  // User auth state
  const [user, setUser] = useState<UserProfile | null>(initialUser);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const login = (email: string, name?: string) => {
    const newUser: UserProfile = {
      uid: `usr_${Date.now()}`,
      email,
      displayName: name || email.split('@')[0],
      monthlyBudget: 800,
      currency: 'USD',
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    showToast('Welcome to WorthIt AI!', `Signed in as ${newUser.displayName}`, 'success');
  };

  const logout = () => {
    setUser(null);
    showToast('Signed out', 'You have been signed out safely.', 'info');
  };

  const updateUserBudget = (budget: number) => {
    if (user) {
      setUser({ ...user, monthlyBudget: budget });
      showToast('Budget Updated', `Monthly budget updated to $${budget}`, 'success');
    }
  };

  // Analyses state
  const [analyses, setAnalyses] = useState<AnalysisResult[]>(() => {
    const saved = localStorage.getItem('worthit_analyses');
    return saved ? JSON.parse(saved) : initialAnalyses;
  });

  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    localStorage.setItem('worthit_analyses', JSON.stringify(analyses));
  }, [analyses]);

 const addAnalysis = async (analysis: AnalysisResult) => {
  try {
    console.log("Saving analysis...", analysis);

    const docRef = await addDoc(collection(db, "analyses"), {
  ...analysis,
  userId: user?.uid,
  userEmail: user?.email,
  createdAt: serverTimestamp(),
});
    console.log("Saved with ID:", docRef.id);

    setAnalyses((prev) => [analysis, ...prev]);

    showToast(
      'Analysis Saved!',
      `Buy score: ${analysis.buyScore}/100 for ${analysis.input.productName}`,
      'success'
    );

  } catch (error) {
    console.error("Firebase Save Error:", error);
  }
};
  const deleteAnalysis = (id: string) => {
    setAnalyses((prev) => prev.filter((a) => a.id !== id));
    showToast('Analysis Deleted', 'Item removed from your history.', 'info');
  };

  // Wishlist state
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('worthit_wishlist');
    return saved ? JSON.parse(saved) : initialWishlist;
  });

  useEffect(() => {
    localStorage.setItem('worthit_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addWishlistItem = async (item: Omit<WishlistItem, 'id' | 'addedAt'>) => {
  const newItem: WishlistItem = {
    ...item,
    id: `wsh_${Date.now()}`,
    addedAt: new Date().toISOString(),
  };

  try {
    console.log("Saving wishlist...", newItem);

    const docRef = await addDoc(collection(db, "wishlist"), newItem);

    console.log("Wishlist saved:", docRef.id);

    setWishlist((prev) => [newItem, ...prev]);

    showToast(
      "Added to Wishlist",
      `${item.productName} is now in your watchlist`,
      "success"
    );
  } catch (error) {
    console.error("Error saving wishlist:", error);
  }
};

  const removeWishlistItem = (id: string) => {
    setWishlist((prev) => prev.filter((i) => i.id !== id));
    showToast('Removed', 'Wishlist item removed.', 'info');
  };

  const updateWishlistStatus = (id: string, status: WishlistItem['status']) => {
    setWishlist((prev) => prev.map((item) => item.id === id ? { ...item, status } : item));
    showToast('Status Updated', `Item set to ${status}`, 'info');
  };

  // Comparisons state
  const [comparisons, setComparisons] = useState<ProductComparison[]>(() => {
    const saved = localStorage.getItem('worthit_comparisons');
    return saved ? JSON.parse(saved) : initialComparisons;
  });

  useEffect(() => {
    localStorage.setItem('worthit_comparisons', JSON.stringify(comparisons));
  }, [comparisons]);

  const addComparison = (comparison: ProductComparison) => {
    setComparisons((prev) => [comparison, ...prev]);
    showToast('Comparison Generated', `Winner: ${comparison.recommendedWinner}`, 'success');
  };

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, message?: string, type: ToastMessage['type'] = 'info') => {
    const id = `tst_${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => dismissToast(id), 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        user,
        login,
        logout,
        updateUserBudget,
        analyses,
        addAnalysis,
        deleteAnalysis,
        selectedAnalysis,
        setSelectedAnalysis,
        wishlist,
        addWishlistItem,
        removeWishlistItem,
        updateWishlistStatus,
        comparisons,
        addComparison,
        toasts,
        showToast,
        dismissToast,
        authModalOpen,
        setAuthModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
