import axios from 'axios';
//base url to make requests to the movie db
const instance=axios.create({
    baseURL:"https://api.themoviedb.org/3"
});

export default instance;
//export default means 'instance' will be by default exported whenever an import statement is called. So in the import we can name it as anything.See Row.js