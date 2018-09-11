document.addEventListener('DOMContentLoaded', () => {
  const endPoint = 'http://localhost:3000/api/v1/events';
  fetch(endPoint)
    .then(res => res.json())
    .then(json =>
    json.forEach(event => {
      const markup = `
      <li>
        <h2>${event.name}<button>edit</button></h2>
          </li>
            <li>
            <h4>${event.description}<button>edit</button></h4>
            </li>
            <li>
            <h4>${event.priority}<button>edit</button></h4>
            </li>
            `
        ;

        document.querySelector('#events').innerHTML += markup;
    }));
});
