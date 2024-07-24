import React, { useId } from 'react'


function InputBox({   /**we are using many variables to handle tasks, as it is used in production-grade level codes */
  label,
  amount,
  onAmountChange,   /**on currency change and amount change, we will handle the input box */
  onCurrencyChange,   
  currencyOptions=[],       /**data se aega */
  selectCurrency="usd",     /**default currency conv select option */
  amountDisabled = false,   /*is user doesnt want to give amount, we use this variable to handle that case*/
  currencyDisabled = false, /**if user does not want to change currency, this variable handles that case */
  className = "",
}) {

    const amountInputId = useId();

  return (
      <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}> 
{/* css in backticks to pass user-made css through the InputBox function, jo bhi classname user pass karra h, that will be used in div. */}
          <div className="w-1/2">
              <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
                {label}
              </label>
              <input 
                  id={amountInputId}    //to bind input and label, we are using useId hook to bind things together.. we cannot use useId on keys of an object according to react docs
                  className="outline-none w-full bg-transparent py-1.5"
                  type="number"
                  placeholder="Amount"
                  disabled={amountDisabled}       //Component me attributes ko prop ka ref diya, and app.jsx me prop ka nam use kiya
                  value={amount}
                  onChange={(e) => onAmountChange &&  onAmountChange(Number(e.target.value))}
              />
          </div>
          <div className="w-1/2 flex flex-wrap justify-end text-right">
              <p className="text-black/40 mb-2 w-full">Currency Type</p>
              <select
                  className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                  value={selectCurrency}
                  onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                  disabled={currencyDisabled}
              >
              
              {currencyOptions.map((currency) => (
                  <option key={currency} value={currency}>
                    ${currency}
                  </option>
              ))}
              </select>
          </div>
      </div>
  );
}

export default InputBox;
