# Pazaryeri - Modern E-Commerce Frontend

A production-ready, scalable e-commerce frontend application built with Next.js 16, TypeScript, and modern best practices.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run Storybook
npm run storybook
```

Visit `http://localhost:3000` to see the application.

## 📋 Project Overview

This project demonstrates a professional e-commerce marketplace implementation with focus on:
- **Scalable Architecture**: Modular, maintainable code structure
- **Performance**: Optimized rendering strategies and code splitting
- **User Experience**: Smooth animations, responsive design, dark mode
- **SEO**: Dynamic metadata, structured data, sitemaps
- **Internationalization**: Turkish and English language support
- **State Management**: Efficient global state with Zustand
- **Type Safety**: Strict TypeScript configuration

## 🏗️ Architecture

### Rendering Strategies

| Page Type | Strategy | Rationale |
|-----------|----------|-----------|
| Homepage | SSR | Dynamic content, personalization potential |
| Product List | SSG + ISR | Pre-generate pages, revalidate periodically |
| Product Detail | SSG + ISR | SEO-critical, static with updates |
| Category Pages | SSG + ISR | Predictable content, good for SEO |
| Favorites | CSR | User-specific, requires client state |

**Revalidation Periods:**
- Product pages: 300s (5 minutes)
- Product listings: 60s (1 minute)
- Categories: 3600s (1 hour)

### Project Structure

```
pazaryeri/
├── app/                          # Next.js 16 App Router
│   ├── [locale]/                 # Internationalized routes
│   │   ├── layout.tsx           # Root layout with i18n provider
│   │   ├── page.tsx             # Homepage (SSR)
│   │   ├── products/
│   │   │   ├── page.tsx         # Product listing (SSG + ISR)
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Product detail (SSG + ISR)
│   │   ├── categories/
│   │   │   ├── page.tsx         # Categories list
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Category products (SSG + ISR)
│   │   ├── favorites/
│   │   │   └── page.tsx         # Favorites (CSR)
│   │   ├── not-found.tsx        # Custom 404
│   │   ├── error.tsx            # Error boundary (500)
│   │   └── loading.tsx          # Loading UI
│   ├── sitemap.ts               # Dynamic sitemap generation
│   ├── robots.ts                # SEO robots.txt
│   └── globals.css              # Global styles with Tailwind
│
├── components/                   # Atomic Design structure
│   ├── atoms/                   # Basic building blocks
│   │   ├── Button.tsx
│   │   ├── Image.tsx
│   │   ├── Badge.tsx
│   │   └── Icon.tsx
│   ├── molecules/               # Compound components
│   │   ├── ProductCard.tsx
│   │   ├── CategoryCard.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── LanguageSwitch.tsx
│   ├── organisms/               # Complex components
│   │   ├── ProductGrid.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── templates/               # Page layouts
│       └── MainLayout.tsx
│
├── lib/                         # Core logic layer
│   ├── api/                    # API client & mock data
│   │   ├── client.ts           # API client with data layer
│   │   └── mock/               # Mock JSON data
│   │       ├── products.json
│   │       └── categories.json
│   ├── stores/                 # Zustand global state
│   │   ├── favorites.store.ts  # Favorites management
│   │   └── theme.store.ts      # Theme (dark mode)
│   ├── types/                  # TypeScript definitions
│   │   ├── api.types.ts        # API response types
│   │   └── domain.types.ts     # Domain models
│   └── utils/                  # Utility functions
│       ├── format.ts           # Formatting helpers
│       └── seo.ts              # SEO utilities
│
├── config/                      # Configuration files
│   └── app.config.ts           # App-wide settings
│
├── i18n/                        # Internationalization
│   └── request.ts              # i18n config for next-intl
│
├── public/                      # Static assets
│   └── locales/                # Translation files
│       ├── tr.json
│       └── en.json
│
├── stories/                     # Storybook stories
│   └── Button.stories.tsx
│
├── __tests__/                   # Jest tests
│   ├── components/
│   ├── stores/
│   └── utils/
│
└── middleware.ts                # Locale routing middleware
```

## 🎨 Component Architecture

### Atomic Design Principles

**Atoms** (`components/atoms/`)
- Smallest, indivisible UI components
- Examples: Button, Image, Badge, Icon
- Pure, reusable, highly testable

**Molecules** (`components/molecules/`)
- Combinations of atoms
- Examples: ProductCard, ThemeToggle, LanguageSwitch
- Single responsibility, composable

**Organisms** (`components/organisms/`)
- Complex UI sections
- Examples: Header, Footer, ProductGrid
- Business logic integration

**Templates** (`components/templates/`)
- Page-level layouts
- Examples: MainLayout
- Structural composition

## 🔧 State Management

### Zustand Stores

#### Favorites Store
```typescript
// Normalized state for scalability
{
  favoriteIds: Set<string>,  // O(1) lookup
  addFavorite: (id) => void,
  removeFavorite: (id) => void,
  toggleFavorite: (id) => void,
  isFavorite: (id) => boolean,
  getFavoriteCount: () => number
}
```

**Design Decisions:**
- Use `Set` for O(1) lookups
- Persist to localStorage
- Normalized state (IDs only)
- Products fetched on-demand

#### Theme Store
```typescript
{
  mode: "light" | "dark" | "system",
  setMode: (mode) => void,
  toggleMode: () => void
}
```

**Features:**
- System preference detection
- Persistent theme selection
- Automatic class application

## 🌐 Internationalization (i18n)

### Implementation
- **Library**: next-intl
- **Languages**: Turkish (tr), English (en)
- **URL Structure**: `/{locale}/...` (e.g., `/tr/products`, `/en/products`)
- **Default Locale**: Turkish (tr)

### Translation Files
- Located in `public/locales/`
- JSON format for easy management
- Namespaced for organization

### Usage
```typescript
// Server Components
const t = await getTranslations('namespace');

// Client Components
const t = useTranslations('namespace');
```

## 🎭 Styling & Theming

### Tailwind CSS
- Utility-first approach
- Custom design tokens via CSS variables
- Responsive by default
- Dark mode support

### CSS Variables
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... */
}
```

### Animations
- **Library**: Framer Motion
- **Usage**: Page transitions, hover effects, theme toggle
- **Performance**: GPU-accelerated, optimized

## 🔍 SEO Strategy

### Dynamic Metadata
```typescript
export async function generateMetadata({ params }) {
  return {
    title: "...",
    description: "...",
    openGraph: { /* ... */ },
    twitter: { /* ... */ }
  };
}
```

### Structured Data (JSON-LD)
- Product schema
- Breadcrumb navigation
- Organization info

### Technical SEO
- ✅ Dynamic sitemap.xml
- ✅ robots.txt
- ✅ Custom 404/500 pages
- ✅ Semantic HTML
- ✅ Image alt texts
- ✅ Meta tags per page

## ⚡ Performance Optimizations

### Code Splitting
- Route-based splitting (Next.js automatic)
- Component lazy loading (`React.lazy()`)
- Dynamic imports for heavy components

### Image Optimization
```typescript
import Image from "next/image";

<Image
  src={url}
  alt={alt}
  width={800}
  height={800}
  loading="lazy"  // Lazy loading
  priority={isPrimary}  // LCP optimization
/>
```

### Memoization
- React hooks: `useMemo`, `useCallback`
- Store selectors optimized
- Expensive calculations cached

### Bundle Optimization
- Tree-shaking enabled
- Module optimization via Turbopack
- Framer Motion package optimization

## 🧪 Testing Strategy

### Unit Tests (Jest + React Testing Library)
```bash
npm test
```

**Coverage:**
- Components: Button, atoms
- Stores: Favorites, Theme
- Utilities: Format, SEO helpers

**Example:**
```typescript
describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
```

### Component Stories (Storybook)
```bash
npm run storybook
```

- Visual testing
- Component documentation
- Interaction testing
- Isolated development

## 📦 Data Flow & API Integration

### Mock API Structure
```
lib/api/
├── client.ts           # API client class
└── mock/
    ├── products.json   # Product data
    └── categories.json # Category data
```

### API Client
```typescript
class ApiClient {
  async getProducts(params) { /* ... */ }
  async getProductBySlug(slug) { /* ... */ }
  async getCategories() { /* ... */ }
  async getProductsByIds(ids) { /* ... */ }
}
```

**Features:**
- Simulated network delays
- Type-safe responses
- Pagination support
- Filter capabilities

### Data Transformation
- Raw API data → Domain models
- Separate concerns: API layer vs UI layer
- Type safety throughout

## 🔒 Type Safety

### TypeScript Configuration
```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noImplicitReturns": true,
  "noFallthroughCasesInSwitch": true
}
```

### Type Organization
```
lib/types/
├── api.types.ts      # API responses
└── domain.types.ts   # Business logic
```

## 🚦 Code Quality

### ESLint
- Next.js recommended rules
- TypeScript integration
- Custom rules for consistency

### Prettier
- Consistent formatting
- Tailwind plugin for class sorting
- Team-wide standards

### Git Hooks (Recommended)
```bash
npm install -D husky lint-staged

# .husky/pre-commit
npx lint-staged
```

## 🎯 Trade-offs & Decisions

### 1. SSG + ISR vs Full SSR
**Decision**: SSG + ISR for product pages
**Rationale**: 
- Better performance (CDN cacheable)
- Lower server costs
- Good enough freshness (5-min revalidation)
- SEO benefits

**Trade-off**: Slight data staleness acceptable for e-commerce

### 2. Zustand vs Redux Toolkit
**Decision**: Zustand
**Rationale**:
- Simpler API, less boilerplate
- Better TypeScript support
- Sufficient for project scope
- Easier testing

**Trade-off**: Less ecosystem/middleware

### 3. Mock API vs Real Backend
**Decision**: Mock JSON files
**Rationale**:
- Focus on frontend architecture
- Easy to swap with real API
- Demonstrates data layer separation

**Implementation**: Clean abstraction via ApiClient class

### 4. Framer Motion vs CSS Animations
**Decision**: Framer Motion
**Rationale**:
- Declarative API
- Complex animations easier
- React integration
- Gesture support

**Trade-off**: Bundle size (~35KB gzipped)

### 5. Atomic Design
**Decision**: Strict Atomic Design
**Rationale**:
- Clear component hierarchy
- Easy to locate components
- Promotes reusability
- Scalable structure

**Trade-off**: More folders, initial complexity

## 🔮 Future Enhancements

### High Priority
- [ ] E2E tests (Playwright/Cypress)
- [ ] Performance monitoring (Web Vitals)
- [ ] A/B testing framework
- [ ] Real-time inventory updates

### Medium Priority
- [ ] Advanced filtering/search
- [ ] User authentication
- [ ] Shopping cart functionality
- [ ] Checkout flow

### Low Priority
- [ ] Wishlists
- [ ] Product reviews
- [ ] Social sharing
- [ ] Recommendations engine

## 📝 Environment Variables

Create `.env.local`:
```bash
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🤝 Contributing

1. Follow Atomic Design structure
2. Write tests for new features
3. Update Storybook stories
4. Maintain TypeScript strict mode
5. Follow existing naming conventions

## 📄 License

This is a technical assessment project. All rights reserved.

## 🙏 Acknowledgments

- **Design Reference**: https://meshur.co/
- **API Structure**: https://api.meshur.co/docs
- **Next.js**: React framework
- **Tailwind CSS**: Utility-first CSS
- **Framer Motion**: Animation library
- **Zustand**: State management

---

**Built with ❤️ for Frontend Developer Assessment**
