"use client";

import { ChangeEvent, useRef, useState } from "react";

// import Image from "next/image";
// import styles from "./page.module.css";

import { ModelsModal } from "./modelsModal";

export default function Home() {

  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<string>('select model');
  const promptText = useRef('');
  const [imagesLinks, setImagesLinks] = useState<string[]>([]);

  const changeVisibility = () => {
    setModalVisibility((prev) => {
      return !prev
    })
  }

  const changePromptText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    promptText.current = e.target.value;
  }

  const selectModel = (modelName: string) => {
    setSelectedModel(modelName);
    setModalVisibility((prev) => {
      return !prev
    })
  }

  const generateImage = async () => {
    if (promptText.current.length > 0 && selectedModel !== 'select model') {
      const response = await fetch('https://api.kemuri.top/v1/images/generations', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "prompt": promptText.current,
          "model": selectModel
        })
      })

      const data = await response.json();
      const { urls } = data;
      console.log(urls);
      setImagesLinks(urls)
    }
  }

    return (
      <div className="mainPage">
        <section className="settingSection">
          <button onClick={changeVisibility} className="selectBtn">{selectedModel}</button>
          <textarea onChange={changePromptText} className="promptArea" name="" id="" >

          </textarea>
          <button onClick={generateImage} className="generateBtn">generate</button>
        </section>
        <section className="generatedImagesWrap">
          <div className="generatedImages">
            {imagesLinks.map(link => {
              return (
                <img className="generatedImage" src={link} alt={promptText.current} key={link} />
              )
            })}
          </div>
        </section>
        {modalVisibility && <ModelsModal changeVisibility={changeVisibility} selectModel={selectModel} />}
      </div>
    );
  }
