
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Palette, Type, Layout, Grid, Save, RotateCcw } from 'lucide-react';

const CustomizationPanel = ({ 
  selectedComponent, 
  onStyleChange, 
  getComponentStyle,
  snapToGrid, 
  setSnapToGrid, 
  gridSize, 
  setGridSize,
  onSaveLayout,
  onResetLayout 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('style');

  if (!selectedComponent) return null;

  const currentStyle = getComponentStyle(selectedComponent);

  const fontSizes = [
    { label: 'XS', value: 'text-xs' },
    { label: 'SM', value: 'text-sm' },
    { label: 'MD', value: 'text-base' },
    { label: 'LG', value: 'text-lg' },
    { label: 'XL', value: 'text-xl' },
    { label: '2XL', value: 'text-2xl' }
  ];

  const fontWeights = [
    { label: 'Normal', value: 'font-normal' },
    { label: 'Medium', value: 'font-medium' },
    { label: 'Bold', value: 'font-bold' }
  ];

  const colors = [
    { label: 'Gray 800', value: 'text-gray-800' },
    { label: 'Black', value: 'text-black' },
    { label: 'Blue', value: 'text-blue-600' },
    { label: 'Red', value: 'text-red-600' },
    { label: 'Green', value: 'text-green-600' }
  ];

  const backgrounds = [
    { label: 'White', value: 'bg-white' },
    { label: 'Gray 50', value: 'bg-gray-50' },
    { label: 'Blue 50', value: 'bg-blue-50' },
    { label: 'Yellow 50', value: 'bg-yellow-50' },
    { label: 'Green 50', value: 'bg-green-50' }
  ];

  const borders = [
    { label: 'Gray', value: 'border-gray-300' },
    { label: 'Black', value: 'border-black' },
    { label: 'Blue', value: 'border-blue-500' },
    { label: 'Red', value: 'border-red-500' }
  ];

  const borderWidths = [
    { label: 'None', value: 'border-0' },
    { label: 'Thin', value: 'border' },
    { label: 'Medium', value: 'border-2' },
    { label: 'Thick', value: 'border-4' }
  ];

  return (
    <Card className="fixed right-4 top-4 w-80 z-50 print:hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Customize: {selectedComponent}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="pt-0">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-4">
            <Button
              variant={activeTab === 'style' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('style')}
              className="flex-1"
            >
              <Palette className="h-3 w-3 mr-1" />
              Style
            </Button>
            <Button
              variant={activeTab === 'layout' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('layout')}
              className="flex-1"
            >
              <Layout className="h-3 w-3 mr-1" />
              Layout
            </Button>
          </div>

          {activeTab === 'style' && (
            <div className="space-y-4">
              {/* Font Size */}
              <div>
                <label className="text-xs font-medium mb-1 block">Font Size</label>
                <div className="grid grid-cols-3 gap-1">
                  {fontSizes.map((size) => (
                    <Button
                      key={size.value}
                      variant={currentStyle.fontSize === size.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => onStyleChange(selectedComponent, { fontSize: size.value })}
                    >
                      {size.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Font Weight */}
              <div>
                <label className="text-xs font-medium mb-1 block">Font Weight</label>
                <div className="grid grid-cols-3 gap-1">
                  {fontWeights.map((weight) => (
                    <Button
                      key={weight.value}
                      variant={currentStyle.fontWeight === weight.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => onStyleChange(selectedComponent, { fontWeight: weight.value })}
                    >
                      {weight.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Text Color */}
              <div>
                <label className="text-xs font-medium mb-1 block">Text Color</label>
                <div className="grid grid-cols-2 gap-1">
                  {colors.map((color) => (
                    <Button
                      key={color.value}
                      variant={currentStyle.textColor === color.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => onStyleChange(selectedComponent, { textColor: color.value })}
                    >
                      {color.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Background */}
              <div>
                <label className="text-xs font-medium mb-1 block">Background</label>
                <div className="grid grid-cols-2 gap-1">
                  {backgrounds.map((bg) => (
                    <Button
                      key={bg.value}
                      variant={currentStyle.backgroundColor === bg.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => onStyleChange(selectedComponent, { backgroundColor: bg.value })}
                    >
                      {bg.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Border */}
              <div>
                <label className="text-xs font-medium mb-1 block">Border Color</label>
                <div className="grid grid-cols-2 gap-1">
                  {borders.map((border) => (
                    <Button
                      key={border.value}
                      variant={currentStyle.borderStyle === border.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => onStyleChange(selectedComponent, { borderStyle: border.value })}
                    >
                      {border.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Border Width */}
              <div>
                <label className="text-xs font-medium mb-1 block">Border Width</label>
                <div className="grid grid-cols-2 gap-1">
                  {borderWidths.map((width) => (
                    <Button
                      key={width.value}
                      variant={currentStyle.borderWidth === width.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => onStyleChange(selectedComponent, { borderWidth: width.value })}
                    >
                      {width.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'layout' && (
            <div className="space-y-4">
              {/* Snap to Grid */}
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium">Snap to Grid</label>
                <Button
                  variant={snapToGrid ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSnapToGrid(!snapToGrid)}
                >
                  <Grid className="h-3 w-3 mr-1" />
                  {snapToGrid ? 'On' : 'Off'}
                </Button>
              </div>

              {/* Grid Size */}
              {snapToGrid && (
                <div>
                  <label className="text-xs font-medium mb-1 block">Grid Size: {gridSize}px</label>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={gridSize}
                    onChange={(e) => setGridSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="space-y-2 pt-4 border-t">
                <Button
                  onClick={onSaveLayout}
                  className="w-full"
                  size="sm"
                >
                  <Save className="h-3 w-3 mr-1" />
                  Save Layout
                </Button>
                <Button
                  onClick={onResetLayout}
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reset Layout
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default CustomizationPanel;
