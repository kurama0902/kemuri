"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

import { ModelsOrLorasModal } from "../components/modelsOrLorasModal";
import { AdditionalSettings } from "../components/AdditionalSettings";
import { GeneratingPreloader } from "../components/GeneratingPreloader";

import s from "./generate.module.css";

export default function Generate() {

  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<{
    modelName: string,
    category: string
  }>({
    modelName: 'select model',
    category: ''
  });
  const [selectedLoras, setSelectedLoras] = useState<{
    loras: string[],
    category: string
  }>({
    loras: [],
    category: ''
  })
  const promptText = useRef('');
  const [showGeneratingPreloader, setShowGeneratingPreloader] = useState<boolean>(true);
  const [imagesLinks, setImagesLinks] = useState<string[]>([]);
  const [isBlockedBtn, setIsBlockedBtn] = useState<boolean>(false);
  const [isBlockedBtnAfterPrompt, setIsBlockedBtnAfterPrompt] = useState<boolean>(false);
  const [charactersCount, setCharactersCount] = useState<number>(0);
  const [isShowNotification, setIsShowNotification] = useState<boolean>(false);
  const [vae, setVae] = useState<string>('');
  const [samplingMethod, setSamplingMethod] = useState<string>('');


  const handleSetVae = (vae: string) => {
    setVae(vae);
  }

  const handleSetSamplingMethod = (method: string) => {
    setSamplingMethod(method)
  }

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

  const selectLoras = ({ lora, category }: { lora: string, category: string }) => {
    if (selectedLoras.loras?.includes(lora)) {
      const newLoras = selectedLoras.loras.filter(el => el !== lora);
      setSelectedLoras({
        loras: newLoras,
        category: newLoras.length > 0 ? category : ''
      });
    } else {
      const newLoras = [...selectedLoras.loras, lora]
      setSelectedLoras({
        loras: newLoras,
        category: category
      })
    }
  }

  const generateImage = async () => {
    try {
      if (promptText.current.length > 0 && selectedModel.modelName !== 'select model') {
        setIsBlockedBtnAfterPrompt(true)
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
        setIsBlockedBtnAfterPrompt(false)
      }
    } catch (error) {
      setIsShowNotification(true)
      setTimeout(() => {
        setIsShowNotification(false);
        setIsBlockedBtnAfterPrompt(false);
      }, 1500)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setShowGeneratingPreloader(false);
    }, 1500);
  }, [])

  return (
    <div className={s.mainPage}>
      {showGeneratingPreloader && <GeneratingPreloader />}
      <div className={s.settingSectionWrap}>
        <section className={s.settingSection}>
          <div className={`${s.btnWrap} ${modalVisibility && s.mobBtnWrap}`}>
            <button onClick={changeVisibility} className={s.selectBtn}>
              <span>
                {selectedModel.modelName}
              </span>
            </button>
            <div className={s.btnBG}></div>
          </div>
          <div className={s.promptAreaWrap}>
            <textarea placeholder="Enter your promt.." onChange={changePromptText} className={`${s.promptArea} ${isBlockedBtn && s.invalidText}`} maxLength={450} ></textarea>
            <span className={s.characters}>{charactersCount}/{selectedModel.category === 'general_models' ? '150' : '450'}</span>
          </div>
          {
            (selectedModel.category !== 'general_models' && selectedModel.modelName !== 'select model') && <AdditionalSettings selectedLoras={selectedLoras} selectLoras={selectLoras} vae={vae} handleSetVae={handleSetVae} samplingMethod={samplingMethod} handleSetSamplingMethod={handleSetSamplingMethod} />
          }
          <div className={`${s.btnWrap} ${s.generateBtnWrap} ${isBlockedBtn && s.disabled} ${isBlockedBtnAfterPrompt && s.disabled}`}>
            <button onClick={generateImage} className={`${s.generateBtn} ${isBlockedBtn && s.blockedBtn} ${isBlockedBtnAfterPrompt && s.generatingProcess}`}><span>{isBlockedBtnAfterPrompt ? 'processing...' : 'generate'}</span></button>
            {!isBlockedBtn && <div className={s.btnBG}></div>}
          </div>
        </section>
      </div>
      <section className={s.generatedImagesWrap}>
        <div className={s.generatedImages}>
          {imagesLinks.map(link => {
            return (
              <img className={s.generatedImage} src={link} alt={promptText.current} key={link} />
            )
          })}
        </div>
      </section>
      {modalVisibility && <ModelsOrLorasModal choice="models" changeVisibility={changeVisibility} selectModel={selectModel} />}
      <div className={`${s.badPromptNotification} ${isShowNotification && s.showNotification}`}>Bad prompt. Try again..</div>
    </div>
  );
}