import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Category } from '../../types';
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';

export const AdminCategories: React.FC = () => {
  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    products
  } = useStore();

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const initialForm = {
    name: '',
    slug: '',
    description: '',
    image: '/src/assets/images/cat_outerwear_cape_1790325209241.jpg'
  };

  const [formData, setFormData] = useState(initialForm);

  const handleStartCreate = () => {
    setFormData(initialForm);
    setEditingCategory(null);
    setIsCreating(true);
  };

  const handleStartEdit = (cat: Category) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      image: cat.image
    });
    setIsCreating(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const count = products.filter(p => p.category === formData.slug).length;
    if (editingCategory) {
      updateCategory(editingCategory.id, {
        ...formData,
        itemCount: count
      });
    } else {
      addCategory({
        ...formData,
        itemCount: count
      });
    }
    setIsCreating(false);
    setEditingCategory(null);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 border border-[#E5E0D5]">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-light text-[#141413]">
            Atelier Divisions &amp; Category Archetypes
          </h2>
          <p className="text-xs text-[#6B665E] mt-1 font-mono">
            {categories.length} taxonomic divisions governing the customer storefront
          </p>
        </div>
        <button
          onClick={handleStartCreate}
          className="px-5 py-2.5 bg-[#1C1B19] text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Division</span>
        </button>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const productCount = products.filter(p => p.category === cat.slug).length;
          return (
            <div
              key={cat.id}
              className="bg-white border border-[#E5E0D5] p-5 flex flex-col justify-between transition-shadow hover:shadow-md"
            >
              <div>
                <div className="aspect-[16/9] bg-[#F2EEE6] overflow-hidden mb-4 relative border border-[#ECE7DD]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-black/80 text-white text-[10px] font-mono uppercase px-2 py-0.5">
                    {productCount} Silhouettes
                  </div>
                </div>

                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-serif text-lg font-medium text-[#1A1918]">{cat.name}</h3>
                  <span className="text-[10px] font-mono uppercase text-[#777]">{cat.slug}</span>
                </div>
                <p className="text-xs text-[#6B665D] font-light line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-4 mt-4 border-t border-[#ECE7DD] flex items-center justify-between text-xs font-mono">
                <span className="text-[11px] text-[#736E66]">ID: {cat.id}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartEdit(cat)}
                    className="p-1.5 text-[#555] hover:text-black hover:bg-[#F2EFE9]"
                    title="Edit Division"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete division "${cat.name}"?`)) {
                        deleteCategory(cat.id);
                      }
                    }}
                    className="p-1.5 text-[#8C3A27] hover:bg-[#FBEBE7]"
                    title="Delete Division"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Form */}
      {isCreating && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="relative bg-[#FAF9F5] border border-[#DDD6C8] w-full max-w-lg overflow-hidden shadow-2xl p-6 sm:p-8 my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DA] mb-6">
              <h3 className="font-serif text-2xl font-light text-[#141413]">
                {editingCategory ? 'Edit Category Archetype' : 'New Category Division'}
              </h3>
              <button onClick={() => setIsCreating(false)} className="text-[#666] hover:text-black p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-sans">
              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setFormData({ ...formData, name, slug: formData.slug ? formData.slug : slug });
                  }}
                  placeholder="e.g. Outerwear & Capes"
                  className="w-full px-3 py-2 bg-white border border-[#DDD8CD] focus:outline-none focus:border-black text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  URL Slug Key *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase() })}
                  placeholder="e.g. outerwear"
                  className="w-full px-3 py-2 bg-white border border-[#DDD8CD] focus:outline-none focus:border-black text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  Editorial Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Double-faced cashmere cloaks and architectural storm coats..."
                  className="w-full px-3 py-2 bg-white border border-[#DDD8CD] focus:outline-none focus:border-black text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  Category Showcase Image URL *
                </label>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#DDD8CD] focus:outline-none focus:border-black text-xs font-mono"
                />
              </div>

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
                  {editingCategory ? 'Update Division' : 'Create Division'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
