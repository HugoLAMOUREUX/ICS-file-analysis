import React, { useEffect, useState } from "react";

const Test = () => {
  const [int, setInt] = useState(0);
  const [obj, setObj] = useState({});
  const [bool, setBool] = useState(false);

  useEffect(() => {
    const getDelay = async () => {
      await setTimeout(1000);
      setInt(2);
      setObj({ bonjour: "test" });
      setBool(true);
      console.log("int", int);
      console.log(obj);
      console.log(bool);
    };
    getDelay();
  }, [bool]);
  return (
    <div>
      <button onClick={() => {}}>Bonjour</button>
    </div>
  );
};

export default Test;
