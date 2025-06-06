import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, User } from 'lucide-react';
import Navbar from '../components/Navbar';
import ComboForm from '../components/ComboForm';
import ComboCard from '../components/ComboCard';
import { useAuth } from '../context/AuthContext';
import { BeybladeCombo } from '../types';
import { sampleCombos } from '../data/mockData';

export default function CombosPage() {
  const [combos, setCombos] = useState<BeybladeCombo[]>([]);
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Load combos
  useEffect(() => {
    // Try to get from localStorage, fall back to sample data
    try {
      const storedCombos = localStorage.getItem('x-net-combos');
      if (storedCombos) {
        const parsed = JSON.parse(storedCombos);
        if (parsed.length > 0) {
          setCombos(parsed);
          return;
        }
      }
    } catch (e) {
      console.error('Failed to parse stored combos', e);
    }
    
    // Fall back to sample data
    setCombos(sampleCombos);
  }, []);
  
  // Filter combos by tag
  const filteredCombos = filterTag
    ? combos.filter(combo => combo.tags.includes(filterTag))
    : combos;
  
  // Get all unique tags
  const allTags = Array.from(
    new Set(combos.flatMap(combo => combo.tags))
  );
  
  // Redirect if not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <User className="h-12 w-12 mx-auto text-gray-500 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Login to view combos
            </h2>
            <p className="text-gray-400 mb-6">
              You need to be logged in to access Beyblade combos.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="bg-xblue-600 hover:bg-xblue-700 text-white px-5 py-2 rounded-md"
            >
              Login / Sign up
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Combo form */}
          <div className="md:w-1/3">
            <ComboForm />
          </div>
          
          {/* Combos list */}
          <div className="md:w-2/3">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                {filterTag ? `#${filterTag} Combos` : 'Community Combos'}
              </h2>
              
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-white text-sm"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {filterTag ? `#${filterTag}` : 'Filter by tag'}
                </button>
                
                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <button 
                        onClick={() => {
                          setFilterTag(null);
                          setIsFilterOpen(false);
                        }} 
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left"
                      >
                        All Combos
                      </button>
                      
                      {allTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => {
                            setFilterTag(tag);
                            setIsFilterOpen(false);
                          }}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {filteredCombos.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredCombos.map(combo => (
                  <ComboCard key={combo.id} combo={combo} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-900 rounded-lg border border-gray-800">
                <p className="text-gray-400">No combos found for this filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
 