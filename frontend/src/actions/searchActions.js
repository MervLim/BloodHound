import axios from 'axios';

export const searchTerm = (searchTerm) => {
  return {
    type: 'SEARCH_TERM',
    searchTerm
  };
}

export const displayResult = (result) => {
  return {
    type: 'DISPLAY_RESULT',
    result

  };
}

export const displayNewsResult = (news) => {
  return {
    type: 'DISPLAY_NEWS',
    news
  };
}

export const updateEntryPrice = (stock) => {
  console.log(stock);
  return {
    type: 'UPDATE_ENTRY_PRICE',
    stock
  };
}



export const getStock = (searchTerm) => {
  console.log('im inside getStock actions')
  return (dispatch) => {
    console.log('im in axios dispatch');
    axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+searchTerm+'&interval=30min&apikey=GQBU0ZPN342PFXI9')
      .then( (response) => {
        let stock = response.data;
        console.log(stock);
        dispatch(displayResult(stock));
      })
      .catch((error)=> {
        console.error("AJAX: Could not get stock @ AlphaVantage")

      });
  };
}


export const getNews = (searchTerm) => {
  console.log('im inside getNews actions')
  return (dispatch) => {
    console.log('im in axios dispatch');
    axios.get('https://api.intrinio.com/news?identifier=' + searchTerm,{
      auth: {
        username:"8b7a23202198544d700701c368f70b33",
        password: "efba0961ecad8ed67106e07468537d8e"
      }
    })
      .then( (response) => {
        let news= [];
        console.log(response.data);
        news.push(response.data);
        dispatch(displayNewsResult(news));
      })
      .catch((error)=> {
        console.error("AJAX: Could not get news @ NewsAPI")

      });
  };
}

export const updateUserPreference = (result, id) => {

  return (dispatch) => {
    dispatch(updateEntryPrice(result));
    console.log('im in axios dispatch');
    axios.post('/preference/update/'+id, result)
      .then( (response) => {
        console.log('pre dispatch!!!')

      })
      .catch((error)=> {
        console.error("AJAX: Could not update user DB")

      });
  };
}
