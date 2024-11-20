// src/pages/ArtGallery.tsx
import { useState, useRef, useEffect } from 'react';
import { Palette, Image, PenTool, Download, Trash, Undo } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type Tool = 'pen' | 'eraser';
type Color = string;

const ArtGallery = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'gallery' | 'create'>('gallery');
  const [selectedTool, setSelectedTool] = useState<Tool>('pen');
  const [selectedColor, setSelectedColor] = useState<Color>('#000000');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];
  const [artworks] = useState([
    {
      id: 1,
      title: "Coucher de soleil paisible",
      description: "Un moment de sérénité capturé au crépuscule",
      type: "painting",
      imageUrl: "/api/placeholder/400/300",
      date: "2024-02-20"
    },
    {
      id: 2,
      title: "Expression abstraite",
      description: "Une explosion de couleurs et d'émotions",
      type: "painting",
      imageUrl: "/api/placeholder/400/300",
      date: "2024-02-19"
    }
  ]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      canvas.style.width = `${canvas.offsetWidth}px`;
      canvas.style.height = `${canvas.offsetHeight}px`;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.scale(2, 2);
        context.lineCap = 'round';
        context.strokeStyle = selectedColor;
        context.lineWidth = lineWidth;
        contextRef.current = context;
      }
    }
  }, [activeTab]);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = selectedColor;
    }
  }, [selectedColor]);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.lineWidth = lineWidth;
    }
  }, [lineWidth]);

  const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    if (contextRef.current) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    }
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (contextRef.current) {
      contextRef.current.closePath();
      setIsDrawing(false);
    }
  };

  const clearCanvas = () => {
    if (canvasRef.current && contextRef.current) {
      contextRef.current.clearRect(
        0, 0,
        canvasRef.current.width / 2,
        canvasRef.current.height / 2
      );
    }
  };

  const downloadDrawing = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `${user?.firstName}-creation-${new Date().toISOString()}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Navigation des onglets */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('gallery')}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'gallery'
              ? 'bg-primary-100 text-primary-600'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Image className="w-5 h-5 mr-2" />
          Galerie
        </button>
        <button
          onClick={() => setActiveTab('create')}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'create'
              ? 'bg-primary-100 text-primary-600'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <PenTool className="w-5 h-5 mr-2" />
          Créer
        </button>
      </div>

      {/* Contenu principal */}
      {activeTab === 'gallery' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
            <div key={artwork.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{artwork.title}</h3>
                <p className="text-gray-600 text-sm">{artwork.description}</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                    {artwork.type}
                  </span>
                  <span className="text-sm text-gray-500">{artwork.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {/* Outils de dessin */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <div className="flex flex-wrap gap-4 items-center">
              {/* Couleurs */}
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color ? 'border-primary-500' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              {/* Taille du pinceau */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Taille:</span>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={lineWidth}
                  onChange={(e) => setLineWidth(parseInt(e.target.value))}
                  className="w-32"
                />
              </div>

              {/* Actions */}
              <div className="flex space-x-2 ml-auto">
                <button
                  onClick={clearCanvas}
                  className="p-2 text-gray-600 hover:text-primary-500 hover:bg-primary-50 rounded-lg"
                >
                  <Trash className="w-5 h-5" />
                </button>
                <button
                  onClick={downloadDrawing}
                  className="p-2 text-gray-600 hover:text-primary-500 hover:bg-primary-50 rounded-lg"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Canvas de dessin */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="w-full h-[500px] border border-gray-200 rounded-lg cursor-crosshair"
              style={{ touchAction: 'none' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtGallery;