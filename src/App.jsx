import { useState } from 'react'
import './App.css'
import InputBox from './components/input'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import BackgroundImage from './assets/BackgroundImage.jpg'

function App() {
    
    const [amount,setAmount] = useState(0)  //amount change on ui
    const [from,setFrom] = useState("usd")  //from change hoga to change amount in ui accordingly
    const [to,setTo] = useState("inr")  //to change hoga to change amount in ui accordingly

    const [convertedAmount,setConvertedAmount] = useState(0)    //change ui state when convert button pressed

    const { data: currencyInfo, error } = useCurrencyInfo(from);

    const options = Object.keys(currencyInfo || {});

    const swapper = () => {
        setFrom(to)
        setTo(from)
        setConvertedAmount(amount)
        setAmount(convertedAmount)
    }


    const convert = () => {
        if (currencyInfo && currencyInfo[to]) {
          setConvertedAmount(amount * currencyInfo[to]);
        } else {
          console.error("Conversion rate not available");
        }
    }

  return (
      <div
          className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
          style={{
              backgroundImage: `url('${BackgroundImage}')`,
          }}
      >
          <div className="w-full">
              <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                  <form
                      onSubmit={(e) => {
                          e.preventDefault();
                          convert()
                      }}
                  >
                      <div className="w-full mb-1">
                          <InputBox
                              label="From"
                              amount={amount}
                              currencyOptions={options}
                              onCurrencyChange={(currency) => setAmount(amount)}
                              selectCurrency={from}
                              onAmountChange={(amount) => 
                                setAmount(amount)
                              }
                          />
                      </div>
                      <div className="relative w-full h-0.5">
                          <button
                              type="button"
                              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                          >
                            swap
                          </button>
                      </div>
                      <div className="w-full mt-1 mb-4">
                          <InputBox
                              label="To"
                              amount={convertedAmount}
                              currencyOptions={options}
                              onCurrencyChange={(currency) => setTo(amount)}
                              selectCurrency={from}
                              
                          />
                      </div>
                      <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg" onClick={swapper}>
                          Convert {from.toUpperCase()} to {to.toUpperCase()}
                      </button>
                  </form>
              </div>
          </div>
      </div>
  );
}

export default App
