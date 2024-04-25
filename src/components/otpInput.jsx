"use client"
import OtpInput from 'react-otp-input';
import { useState } from 'react';

const OtpInputControl = () => {
    const [otp, setOtp] = useState('');
    return (
        <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            inputType='tel'
            inputStyle={{ border: "2px solid black", width: "50px", aspectRatio: "1/1", borderRadius: "2px" }}
            renderSeparator={<div className='w-full'></div>}
            renderInput={(props) => <input {...props} />}
        />
    )
}

export default OtpInputControl