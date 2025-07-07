# SEDA Tokenomics Dashboard

An interactive dashboard for SEDA tokenomics analysis with real-time data visualization, built with Next.js and styled to match the SEDA Explorer aesthetic.

## Features

- **Glass-morphism Design**: Frosted-glass panels with backdrop blur effects
- **Interactive Parameters**: Adjustable requests per minute slider with competitor benchmarks
- **Real-time Charts**: Toggle between cumulative data requests and USD value paid
- **Responsive Layout**: Two-column desktop layout that stacks on mobile
- **Share Functionality**: Copy URL to clipboard or trigger native share on mobile
- **SEDA Tokenomics**: Real-time calculations for delegation and burning mechanisms

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom glass-morphism utilities
- **Charts**: Recharts for interactive data visualization
- **Icons**: Lucide React for consistent iconography
- **Deployment**: Vercel-ready configuration

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Start production server**:
   ```bash
   npm start
   ```

## Deployment

This project is configured for seamless deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with the included `vercel.json` configuration

## Design System

### Colors
- **Deep Navy**: `#050a14` - Primary background
- **Navy**: `#0a0e1a` - Secondary background  
- **Neon Teal**: `#00f5d4` - Primary accent
- **Mint**: `#7fffd4` - Secondary accent
- **Blue**: `#0066ff` - Chart gradients

### Glass Effects
- `backdrop-filter: blur(20px)` on all panels
- Subtle borders with `rgba(255, 255, 255, 0.1)`
- Soft shadows with neon teal glow on hover

### Animations
- 200ms ease-in-out transitions
- Hover effects with scale and glow
- Smooth chart interactions

## Components

- **ParametersPanel**: Slider for requests per minute with competitor benchmarks
- **TimeRangeSelector**: Glassy segmented controls for time periods
- **ChartArea**: Interactive area charts with toggle between data types
- **SummaryCards**: Real-time calculations for SEDA delegation and burning
- **ShareButton**: Cross-platform sharing with clipboard fallback
- **ToastNotification**: Feedback for user actions

## Tokenomics Calculations

The dashboard calculates SEDA tokenomics based on:
- **Data Request Cost**: Fixed at $0.005 per request
- **Requests per Minute**: User-adjustable (2,500 - 200,000)
- **Time Range**: 1 day to 3 years
- **Distribution**: 50% to SEDA Delegation, 50% burned from supply

## Browser Support

- Modern browsers with CSS backdrop-filter support
- Fallback for older browsers with reduced glass effects
- Mobile-responsive with touch-friendly interactions

## License

MIT License - see LICENSE file for details. 