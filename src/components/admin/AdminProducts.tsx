import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { Plus, Edit2, Trash2, Copy, Search, Eye, EyeOff, Check, X, Star, Cloud } from 'lucide-react';
import { CloudinaryUploader } from './CloudinaryUploader';

export const AdminProducts: React.FC = () => {
  const {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct,
    settings
  } = useStore();

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const initialFormState = {
    name: '',
    sku: '',
    category: categories[0]?.slug || 'outerwear',
    price: 1500,
    salePrice: 0,
    description: '',
    material: '',
    images: ['/src/assets/images/hero_luxury_coat_1790325188738.jpg'],
    sizes: ['FR 36', 'FR 38', 'FR 40', 'FR 42'],
    colors: [
      { name: 'Noir', hex: '#161616' },
      { name: 'Camel', hex: '#C49A6C' }
    ],
    stock: 10,
    isFeatured: true,
    isNewArrival: true,
    status: 'active' as 'active' | 'draft'
  };

  const [formData, setFormData] = useState(initialFormState);
  const [newImageInput, setNewImageInput] = useState('');
  const [newSizeInput, setNewSizeInput] = useState('');
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#111111');

  const filteredProducts = products.filter(p => {
    if (selectedCat !== 'all' && p.category !== selectedCat) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.material.toLowerCase().includes(q);
    }
    return true;
  });

  const handleStartCreate = () => {
    setFormData(initialFormState);
    setEditingProduct(null);
    setIsCreating(true);
  };

  const handleStartEdit = (prod: Product) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      sku: prod.sku,
      category: prod.category,
      price: prod.price,
      salePrice: prod.salePrice || 0,
      description: prod.description,
      material: prod.material,
      images: prod.images,
      sizes: prod.sizes,
      colors: prod.colors,
      stock: prod.stock,
      isFeatured: prod.isFeatured,
      isNewArrival: prod.isNewArrival,
      status: prod.status
    });
    setIsCreating(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...formData,
        salePrice: formData.salePrice > 0 ? formData.salePrice : undefined
      });
    } else {
      addProduct({
        ...formData,
        salePrice: formData.salePrice > 0 ? formData.salePrice : undefined
      });
    }
    setIsCreating(false);
    setEditingProduct(null);
  };

  const handleAddImage = () => {
    if (newImageInput.trim()) {
      setFormData({ ...formData, images: [...formData.images, newImageInput.trim()] });
      setNewImageInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
  };

  const handleAddSize = () => {
    if (newSizeInput.trim() && !formData.sizes.includes(newSizeInput.trim())) {
      setFormData({ ...formData, sizes: [...formData.sizes, newSizeInput.trim()] });
      setNewSizeInput('');
    }
  };

  const handleRemoveSize = (size: string) => {
    setFormData({ ...formData, sizes: formData.sizes.filter(s => s !== size) });
  };

  const handleAddColor = () => {
    if (newColorName.trim()) {
      setFormData({
        ...formData,
        colors: [...formData.colors, { name: newColorName.trim(), hex: newColorHex }]
      });
      setNewColorName('');
    }
  };

  const handleRemoveColor = (index: number) => {
    setFormData({ ...formData, colors: formData.colors.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 border border-[#E5E0D5]">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-light text-[#141413]">
            Haute Couture Product &amp; Inventory Management
          </h2>
          <p className="text-xs text-[#6B665E] mt-1 font-mono">
            {products.length} registered garments across {categories.length} atelier collections
          </p>
        </div>
        <button
          onClick={handleStartCreate}
          className="px-5 py-2.5 bg-[#1C1B19] text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Silhouette</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 border border-[#E5E0D5]">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, SKU or fabric..."
            className="w-full pl-9 pr-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-sans focus:outline-none focus:border-black"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-[11px] font-mono uppercase text-[#666]">Division:</label>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono uppercase focus:outline-none"
          >
            <option value="all">All Divisions ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-[#E5E0D5] overflow-x-auto">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-[#FAF9F5] text-[#555] font-mono text-[10px] uppercase tracking-wider border-b border-[#E5E0D5]">
            <tr>
              <th className="py-3 px-4">Silhouette</th>
              <th className="py-3 px-4">SKU &amp; Division</th>
              <th className="py-3 px-4 text-right">Price</th>
              <th className="py-3 px-4 text-center">Atelier Stock</th>
              <th className="py-3 px-4 text-center">Visibility</th>
              <th className="py-3 px-4 text-center">Badges</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFECE5]">
            {filteredProducts.map((p) => {
              const displayPrice = p.salePrice ?? p.price;
              const isSale = p.salePrice && p.salePrice < p.price;
              return (
                <tr key={p.id} className="hover:bg-[#FAF9F5] transition-colors">
                  {/* Silhouette */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img src={p.images[0]} alt={p.name} className="w-11 h-14 object-cover border border-[#DDD] shrink-0" />
                      <div>
                        <div className="font-serif text-sm font-medium text-[#1A1918]">{p.name}</div>
                        <div className="text-[11px] text-[#777] font-light italic line-clamp-1">{p.material}</div>
                      </div>
                    </div>
                  </td>

                  {/* SKU & Category */}
                  <td className="py-3.5 px-4 font-mono text-xs">
                    <div className="font-semibold text-[#141413]">{p.sku}</div>
                    <div className="text-[10px] text-[#777] uppercase">{p.category}</div>
                  </td>

                  {/* Price */}
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums">
                    <span className="font-bold text-[#141413]">{settings.currencySymbol}{displayPrice.toLocaleString()}</span>
                    {isSale && (
                      <span className="block text-[10px] text-[#888] line-through">
                        {settings.currencySymbol}{p.price.toLocaleString()}
                      </span>
                    )}
                  </td>

                  {/* Stock */}
                  <td className="py-3.5 px-4 text-center font-mono">
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-semibold ${
                        p.stock === 0
                          ? 'bg-[#524E48] text-white'
                          : p.stock <= 4
                          ? 'bg-[#FBEBE7] text-[#8C3A27]'
                          : 'bg-[#EAF3EC] text-[#295438]'
                      }`}
                    >
                      {p.stock} units
                    </span>
                  </td>

                  {/* Visibility */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => updateProduct(p.id, { status: p.status === 'active' ? 'draft' : 'active' })}
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 border ${
                        p.status === 'active'
                          ? 'bg-white border-[#295438] text-[#295438]'
                          : 'bg-white border-[#888] text-[#888]'
                      }`}
                    >
                      {p.status}
                    </button>
                  </td>

                  {/* Badges */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => updateProduct(p.id, { isFeatured: !p.isFeatured })}
                        title={p.isFeatured ? "Featured" : "Not Featured"}
                        className={`p-1 ${p.isFeatured ? 'text-[#C59B27]' : 'text-[#BBB]'}`}
                      >
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </button>
                      <button
                        onClick={() => updateProduct(p.id, { isNewArrival: !p.isNewArrival })}
                        className={`text-[9px] font-mono px-1 border ${
                          p.isNewArrival ? 'border-[#1C1B19] text-black font-semibold' : 'border-transparent text-[#BBB]'
                        }`}
                      >
                        NEW
                      </button>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleStartEdit(p)}
                        className="p-1.5 text-[#555] hover:text-black hover:bg-[#EFECE5]"
                        title="Edit Silhouette"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => duplicateProduct(p.id)}
                        className="p-1.5 text-[#555] hover:text-black hover:bg-[#EFECE5]"
                        title="Duplicate Silhouette"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Archive and delete silhouette "${p.name}"?`)) {
                            deleteProduct(p.id);
                          }
                        }}
                        className="p-1.5 text-[#8C3A27] hover:bg-[#FBEBE7]"
                        title="Delete Silhouette"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Product Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="relative bg-[#FAF9F5] border border-[#DDD6C8] w-full max-w-3xl overflow-hidden shadow-2xl p-6 sm:p-8 my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DA] mb-6">
              <h3 className="font-serif text-2xl font-light text-[#141413]">
                {editingProduct ? 'Edit Silhouette Specifications' : 'Catalog New Haute Silhouette'}
              </h3>
              <button onClick={() => setIsCreating(false)} className="text-[#666] hover:text-black p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-sans max-h-[75vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                    Silhouette Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. The Grand Haussmann Cashmere Trench"
                    className="w-full px-3 py-2 bg-white border border-[#DDD8CD] focus:outline-none focus:border-black text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                    SKU Identifier *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="VDM-TR-801"
                    className="w-full px-3 py-2 bg-white border border-[#DDD8CD] focus:outline-none focus:border-black text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                    Division / Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD8CD] focus:outline-none uppercase font-mono text-xs"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                    Retail Price ({settings.currencySymbol}) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD8CD] focus:outline-none text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                    Sale Price (Optional)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.salePrice}
                    onChange={(e) => setFormData({ ...formData, salePrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD8CD] focus:outline-none text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                    Atelier Stock Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD8CD] focus:outline-none text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                    Textile &amp; Savoir-Faire Pedigree *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    placeholder="e.g. 100% Sorignac Loro Piana Storm System Wool"
                    className="w-full px-3 py-2 bg-white border border-[#DDD8CD] focus:outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  Atelier Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Architectural proportion, button closures, canvas internal structure..."
                  className="w-full px-3 py-2 bg-white border border-[#DDD8CD] focus:outline-none text-xs"
                />
              </div>

              {/* Sizes */}
              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  Available Sizes / Cuts
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.sizes.map((s) => (
                    <span key={s} className="px-2.5 py-1 bg-white border border-[#DDD] font-mono text-xs flex items-center gap-1.5">
                      <span>{s}</span>
                      <button type="button" onClick={() => handleRemoveSize(s)} className="text-[#888] hover:text-black">&times;</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSizeInput}
                    onChange={(e) => setNewSizeInput(e.target.value)}
                    placeholder="e.g. FR 44 or XL"
                    className="w-40 px-2 py-1 bg-white border text-xs font-mono"
                  />
                  <button type="button" onClick={handleAddSize} className="px-3 py-1 bg-[#222] text-white text-xs font-mono">
                    Add Size
                  </button>
                </div>
              </div>

              {/* Colors */}
              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  Colorways &amp; Swatches
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.colors.map((c, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white border border-[#DDD] text-xs flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                      <button type="button" onClick={() => handleRemoveColor(i)} className="text-[#888] hover:text-black">&times;</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={newColorName}
                    onChange={(e) => setNewColorName(e.target.value)}
                    placeholder="Color Name (e.g. Ecru)"
                    className="w-32 px-2 py-1 bg-white border text-xs"
                  />
                  <input
                    type="color"
                    value={newColorHex}
                    onChange={(e) => setNewColorHex(e.target.value)}
                    className="w-8 h-7 cursor-pointer border"
                  />
                  <button type="button" onClick={handleAddColor} className="px-3 py-1 bg-[#222] text-white text-xs font-mono">
                    Add Color
                  </button>
                </div>
              </div>

              {/* Images with Cloudinary Integration */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-mono uppercase text-[#666] block">
                    Product Image Gallery
                  </label>
                  <span className="text-[10px] font-mono text-[#295438] bg-[#EAF3EC] px-2 py-0.5 font-semibold">
                    Cloudinary CDN Active (kkroq7e1)
                  </span>
                </div>

                {/* Cloudinary Drag & Drop Uploader */}
                <div className="mb-3">
                  <CloudinaryUploader
                    folder="vendome_store/products"
                    label="Upload Silhouette Image to Cloudinary (kkroq7e1)"
                    onUploadSuccess={(url) => {
                      setFormData(prev => ({ ...prev, images: [...prev.images, url] }));
                    }}
                  />
                </div>

                <div className="flex flex-wrap gap-3 mb-2">
                  {formData.images.map((img, i) => (
                    <div key={i} className="relative w-16 h-20 border bg-white overflow-hidden group">
                      <img src={img} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(i)}
                        className="absolute top-0 right-0 bg-black text-white w-4 h-4 flex items-center justify-center text-[10px]"
                      >
                        &times;
                      </button>
                      {img.includes('cloudinary.com') && (
                        <div className="absolute bottom-0 inset-x-0 bg-[#295438]/90 text-[8px] font-mono text-white text-center py-0.5">
                          CDN
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newImageInput}
                    onChange={(e) => setNewImageInput(e.target.value)}
                    placeholder="Or paste external image URL"
                    className="flex-1 px-2 py-1 bg-white border text-xs font-mono"
                  />
                  <button type="button" onClick={handleAddImage} className="px-3 py-1 bg-[#222] text-white text-xs font-mono">
                    Add URL
                  </button>
                </div>
              </div>

              {/* Status toggles */}
              <div className="flex items-center gap-6 pt-3 border-t border-[#E8E4DA]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  />
                  <span>Featured Atelier Icon</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isNewArrival}
                    onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                  />
                  <span>New Autumn Arrival Tag</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.status === 'active'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.checked ? 'active' : 'draft' })}
                  />
                  <span>Active &amp; Visible in Storefront</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex justify-end gap-3 border-t border-[#E8E4DA]">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-5 py-2 border border-[#888] text-xs font-mono uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#1C1B19] text-white text-xs font-mono uppercase tracking-wider hover:bg-black"
                >
                  {editingProduct ? 'Save Updates' : 'Publish Silhouette'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
