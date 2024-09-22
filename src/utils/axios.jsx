import axios from "axios";

const instance = axios.create(
    {
        baseURL : "https://api.themoviedb.org/3",
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODFjZjViMjJjYWQ5M2Q4MTY4ZmJiOWI5YTczNjRmYSIsIm5iZiI6MTcyNjA2MDYwMy43ODk4MTgsInN1YiI6IjY2ZTE3NzdhMjBjODlkM2VmNzA4MTM0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9UOoCB1o8vzne6U-jv7UwnQoulIvTph3uDkFuxk8LWQ'
          
        }
    }
);

export default instance ;