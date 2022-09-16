
# Countries App

An application that allows you to know all the countries of the world and obtain information about them. It also allows the creation of activities that can be carried out in these countries.




## API and Client startup instruction

First, install all dependencies with npm (In their respective folders)

```bash
  npm install 
```

Second, run the API and the Client with (In their respective folders)
```bash
  npm run start
```

## API Environment Variables

To run this project, you will need to add the following environment variables to your .env file in "api" folder


`DB_HOST`

`DB_NAME`

`DB_PASSWORD`

`DB_USER`

## Running Tests

To run tests, run the following command (In their respective folders)

```bash
  npm run test
```


## API Reference

#### Get all countries

```http
  GET /api/countries
```

#### Get a country by name

```http
  GET /api/countries/?name=
```

| Query | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. name of the country to search |

```http
  GET /api/countries/:code
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `code`      | `string` | **Required**. code of the country to search |

#### Get all activities

```http
  GET /api/activities
```

  #### Post an activitie

```http
  POST /api/activities
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. name of the activity |
| `difficulty`      | `string` | **Required**. Any string |
| `duration`      | `string` | **Required**. Any string |
| `season`      | `string` | **Required**. can only be one of those: "Spring", "Summer", "Fall", "Winter" |
| `country `      | `string` | **Required**. name of the country to search |


