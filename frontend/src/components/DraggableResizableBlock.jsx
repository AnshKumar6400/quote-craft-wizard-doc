
import React, { useState, useEffect, useRef } from 'react';

const DraggableResizableBlock = ({ 
  children, 
  position = { x: 0, y: 0, width: 'auto', height: 'auto' }, 
  id, 
  onPositionChange, 
  onSizeChange,
  style = {},
  snapToGrid = true,
  gridSize = 20,
  containerBounds = { width: 1000, height: 1200 },
  disabled = false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });
  const [showEdgeIndicators, setShowEdgeIndicators] = useState(false);
  const elementRef = useRef(null);

  const snapValue = (value) => {
    if (!snapToGrid) return value;
    return Math.round(value / gridSize) * gridSize;
  };

  const constrainPosition = (pos) => {
    const maxX = containerBounds.width - (position.width || 200);
    const maxY = containerBounds.height - (position.height || 100);
    
    // Enhanced edge snapping
    const snapThreshold = 10;
    let snappedX = Math.max(0, Math.min(snapValue(pos.x), maxX));
    let snappedY = Math.max(0, Math.min(snapValue(pos.y), maxY));
    
    // Snap to edges
    if (snappedX < snapThreshold) snappedX = 0;
    if (snappedY < snapThreshold) snappedY = 0;
    if (snappedX > maxX - snapThreshold) snappedX = maxX;
    if (snappedY > maxY - snapThreshold) snappedY = maxY;
    
    return { x: snappedX, y: snappedY };
  };

  const handleMouseDown = (e) => {
    if (disabled) return;
    
    e.preventDefault();
    
    if (e.target.classList.contains('resize-handle')) {
      setIsResizing(true);
      setResizeDirection(e.target.dataset.direction);
      const rect = elementRef.current.getBoundingClientRect();
      setInitialSize({ width: rect.width, height: rect.height });
      setDragStart({ x: e.clientX, y: e.clientY });
      return;
    }
    
    if (e.target.closest('.drag-handle')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (disabled) return;
    
    if (isDragging) {
      const newPosition = constrainPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
      
      // Show edge indicators when near edges
      const nearEdge = newPosition.x <= 10 || newPosition.y <= 10 || 
                      newPosition.x >= containerBounds.width - 210 || 
                      newPosition.y >= containerBounds.height - 110;
      setShowEdgeIndicators(nearEdge);
      
      onPositionChange(id, newPosition);
    } else if (isResizing) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      let newSize = { ...initialSize };
      
      switch (resizeDirection) {
        case 'se':
          newSize.width = Math.max(100, initialSize.width + deltaX);
          newSize.height = Math.max(50, initialSize.height + deltaY);
          break;
        case 'e':
          newSize.width = Math.max(100, initialSize.width + deltaX);
          break;
        case 's':
          newSize.height = Math.max(50, initialSize.height + deltaY);
          break;
        case 'w':
          newSize.width = Math.max(100, initialSize.width - deltaX);
          break;
        case 'n':
          newSize.height = Math.max(50, initialSize.height - deltaY);
          break;
      }
      
      if (onSizeChange) {
        onSizeChange(id, {
          width: snapValue(newSize.width),
          height: snapValue(newSize.height)
        });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection('');
    setShowEdgeIndicators(false);
  };

  useEffect(() => {
    if ((isDragging || isResizing) && !disabled) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, position, initialSize, disabled]);

  const combinedStyle = {
    left: position.x,
    top: position.y,
    width: typeof position.width === 'number' ? `${position.width}px` : position.width,
    height: typeof position.height === 'number' ? `${position.height}px` : position.height,
    zIndex: isDragging || isResizing ? 1000 : 1,
  };

  const styleClasses = `${style.backgroundColor || 'bg-white'} ${style.borderStyle || 'border-gray-300'} ${style.borderWidth || 'border-2'} ${style.textColor || 'text-gray-800'} ${style.fontSize || 'text-sm'} ${style.fontWeight || 'font-normal'}`;

  if (disabled) {
    return (
      <div
        ref={elementRef}
        className={`absolute ${styleClasses} print:border-none print:static print:transform-none`}
        style={combinedStyle}
      >
        <div className={`${style.padding || 'p-2'} h-full overflow-hidden`}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={elementRef}
      className={`absolute ${styleClasses} ${isDragging ? 'border-blue-500 shadow-lg' : ''} ${isResizing ? 'border-red-500' : ''} print:border-none print:static print:transform-none select-none`}
      style={combinedStyle}
      onMouseDown={handleMouseDown}
    >
      {/* Drag handle */}
      <div className="drag-handle absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-t cursor-move print:hidden hover:bg-blue-600 transition-colors">
        {id}
      </div>
      
      {/* Resize handles */}
      <div className="resize-handle absolute -bottom-2 -right-2 w-4 h-4 bg-blue-500 cursor-se-resize print:hidden hover:bg-blue-600 transition-colors" data-direction="se"></div>
      <div className="resize-handle absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-blue-500 cursor-n-resize print:hidden hover:bg-blue-600 transition-colors" data-direction="n"></div>
      <div className="resize-handle absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-blue-500 cursor-s-resize print:hidden hover:bg-blue-600 transition-colors" data-direction="s"></div>
      <div className="resize-handle absolute -left-2 top-1/2 transform -translate-y-1/2 w-2 h-4 bg-blue-500 cursor-w-resize print:hidden hover:bg-blue-600 transition-colors" data-direction="w"></div>
      <div className="resize-handle absolute -right-2 top-1/2 transform -translate-y-1/2 w-2 h-4 bg-blue-500 cursor-e-resize print:hidden hover:bg-blue-600 transition-colors" data-direction="e"></div>
      
      {/* Grid indicator when snapping */}
      {snapToGrid && (isDragging || isResizing) && (
        <div className="absolute -top-4 -right-4 bg-green-500 text-white text-xs px-1 rounded print:hidden">
          Grid: {gridSize}px
        </div>
      )}
      
      {/* Edge indicators */}
      {showEdgeIndicators && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white text-xs px-2 py-1 rounded print:hidden">
          Snapping to edge
        </div>
      )}
      
      <div className={`${style.padding || 'p-2'} h-full overflow-hidden`}>
        {children}
      </div>
    </div>
  );
};

export default DraggableResizableBlock;
