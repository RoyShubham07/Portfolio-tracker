# Portfolio Tracker

Portfolio Tracker is a web application designed to help users manage and track their investment portfolios. It allows users to add, edit, and view their stock holdings, calculate portfolio value, and retrieve real-time stock prices using a free stock API.

## Features

- **Dashboard**: View a summary of your stock portfolio.
- **CRUD Operations**: Add, edit, and delete stock details.
- **Real-Time Data**: Integration with a stock API to fetch live stock prices.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Backend API**: RESTful APIs built with Node.js and Express.

## Tech Stack

### Frontend
- **React** (preferred) or any modern framework
- **CSS Framework**: Tailwind CSS/Bootstrap (if applicable)

### Backend
- **Node.js**: Express.js framework
- **Database**: MySQL or equivalent relational database

### API Integration
- **Stock API**: Integration with free stock APIs (e.g., Alpha Vantage)

### Deployment
- **Frontend**: Vercel/Netlify
- **Backend**: Heroku/AWS/Render

## Getting Started

### Prerequisites
- Node.js and npm (for both frontend and backend)
- MySQL (or equivalent database)

### Installation

#### Backend
1. Clone the repository:
   ```bash
   git clone https://github.com/RoyShubham07/Portfolio-tracker.git
   cd Portfolio-tracker/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the database in `.env`.
4. Start the server:
   ```bash
   npm start
   ```

#### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd Portfolio-tracker/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```

## Usage

1. Open the application in your browser:
   ```
   http://localhost:3000
   ```
2. Add stock details to your portfolio.
3. View your portfolio value updated in real-time.

## API Reference

- **GET /stocks**: Fetch all stock holdings
- **POST /stocks**: Add a new stock
- **PUT /stocks/{id}**: Update stock details
- **DELETE /stocks/{id}**: Delete a stock

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Alpha Vantage API](https://www.alphavantage.co/) for real-time stock data.
- Inspiration from portfolio management tools.
