"use client"

import { useEffect, useState } from "react";

const Quotes = () => {
  const [quote, setQuote] = useState("");  
  const [author, setAuthor] = useState("");
  const [fade, setFade] = useState(true);

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://api.api-ninjas.com/v1/quotes?category=education", {
        method: "GET",
        headers: {
          "X-Api-Key": "B+iQ4qTSxXJr/AnvANqokg==DMX8PNpGAVe019fT"     
      }});
      const data = await response.json();

    //   console.log("Quote API Fetched Data:", data);

      if (data && data.length > 0) {
        setQuote(data[0].quote);  
        setAuthor(data[0].author);
      } else {
        setQuote("Could not fetch quote"); // Fallback if no quote
        setAuthor("");  //Fallback if no author

      }
    } catch (error) {
      console.log("Error fetching quote:", error);
      setQuote("Error fetching quote"); // Fallback if error
      setAuthor("");
    }
  };

  useEffect(() => {
    fetchQuote(); // Fetch the first quote

    const interval = setInterval(() => {
      setFade(false);        // Start fade-out animation
      setTimeout(() => {
        fetchQuote();        // Fetch a new quote
       setFade(true);       // Start fade-in animation
      }, 2000);              // Wait for fade-out before updating quote
    }, 20000);               // Change quote every 10 seconds

    return () => clearInterval(interval); // Clean up the interval
  }, []);

  return (
    <div className="quotesContainer">
      <div className={`quoteContainer ${fade ? "quote fade-in animate_animated animate__zoomIn" : "quote fade-out"}`}>
        <h2>{quote ? `"${quote}"` : "Loading..."}</h2>
        <p>{author ? `- ${author} -` : ""}</p>
      </div>
    </div>
  );
}

export default Quotes;
