import React, { useEffect, useState } from 'react'
import TipBtnComponent from './TipBtnComponent';
import personIcon from  '../assets/images/icon-person.svg'
import dollarIcon from '../assets/images/icon-dollar.svg'
import splitLogo from '../assets/images/logo.svg'

const TipCalculatorComponent = () => {


    const [bill, setBill] = useState('');
    const [tipPercentage, setTipPercentage] = useState(null);
    const [customTip, setCustomTip] = useState('');
    const [people, setPeople] = useState('');
    const [tipAmount, setTipAmount] = useState(0);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState('');
  
    const tipOptions = [5, 10, 15, 25, 50];
  
    useEffect(() => {
      calculateTip();
    }, [bill, tipPercentage, customTip, people]);
  
    const calculateTip = () => {
      if (!bill || !people || parseFloat(people) == 0) {
        setTipAmount(0);
        setTotal(0);
        return;
      }
  
      const billValue = parseFloat(bill);
      const peopleValue = parseFloat(people);
      const tipValue = customTip ? parseFloat(customTip) : tipPercentage;
  
      if (billValue && peopleValue && tipValue) {
        const tipTotal = billValue * (tipValue / 100);
        const tipPer = tipTotal / peopleValue;
        const totalPer = (billValue + tipTotal) / peopleValue;
  
        setTipAmount(tipPer);
        setTotal(totalPer);
      }
    };
  
    const handleBillChange = (e) => setBill(e.target.value);
    const handleCustomTipChange = (e) => {
      setCustomTip(e.target.value);
      setTipPercentage(null);
    };
  
    const handlePeopleChange = (e) => {
      const value = e.target.value;
      setPeople(value);
      setError(value == "0" ? "Can't be zero" : "");
    };
  
    const handleTipSelection = (percent) => {
      setTipPercentage(percent);
      setCustomTip('');
    };
  
    const handleReset = () => {
      setBill('');
      setTipPercentage(null);
      setCustomTip('');
      setPeople('');
      setTipAmount(0);
      setTotal(0);
      setError('');
    };
  
    const isResetActive = bill || tipPercentage || customTip || people;


  return (
    <div className="bg-[#C5E4E7] min-h-screen flex flex-col items-center justify-center py-8">
    <div className="text-[#00494D] font-bold mb-10">
      <img src={splitLogo} alt="Splitter Logo" />
    </div>

    <div className="bg-white rounded-3xl p-6 shadow-lg w-full max-w-4xl mx-4 md:flex md:gap-8">
      <div className="md:w-1/2 mb-6 md:mb-0">
        <div className="mb-6">
          <label className="block text-[#5E7A7D] mb-2 font-bold text-sm">Bill</label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#7F9C9F]">
              <img src={dollarIcon} alt="Dollar Icon" />
            </div>
            <input 
              type="number"
              value={bill}
              onChange={handleBillChange}
              placeholder="0"
              className="bg-[#F4FAFA] text-[#00494D] p-2 px-4 text-right rounded-md w-full font-bold text-2xl focus:outline-none focus:ring-2 focus:ring-[#26C0AB]"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-[#5E7A7D] mb-2 font-bold text-sm">Select Tip %</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {tipOptions.map((percent) => (
              <TipBtnComponent
                key={percent}
                percentage={percent}
                isSelected={tipPercentage == percent}
                onClick={handleTipSelection}
              />
            ))}
            <input
              type="number"
              value={customTip}
              onChange={handleCustomTipChange}
              placeholder="Custom"
              className="bg-[#F4FAFA] text-[#00494D] p-2 text-right rounded-md font-bold text-xl focus:outline-none focus:ring-2 focus:ring-[#26C0AB]"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="block text-[#5E7A7D] font-bold text-sm">Number of People</label>
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </div>
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#7F9C9F]">
              <img src={personIcon} alt="Person Icon" />
            </div>
            <input
              type="number"
              value={people}
              onChange={handlePeopleChange}
              placeholder="0"
              className={`bg-[#F4FAFA] text-[#00494D] p-2 px-4 text-right rounded-md w-full font-bold text-2xl focus:outline-none focus:ring-2 ${error ? 'ring-2 ring-red-500' : 'focus:ring-[#26C0AB]'}`}
            />
          </div>
        </div>
      </div>

      <div className="bg-[#00494D] rounded-xl p-6 md:w-1/2 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-white font-bold text-sm">Tip Amount</p>
              <p className="text-[#7F9C9F] text-xs">/ person</p>
            </div>
            <p className="text-[#26C0AB] text-4xl font-bold ">${tipAmount.toFixed(2)}</p>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-white font-bold text-sm">Total</p>
              <p className="text-[#7F9C9F] text-xs">/ person</p>
            </div>
            <p className="text-[#26C0AB] text-4xl font-bold ">${total.toFixed(2)}</p>
          </div>
        </div>

        <button
          onClick={handleReset}
          disabled={!isResetActive}
          className={`mt-10 py-2 rounded-md font-bold text-xl uppercase ${
            isResetActive 
              ? 'bg-[#26C0AB] text-[#00494D] hover:bg-[#9fe8df]' 
              : 'bg-[#0D686D] text-[#00494D] cursor-not-allowed'
          }`}
        >Reset</button>
      </div>
    </div>
  </div>
  )
}

export default TipCalculatorComponent
