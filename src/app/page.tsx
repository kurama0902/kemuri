"use client";

import { ChangeEvent, useRef, useState } from "react";

// import Image from "next/image";
// import styles from "./page.module.css";

import { ModelsModal } from "./modelsModal";

export default function Home() {

  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<{
    modelName: string,
    category: string
  }>({
    modelName: 'select model',
    category: ''
  });
  const promptText = useRef('');
  const [imagesLinks, setImagesLinks] = useState<string[]>([]);
  const [isBlockedBtn, setIsBlockedBtn] = useState<boolean>(false);
  const [charactersCount, setCharactersCount] = useState<number>(0)

  const changeVisibility = () => {
    setModalVisibility((prev) => {
      return !prev
    })
  }

  const changePromptText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedModel.modelName !== 'select model') {
      promptText.current = e.target.value;
      setCharactersCount(promptText.current.length)
      if (selectedModel.category === 'general_models') {
        if (promptText.current.length > 150) {
          if (isBlockedBtn === false) {
            setIsBlockedBtn((prev) => {
              return !prev
            })
          }
          console.log(promptText.current.length);
        } else {
          if (isBlockedBtn === true) {
            setIsBlockedBtn((prev) => {
              return !prev
            })
          }
          console.log(promptText.current.length);
        }
      } else {
        promptText.current = e.target.value;
      }
    } else {
      e.target.value = '';
    }
  }

  const selectModel = ({ modelName, category }: { modelName: string, category: string }) => {
    setSelectedModel({ modelName, category });
    if (category === 'general_models' && promptText.current.length > 150) {
      if (isBlockedBtn === false) {
        setIsBlockedBtn((prev) => {
          return !prev
        })
      }
    }

    if (category !== 'general_models') {
      if (isBlockedBtn === true) {
        setIsBlockedBtn((prev) => {
          return !prev
        })
      }
    }

    setModalVisibility((prev) => {
      return !prev
    })
  }

  const generateImage = async () => {

    if (promptText.current.length > 0 && selectedModel.modelName !== 'select model') {
      const response = await fetch('https://api.kemuri.top/v1/images/generations', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "prompt": promptText.current,
          "model": selectedModel.modelName
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
        <button onClick={changeVisibility} className="selectBtn">{selectedModel.modelName}</button>
        <div className="promptAreaWrap">
          <textarea placeholder="Enter your promt.." onChange={changePromptText} className={`promptArea ${isBlockedBtn && 'invalidText'}`} maxLength={450} ></textarea>
          <span className="characters">{charactersCount}/{selectedModel.category === 'general_models' ? '150' : '450'}</span>
        </div>
        <div className={`generateBtnWrap ${isBlockedBtn && 'disabled'}`}>
          <button onClick={generateImage} className={`generateBtn ${isBlockedBtn && 'blockedBtn'}`}>generate</button>
        </div>
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
