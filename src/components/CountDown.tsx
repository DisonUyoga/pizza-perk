"use client";

import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";

interface CountDownProps {
  date: string;
}

const CountDown = ({ date }: CountDownProps) => {
  const [deliveryTag, setDeliveryTag] = useState(false);

  useEffect(() => {
    validateDate(date);
  }, [date]);
  function validateDate(d: string) {
    const currentDate = new Date();
    const futureDate = new Date(d);
    if (futureDate > currentDate) {
      setDeliveryTag(true);
    }
  }
  return (
    <div className="flex-col items-center justify-center">
      {deliveryTag && (
        <p
          className="text-gray-100 mb-2"
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
        >
          Free Delivery Now
        </p>
      )}
      {deliveryTag && (
        <Countdown className="font-bold text-2xl text-yellow-300" date={date} />
      )}
    </div>
  );
};

export default CountDown;
