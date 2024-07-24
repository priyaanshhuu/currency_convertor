//custom hook is just a funciton


//ex:

// function useXYZ(){
//   retrun []
// }


import { useState, useEffect } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_3kp2lbsXaPE1l8HHqwxXedXg4PuypLV1LNoO1UQW`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((res) => {
        setData(res.data);  // Assuming the API returns data in `res.data`
        setError(null);  // Clear any previous errors
      })
      .catch((err) => {
        console.error("Fetch error: ", err);
        setError(err.message);
      });
  }, [currency]);

  return { data, error };
}

export default useCurrencyInfo;
