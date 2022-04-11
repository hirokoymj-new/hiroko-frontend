# hirokoymj.com

- Live URL: https://www.hirokoymj.com
- GraphQL API: https://hirokoymj-backend.herokuapp.com/
- GraphQL API repo: https://github.com/hirokoymj/hirokoymj-backend
- Database: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Deployment Server: [Heroku](https://dashboard.heroku.com/apps)

## Core packages

- React v17
- React Hooks
- Redux Toolkits - This is a the newest version of Redux. https://redux-toolkit.js.org/
- React Router Dom (version 5.x)
- Form - [React Hook Form](https://react-hook-form.com/)
- Form validation: [Yup](https://react-hook-form.com/get-started#SchemaValidation) (schema-based form validation).
- For GraphQL APIs - Using `useQuery`, `useMutation` and `useLazyQuery` from React Apollo client.
- For REST APIs - Using `useAxios` from [Axios-hooks](https://github.com/simoneb/axios-hooks).
- Material UI (version 4.x) - [UI library](https://v4.mui.com/) will helpful to build re-usuable components and also we can remove css files in React app repository.

## APIs

**Weather API:**

- [OpenWeather](https://openweathermap.org/api)
- Current Weather Data:

  ```text
  https://api.openweathermap.org/data/2.5/weather?q=tokyo&units=metric&appid={id}
  ```

- Daily Forecaset 7 days:

  ```text
  https://api.openweathermap.org/data/2.5/forecast/daily?q=tokyo&units=metric&cnt=7&appid={id}
  ```

- Implemented the API in GraphQL as datasource

**Covid 19 API**

- [Postman COVID-19 API Resource Center](https://postman-toolboxes.github.io/covid-19/)
- Historical Data for all Counties in a Specified State

  ```text
  https://corona.lmao.ninja/v2/historical/usacounties/:state?lastdays=30
  ```

## Run localhost

```js
yarn dev
```

http://localhost:3000/
