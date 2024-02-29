"use client"
import { useEffect, useState } from 'react';
import { HoverEffect } from "@/components/ui/card-hover-effect";

export default function CardHoverEffectDemo() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:4000/search/6')
      .then(response => response.json())
      .then(data => {
        const mappedData = data.map(item => ({
          title: item.model, // replace with actual property name from your API data
          description: `Tab: ${item.data.Tab}, Section: ${item.data.Section}`, // replace 'tab' and 'section' with actual property names from your API data
          link: `/search/6/${item.model}`, // replace 'model' with actual property name from your API data
          image: item.ImageUrl, // replace with actual property name from your API data
        }));
        setData(mappedData);
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={data} />
    </div>
  );
}