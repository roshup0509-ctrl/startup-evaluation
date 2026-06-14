import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { EvaluationInput, EvaluationResult, Notification } from "@/lib/types";
import { evaluateIdea } from "@/lib/scoring";
import { getItem, setItem } from "@/lib/storage";
import { initialEvaluations } from "@/lib/seed";

interface EvaluationsContextType {
  evaluations: EvaluationResult[];
  addEvaluation: (input: EvaluationInput) => EvaluationResult;
  deleteEvaluation: (id: string) => void;
  getById: (id: string) => EvaluationResult | undefined;
  notifications: Notification[];
  markAsRead: (id: string) => void;
}

const EvaluationsContext = createContext<EvaluationsContextType | undefined>(undefined);

export function EvaluationsProvider({ children }: { children: ReactNode }) {
  const [evaluations, setEvaluations] = useState<EvaluationResult[]>(() => {
    return getItem("evaluations", initialEvaluations);
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    return getItem("notifications", [
      { id: "n1", title: "New high score!", description: "Cloud Kitchen Network scored 85%.", date: new Date().toISOString(), read: false },
      { id: "n2", title: "System Alert", description: "Market data updated.", date: new Date().toISOString(), read: false }
    ]);
  });

  useEffect(() => {
    setItem("evaluations", evaluations);
  }, [evaluations]);

  useEffect(() => {
    setItem("notifications", notifications);
  }, [notifications]);

  const addEvaluation = (input: EvaluationInput) => {
    const result = evaluateIdea(input);
    setEvaluations(prev => [result, ...prev]);
    return result;
  };

  const deleteEvaluation = (id: string) => {
    setEvaluations(prev => prev.filter(e => e.id !== id));
  };

  const getById = (id: string) => {
    return evaluations.find(e => e.id === id);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <EvaluationsContext.Provider value={{ evaluations, addEvaluation, deleteEvaluation, getById, notifications, markAsRead }}>
      {children}
    </EvaluationsContext.Provider>
  );
}

export function useEvaluations() {
  const context = useContext(EvaluationsContext);
  if (context === undefined) {
    throw new Error("useEvaluations must be used within an EvaluationsProvider");
  }
  return context;
}
