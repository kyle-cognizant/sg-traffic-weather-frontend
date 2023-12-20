<h1 align="center" style="">
  📸🚦🌤<br/>
  SG Traffic + Weather Frontend
</h1>

> This is my submission for a technical assessment as part of an interview process.

Frontend client for [SG Traffic + Weather Backend](https://github.com/kyle-cognizant/sg-traffic-weather-backend).

## Installation

```bash
$ npm install
```

## Running the app

First ensure that [the backend](https://github.com/kyle-cognizant/sg-traffic-weather-backend) is running at localhost:3000.

```bash
# In development
$ npm run dev

# In production mode
$ npm run build && npm run preview
```

Open browser [http://localhost:5173/](http://localhost:5173/)

## Notes

### Architecture & Design
- I kept the frontend architecture lightweight and minimal, since the current scope of the app is very small. This has the benefit of reduced dependencies and bundle size.
- No network calls are made directly to data.gov.sg. Instead, we fetch data from our API.

### Possible Enhancements
- Add error handling when API calls fail
- Use Zustand or React Context for state management. This will reduce prop drilling.
- Add tests with jest and playwright
- Use react-query to abstract away state, logic, loading, etc for data fetching.
- Show recent searches in real-time by subscribing to Server-Sent Events from our backend.
- Add sorting and filtering
- Move stuff to .env
