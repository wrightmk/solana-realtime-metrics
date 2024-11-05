# Real-time Solana Metrics

The application provides real-time metrics from the Solana blockchain, including data visualization for solana transactions per second (TPS), a market cap distribution for 5 SPL tokens, and wallet balances for 10 wallets. The project is containerized using Docker and includes Redis caching for data handling and Websockets for real time data.

## Setup Instructions

### Prerequisites

- Docker
- Node.js 18 (for local development without Docker)
- Redis

### Configuration

1. Environment Variables: Ensure that an env file exists at /backend/.env with the following variables:

   `EXTRNODE_API_TOKEN=<your_extrnode_api_token>` available at <https://extrnode.com/>
   `REDIS_HOST=localhost`
   `REDIS_PORT=6379`

2. Ensure that Redis is installed

   - brew install redis
   - brew services start redis

3. Ensure that Docker is installed <https://docs.docker.com/desktop/install/mac-install/>

### Docker Setup

Docker Compose is set to spin up the following services:

- backend: Node.js server that handles Solana data requests and WebSocket connections
- frontend: Vite-compiled static frontend
- redis: Redis container for caching data

### Running the Application with Docker

1. Build and Start the Containers:

   1. open up your docker application
   2. `docker-compose up --build`

2. Access the Application:

   - Frontend: The frontend is accessible on <http://localhost:5173>
   - Backend: WebSocket server runs on port 8080, Redis on port 6379

3. Stop the Containers:

   - You can turn it off with `docker-compose down`

### Running the Application without Docker

1. Backend:

   - Navigate to the backend directory.
   - Install dependencies:
     `npm install`
   - Run the backend server:
     `npm run dev`

1. Frontend:

   - Navigate to the frontend directory.
     Install dependencies:
     `npm install`
   - Start the frontend server:
     `npm run dev`

### Running Tests

Tests are setup for the frontend only using Vitest and React Testing Library

Run Tests:

1. cd frontend
2. `npm run test`

### Development Decisions

#### Websockets

I chose to use WebSockets because they support full-duplex communication, meaning data can flow freely between server and clients in both directions without any delays. This setup is ideal for the real-time dashboard, where frequent updates are needed, as it allows instant changes without waiting for client requests.

I also use Redis as a caching layer to avoid overwhelming the Extrnode RPC and prevent rate limiting. The server pulls the latest data at intervals, caches it, and then broadcasts updates to all clients from the cache rather than making separate requests for each user.

#### Cache Duration Choices

TransactionsPerSecond Dataset:

- I use the getRecentPerformanceSamples RPC method to retrieve the last 10 samples of data, where each sample spans 60 seconds (samplePeriodSecs). This way, each fetch captures about 10 minutes of recent TPS activity. Since each sample represents 60 seconds, I pull the RPC every minute that way the data is always fresh.

MarketCap + WalletBalance Dataset:

- Since the metric in these datasets fluctuate less often, I’ve set a 5-minute cache duration. This balance keeps requests to a minimum which avoids rate limits from the RPC. I also request pricing data from coingecko and wallet data from the RPC in batches to limit my requests.

#### Separation of Concerns

The code is structured with a focus on separation of concerns, making it easy to scale when new features are added. API calls like fetchTps, fetchMarketCap, and fetchWalletBalances live in dedicated service files, while WebSocket handling is isolated in server.ts. This way, each piece can be updated independently without breaking everything else. On the frontend, I’ve also organized the chart components (MarketCapPieChart, TpsTimeSeriesChart, WalletBalanceBarChart) in a Charts folder, each with its own test file.

#### Testing Strategy

Testing is primarily handled with Vitest and React Testing Library. There are 7 tests that cover the following functionality:

- Making sure page has loaded
- Check that data is passed into into each of the 3 charts
- If data isn't loaded into a chart, it tests whether a loading message displays for each of the 3 charts

#### Updates / Bugfixes

- Token price data should not have been cached because theres a guard preventing the flow from making it there
- marketCapData should have been cached for 5 mins not 1 min
- refactor service cache guard into a util
- fetchMarketCap try/catch should return an array not an object
- Rename types for clarity, make sure they are being used everywhere. Use interface for RPC response types to extend a common response base interface
- Use seriesData instead of data const for empty array guard so it takes into account the useEffect computation and doesn't flicker different data
- add loading spinner svg animation
- fix undefined tooltip labels on WalletBalanceBarChart
