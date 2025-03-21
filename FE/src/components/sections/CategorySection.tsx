import './CategorySection.css'

interface Category {
  id: string
  name: string
}

interface CategorySectionProps {
  categories: Category[]
  selectedCategory: string
  onCategorySelect: (categoryId: string) => void
}

const CategorySection = ({ categories, selectedCategory, onCategorySelect }: CategorySectionProps) => {
  return (
    <section className="category-section">
      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategorySelect(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </section>
  )
}

export default CategorySection 