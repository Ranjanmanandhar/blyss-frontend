 import React, { useMemo } from "react";

 export default function Otp({value, valueLength, onChange}) {
    const re = new RegExp(/^\d+$/);

    const valueItems = useMemo(()=> {
        const items = [];
        const valueArray = value.split('');
        
        for(let i = 0; i < valueLength; i++) {
            const char = valueArray[i];
            if(re.test(char)) {
                items.push(char);
            }else {
                items.push('');
            }
        }

        return items;
    },[value, valueLength ]);

    const inputOnChange =  (e,idx) => {
        const target = e.target;
        let targetValue = target.value.trim();
        const isTargetValueDigit = re.test(targetValue);

        
        if(!re.test(targetValue) && targetValue != '') {
            return ;
        }
        targetValue = isTargetValueDigit ? targetValue : ' ';

        const targetValueLength = targetValue.length;

        if(targetValueLength === 1) {
            const newValue = value.substring(0,idx) + targetValue + value.substring(idx + 1);

            onChange(newValue);
    
            const nextElementSibling = target.nextElementSibling;
    
            if (nextElementSibling) {
                nextElementSibling.focus();
            }
        }else if(targetValueLength === valueLength) {
            onChange(targetValue);

            target.blur();
        }

       

        
    }

    const inputOnKeyDown = (e) => {
        const target = e.target;
        const targetValue = target.value;

        target.setSelectionRange(0, targetValue.length);

        if (e.key !== 'Backspace' || target.value !== '') {
            return;
        }

        const previousElementSibling = target.previousElementSibling;

        if (previousElementSibling) {
            previousElementSibling.focus();
        }
    }

    const inputOnFocus = (e) => {
        const { target} = e;
        target.setSelectionRange(0, target.value.length);

    }

    
     return <div className="otp-group">
        {
           valueItems.map((digit,idx) => (
                <input key={idx} 
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="\d{1}"
                    maxLength={6}
                    className="otp-input"
                    value={digit}
                    onChange={(e) => inputOnChange(e,idx)}
                    onKeyDown = {inputOnKeyDown}
                    onFocus={inputOnFocus}
                />
            )) 
        }
     </div>;
 }