# Life Categories Mobile App

A mobile-first Next.js application featuring category navigation, subcategories, and a context-aware chatbot. Built for webview integration in Android applications.

## Features

### ✨ Core Features
- **📱 Mobile-First Design**: Optimized for mobile devices (no desktop support needed)
- **🏷️ Category Cards**: Beautiful 2-column grid layout with 5 main categories
  - Health 🏥
  - Economy 💰
  - Education 📚
  - Moral Values ⚖️
  - Employment 💼
- **📋 Subcategory Pages**: Single-column layout showing related topics
- **💬 Context-Aware Chatbot**: Floating chatbot button with modal interface
  - Provides category-specific responses
  - Maintains conversation history per session
  - Beautiful gradient UI matching the app theme

### 🎨 Design Highlights
- Gradient colored category cards
- SCSS modules alongside Tailwind CSS
- Smooth animations and transitions
- Responsive mobile viewport (375px width optimized)
- Floating chat button with modal overlay

## Tech Stack

### Frontend
- **Next.js 14.2.3** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **SCSS Modules** - Custom styling alongside Tailwind
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - Database for categories, subcategories, and chat messages
- **Mongoose 8.3.0** - MongoDB ODM

### AI Integration
- **Mocked Chatbot** - Context-aware responses (ready for real LLM integration)
- Note: Emergent LLM integration prepared but uses mocked responses for now

## Project Structure

```
/app
├── app/
│   ├── api/[[...path]]/route.js    # All API endpoints
│   ├── page.js                      # Homepage with category cards
│   ├── subcategory/page.js          # Subcategory listing page
│   ├── layout.js                    # Root layout with mobile viewport
│   └── globals.css                  # Global styles
├── components/
│   └── Chatbot.js                   # Chatbot component
├── lib/
│   ├── mongodb.js                   # MongoDB connection utility
│   ├── openai.js                    # Chat response generator
│   └── models/
│       ├── Category.js              # Category model
│       ├── Subcategory.js           # Subcategory model
│       └── ChatMessage.js           # Chat message model
├── styles/
│   ├── categories.module.scss       # Homepage category cards styling
│   ├── subcategory.module.scss      # Subcategory page styling
│   └── chatbot.module.scss          # Chatbot styling
├── .env                             # Environment variables
└── package.json                     # Dependencies

## API Endpoints

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category

### Subcategories
- `GET /api/subcategories?categoryId=X` - Get subcategories for a category
- `POST /api/subcategories` - Create a new subcategory

### Chat
- `POST /api/chat` - Send message and get AI response
  ```json
  {
    "message": "Your question",
    "sessionId": "unique-session-id",
    "userId": "unique-user-id",
    "categoryId": "category-uuid",
    "categoryName": "Category Name"
  }
  ```
- `GET /api/chat/history?sessionId=X&userId=Y` - Get chat history

### Utilities
- `GET /api/seed` - Seed initial data (auto-run on first load)

## Database Models

### Category
```javascript
{
  id: String (UUID),
  name: String,
  icon: String (emoji),
  description: String
}
```

### Subcategory
```javascript
{
  id: String (UUID),
  categoryId: String,
  name: String,
  description: String
}
```

### ChatMessage
```javascript
{
  id: String (UUID),
  sessionId: String,
  categoryId: String,
  userId: String,
  sender: 'user' | 'bot',
  content: String,
  timestamp: Date
}
```

## Environment Variables

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=mobile_categories_app
NEXT_PUBLIC_BASE_URL=https://your-domain.com
CORS_ORIGINS=*
OPENAI_API_KEY=your-api-key (currently using mocked responses)
```

## Setup & Installation

1. **Install dependencies**
   ```bash
   yarn install
   ```

2. **Ensure MongoDB is running**
   ```bash
   sudo supervisorctl status mongodb
   ```

3. **Start the development server**
   ```bash
   yarn dev
   ```

4. **Access the app**
   - Local: http://localhost:3000
   - Production: Check NEXT_PUBLIC_BASE_URL

## Usage

### Homepage
- Displays 5 category cards in a 2-column grid
- Each card is clickable and navigates to subcategories
- Floating chatbot button in bottom-right corner

### Subcategory Page
- Shows related topics in single-column layout
- Back button to return to homepage
- Each subcategory displays name and description

### Chatbot
- Click floating button to open chat modal
- Type message and press Enter or click send button
- Receives context-aware responses based on current category
- Conversation history maintained per session
- Close button or click outside to dismiss

## Mobile Optimization

- Viewport: 375px width (iPhone standard)
- Maximum scale: 1 (prevents zoom)
- User-scalable: no (fixed mobile view)
- Touch-optimized buttons and cards
- Smooth animations for better UX

## Future Enhancements

- [ ] Real LLM integration with Emergent Universal Key
- [ ] User authentication
- [ ] Ability to add custom categories
- [ ] Search functionality
- [ ] Dark mode support
- [ ] Offline support with service workers
- [ ] Push notifications
- [ ] Analytics integration

## Development Notes

### SCSS Modules
The app uses SCSS modules alongside Tailwind for:
- Complex animations
- Component-specific styling
- Gradient backgrounds
- Mobile-specific layouts

### Context-Aware Chatbot
The chatbot provides category-specific responses:
- Health: Wellness tips, nutrition advice
- Economy: Financial guidance, investment basics
- Education: Learning strategies, study tips
- Moral Values: Ethical frameworks, moral reasoning
- Employment: Career advice, job search strategies

### Data Seeding
On first load, the app automatically seeds:
- 5 main categories
- 5 subcategories per category (25 total)
- All data persisted in MongoDB

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
