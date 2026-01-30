# Querit Website

Modern, performance-optimized website for Querit Oy - a Finland-based consulting company specializing in process consulting with technology and AI expertise.

## 🚀 Live Website

**URL**: TBD - https://querit.fi

## ⚡ Performance & SEO Optimizations

This website implements comprehensive performance and SEO optimizations:

- **Code Splitting**: Lazy loading for below-the-fold components
- **Font Optimization**: Preconnected Google Fonts with optimized loading
- **Image Optimization**: Lazy loading and proper sizing attributes  
- **SEO Ready**: JSON-LD structured data, proper meta tags, and semantic HTML
- **Performance**: Throttled scroll listeners and optimized React patterns
- **Accessibility**: Proper heading hierarchy and alt attributes

## 🛠️ Technologies

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite with SWC
- **Icons**: Lucide React
- **Animations**: CSS animations + React transitions
- **State Management**: React hooks
- **Routing**: React Router v6

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Querit-Oy/Website.git

# Navigate to project directory
cd Website

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── HeroSection.tsx # Landing section
│   ├── AboutSection.tsx# Company information
│   ├── Navigation.tsx  # Site navigation
│   └── ...             # Other sections
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── utils/              # Helper functions
└── index.css           # Global styles
```

## 🎨 Key Features

- **Responsive Design**: Mobile-first approach with breakpoint-specific optimizations
- **Modern UI**: Clean, professional design with Nordic-inspired color palette
- **Performance First**: Optimized bundle size and loading patterns
- **SEO Optimized**: Search engine friendly with structured data
- **Accessibility**: WCAG compliant with proper semantic markup

## 🚀 Deployment

The website is automatically deployed via your preferred hosting platform. For manual deployment:

```bash
# Build the project
npm run build

# Deploy the dist/ folder to your hosting provider
```

## 📝 Content Management

Website content is managed through React components. Key sections:

- **Hero Section**: Main landing area with call-to-action
- **About Section**: Company information and founder profiles  
- **Mission & Values**: Company principles and approach
- **Process Section**: How we work methodology
- **Contact Section**: Contact information and inquiry form

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add some improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📄 License

This project is proprietary to Querit Oy. All rights reserved.

## 📧 Contact

**Querit Oy**  
Finland-based consulting company  
Website: https://querit.fi

For technical questions about this repository, please open an issue.
