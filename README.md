# Professional Resume Builder

A modern, feature-rich resume builder web application built with Vue 3, TypeScript, Vite, and Tailwind CSS. Create ATS-friendly professional resumes with live preview and PDF export capabilities.

## Features

- **Live Preview**: See your resume update in real-time as you type
- **PDF Export**: Download your resume as a high-quality PDF with one click
- **Auto-Save**: Your data is automatically saved to browser localStorage
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **No Backend Required**: Completely client-side application that works offline
- **Professional Templates**: ATS-friendly resume format
- **Easy Data Management**: Add/remove sections dynamically

## Technology Stack

- **Vue 3** - Progressive JavaScript framework with Composition API
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **html2pdf.js** - Client-side PDF generation
- **localStorage** - Data persistence

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm installed

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd resume-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage Guide

### First Time Usage

1. When you first open the application, you'll see an empty resume form
2. Fill in your information in the left panel
3. Watch the live preview update on the right panel
4. Click "Download PDF" when you're ready to export

### Returning Users

- If you've used the app before, you'll see a modal asking if you want to load your previous data or start fresh
- Choose "Load Existing Data" to continue editing your saved resume
- Choose "Start Fresh" to clear all data and start over

### Managing Sections

- **Add Items**: Click the "+ Add" buttons to add new entries to any section
- **Remove Items**: Click "Remove" buttons to delete specific entries
- **Reset All**: Click "Reset All" in the top-right to clear all data (with confirmation)

### Downloading Your Resume

1. Fill in all required information
2. Review the live preview on the right
3. Click the "Download PDF" button
4. Your resume will be downloaded as `Resume_[YourName].pdf`

## Project Structure

```
resume-app/
├── src/
│   ├── components/
│   │   ├── App.vue              # Main application component
│   │   ├── LoadDataModal.vue    # Modal for loading existing data
│   │   ├── ResumeForm.vue       # Form inputs (left panel)
│   │   └── ResumePreview.vue    # Live preview (right panel)
│   ├── composables/
│   │   ├── useLocalStorage.ts   # localStorage operations
│   │   └── usePdfGenerator.ts   # PDF generation logic
│   ├── types/
│   │   └── resume.ts            # TypeScript interfaces
│   ├── main.ts                  # Application entry point
│   └── style.css                # Global styles
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── README.md                   # This file
```

## Features in Detail

### Data Persistence

- All data is automatically saved to browser localStorage
- No data is sent to any server
- Data persists across browser sessions
- Works completely offline after initial load

### Resume Sections

1. **Personal Information**: Name, title, email
2. **Profile Overview**: Professional summary
3. **Key Highlights**: Bullet points of key achievements
4. **Professional Experience**: Job history with responsibilities
5. **Technical Skills**: Categorized skills
6. **Project Experience**: Notable projects and descriptions

### PDF Generation Settings

- Format: Letter size (8.5" × 11")
- Orientation: Portrait
- Margins: 0.5 inches
- Quality: High (scale: 2, quality: 0.98)
- ATS-friendly formatting

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Development

### Type Checking

```bash
npm run build
```

This runs `vue-tsc` for TypeScript type checking before building.

### Code Style

- Use TypeScript strict mode
- Follow Vue 3 Composition API best practices
- Use `<script setup>` syntax
- Implement proper type definitions

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Vercel will auto-detect Vite and configure the build
4. Deploy!

### Other Platforms

The built files in `dist/` can be deployed to any static hosting service:
- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting
- Cloudflare Pages

## Privacy & Data Security

- **No data collection**: This app doesn't collect, transmit, or store any data on external servers
- **Local storage only**: All data is stored in your browser's localStorage
- **No analytics**: No tracking or analytics scripts
- **Completely private**: Your resume data never leaves your device

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

## Acknowledgments

- Built with [Vue 3](https://vuejs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- PDF generation by [html2pdf.js](https://github.com/eKoopmans/html2pdf.js)
- Powered by [Vite](https://vitejs.dev/)
