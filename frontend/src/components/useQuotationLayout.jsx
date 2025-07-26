
import { useState, useCallback } from 'react';

const DEFAULT_STYLES = {
  fontSize: 'text-sm',
  fontWeight: 'font-normal',
  textColor: 'text-gray-800',
  backgroundColor: 'bg-white',
  borderStyle: 'border-gray-300',
  borderWidth: 'border',
  padding: 'p-2'
};

const DEFAULT_POSITIONS = {
  header: { x: 0, y: 0, width: 600, height: 60 },
  'company-info': { x: 0, y: 80, width: 600, height: 180 },
  'client-info': { x: 0, y: 280, width: 600, height: 40 },
  title: { x: 0, y: 340, width: 600, height: 50 },
  'items-table': { x: 0, y: 400, width: 600, height: 160 },
  totals: { x: 0, y: 580, width: 400, height: 120 },
  notes: { x: 0, y: 720, width: 400, height: 80 },
  terms: { x: 0, y: 820, width: 400, height: 80 },
  footer: { x: 0, y: 920, width: 400, height: 60 }
};

export const useQuotationLayout = () => {
  const [componentPositions, setComponentPositions] = useState(() => {
    const saved = localStorage.getItem('quotation-layout');
    return saved ? JSON.parse(saved) : DEFAULT_POSITIONS;
  });
  
  const [componentStyles, setComponentStyles] = useState(() => {
    const saved = localStorage.getItem('quotation-styles');
    return saved ? JSON.parse(saved) : {};
  });
  
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [gridSize, setGridSize] = useState(20);

  const snapToGridValue = useCallback((value) => {
    if (!snapToGrid) return value;
    return Math.round(value / gridSize) * gridSize;
  }, [snapToGrid, gridSize]);

  const updatePosition = useCallback((id, position) => {
    const snappedPosition = {
      x: snapToGridValue(position.x),
      y: snapToGridValue(position.y),
      width: position.width || componentPositions[id]?.width || 'auto',
      height: position.height || componentPositions[id]?.height || 'auto'
    };
    
    setComponentPositions(prev => ({
      ...prev,
      [id]: { ...prev[id], ...snappedPosition }
    }));
  }, [snapToGridValue, componentPositions]);

  const updateSize = useCallback((id, size) => {
    setComponentPositions(prev => ({
      ...prev,
      [id]: { ...prev[id], ...size }
    }));
  }, []);

  const updateStyle = useCallback((id, styles) => {
    setComponentStyles(prev => ({
      ...prev,
      [id]: { ...DEFAULT_STYLES, ...prev[id], ...styles }
    }));
  }, []);

  const getComponentStyle = useCallback((id) => {
    return { ...DEFAULT_STYLES, ...componentStyles[id] };
  }, [componentStyles]);

  const saveLayout = useCallback(() => {
    localStorage.setItem('quotation-layout', JSON.stringify(componentPositions));
    localStorage.setItem('quotation-styles', JSON.stringify(componentStyles));
  }, [componentPositions, componentStyles]);

  const loadLayout = useCallback(() => {
    const savedPositions = localStorage.getItem('quotation-layout');
    const savedStyles = localStorage.getItem('quotation-styles');
    
    if (savedPositions) setComponentPositions(JSON.parse(savedPositions));
    if (savedStyles) setComponentStyles(JSON.parse(savedStyles));
  }, []);

  const resetLayout = useCallback(() => {
    setComponentPositions(DEFAULT_POSITIONS);
    setComponentStyles({});
    localStorage.removeItem('quotation-layout');
    localStorage.removeItem('quotation-styles');
  }, []);

  return {
    componentPositions,
    componentStyles,
    snapToGrid,
    setSnapToGrid,
    gridSize,
    setGridSize,
    updatePosition,
    updateSize,
    updateStyle,
    getComponentStyle,
    saveLayout,
    loadLayout,
    resetLayout
  };
};
