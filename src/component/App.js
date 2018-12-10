import React from 'react';

function App () {
  var promise1 = new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve('foo');
    }, 300);
  });
  
  promise1.then(function(value) {
    console.log(value);
  });
  
  console.log(promise1);
  
  function resolveAfter2Seconds(x) { 
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    });
  }
  
  async function f1 () {
    var x = await resolveAfter2Seconds(10);
    console.log(x);
  }
  
  f1();
  
  console.log("foobar".includes("foo"));
  
  
  fetch('https://moji-cors-anywhere.herokuapp.com/https://api.similarweb.com/v1/website/skinmiso.com/total-traffic-and-engagement/visits?api_key=88b8b524f7c04567ad26b97afd990996&start_date=2018-09&end_date=2018-11&main_domain_only=true&granularity=monthly', {
    method: 'GET',
    headers: new Headers({'x-requested-with': 'XMLHttpRequest'})
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log('Request successful', json);
    })
    .catch(function(error) {
      console.log('Request failed', error)
    });
  
  return (
    <div>asdf</div>
  );
}

export default App;
