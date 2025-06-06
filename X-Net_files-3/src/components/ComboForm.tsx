import  { useState } from 'react';
import { Save, Plus } from 'lucide-react';

const BLADE_OPTIONS = ['Dransword', 'Hells Scythe', 'Wizard Arrow',
  'Knight Shield',
  'Dranzer Spiral',
  'Shark Edge',
  'Leon Claw',
  'Viper Tail',
  'Phoenix Wing',
  'Wyvern Gale',
  'Hells Chain',
  'Knight Lance',
  'Dran Dagger',
  'Rhino Horn',
  'Cobalt Drake',
  'Cobalt Dragoon',
  'Crimson Garuda',
  'Croco Crunch',
  'Black Shell'];
const RATCHET_OPTIONS = ['0-70',
  '0-80',
  '1-60',
  '1-80',
  '2-60',
  '2-70',
  '2-80',
  '3-60',
  '3-70',
  '3-80',
  '3-85',
  '4-55',
  '4-60',
  '4-70',
  '4-80',
  '5-60',
  '5-70',
  '5-80',
  '6-60',
  '6-80',
  '7-60',
  '7-70',
  '7-80',
  '9-60',
  '9-70',
  '9-80',
  'M-85'];
const BIT_OPTIONS = ['Accel (A)', 'Ball (B)', 'Bound Spike (BS)', 'Cyclone (C)', 'Disk Ball (DB)',
  'Dot (D)', 'Elevate (E)', 'Flat (F)', 'Free Ball (FB)', 'Gear Ball (GB)',
  'Gear Flat (GF)', 'Gear Needle (GN)', 'Gear Point (GP)', 'Glide (G)',
  'Hexa (H)', 'High Needle (HN)', 'Kick (K)', 'Low Flat (LF)', 'Low Needle (LN)',
  'Low Orb (LO)', 'Low Rush (LR)', 'Needle (N)', 'Orb (O)', 'Point (P)',
  'Quick (Q)', 'Rush (R)', 'Spike (S)', 'Taper (T)', 'Vortex (V)',
];
const TAG_OPTIONS = ['Attack', 'Defense', 'Stamina', 'Balance'];

export default function ComboForm() {
  const [name, setName] = useState('');
  const [blade, setBlade] = useState('');
  const [ratchet, setRatchet] = useState('');
  const [bit, setBit] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage for demo
    const combos = JSON.parse(localStorage.getItem('x-net-combos') || '[]');
    const newCombo = {
      id: `combo-${Date.now()}`,
      name,
      blade,
      ratchet,
      bit,
      tags: selectedTags,
      creator: {
        id: 'user-1',
        username: 'You',
      },
      createdAt: new Date().toISOString(),
    };
    
    combos.push(newCombo);
    localStorage.setItem('x-net-combos', JSON.stringify(combos));
    
    // Show success message
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    
    // Reset form
    setName('');
    setBlade('');
    setRatchet('');
    setBit('');
    setSelectedTags([]);
  };
  
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Plus className="h-5 w-5 mr-2 text-xblue-500" />
        Create New Combo
      </h2>
      
      {success && (
        <div className="mb-4 p-3 bg-green-900/30 border border-green-900 rounded-md text-green-400">
          Combo saved successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Combo Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-xblue-500"
            placeholder="E.g., Ultimate Dragon Crusher"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="blade" className="block text-sm font-medium text-gray-300 mb-1">
              Blade
            </label>
            <select
              id="blade"
              value={blade}
              onChange={(e) => setBlade(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-xblue-500"
              required
            >
              <option value="">Select Blade</option>
              {BLADE_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="ratchet" className="block text-sm font-medium text-gray-300 mb-1">
              Ratchet
            </label>
            <select
              id="ratchet"
              value={ratchet}
              onChange={(e) => setRatchet(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-xblue-500"
              required
            >
              <option value="">Select Ratchet</option>
              {RATCHET_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="bit" className="block text-sm font-medium text-gray-300 mb-1">
              Bit
            </label>
            <select
              id="bit"
              value={bit}
              onChange={(e) => setBit(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-xblue-500"
              required
            >
              <option value="">Select Bit</option>
              {BIT_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tags (Select all that apply)
          </label>
          <div className="flex flex-wrap gap-2">
            {TAG_OPTIONS.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTags.includes(tag)
                    ? 'bg-xblue-600 text-white'
                    : 'bg-gray-800 text-gray-300 border border-gray-700'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-xblue-600 hover:bg-xblue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-xblue-500 focus:ring-offset-gray-900"
        >
          <Save className="h-5 w-5 mr-2" />
          Save Combo
        </button>
      </form>
    </div>
  );
}
 