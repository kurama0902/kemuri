"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

import { createPortal } from "react-dom";
import { DownloadImageModal } from "../components/DownloadImageModal";
import { ModelsOrLorasModal } from "../components/modelsOrLorasModal";
import { AdditionalSettings } from "../components/AdditionalSettings";
import { GeneratingPreloader } from "../components/GeneratingPreloader";
import { ModalContext } from "../../../context/ModalContext";
import { RatioType } from "../../../types/types";


import { changePromptText } from "../../../utils/generateFunctions/changePromptText";
import { generateImage } from "../../../utils/generateFunctions/generateImage";
import { getRandomPrompt } from "../../../utils/generateFunctions/getRandomPrompt";

import s from "./generate.module.css";
import Image from "next/image";


export default function Generate() {

  const [modalVisibility, setModalVisibility] = useState<{ modalName: string, isShow: boolean } | null>(null);
  const [selectedModel, setSelectedModel] = useState<{
    modelName: string,
    category: string
  }>({
    modelName: 'select model',
    category: ''
  });
  const [selectedLoras, setSelectedLoras] = useState<{
    loras: string[],
    version: string
  }>({
    loras: [],
    version: ''
  })

  const promptText = useRef('');
  const negativePromptText = useRef('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [showGeneratingPreloader, setShowGeneratingPreloader] = useState<boolean>(true);
  const [imagesLinks, setImagesLinks] = useState<string[]>([]);
  const [isBlockedBtn, setIsBlockedBtn] = useState<boolean>(false);
  const [isBlockedBtnAfterPrompt, setIsBlockedBtnAfterPrompt] = useState<boolean>(false);
  const [charactersCount, setCharactersCount] = useState<number>(0);
  const [negativeCharacters, setNegativeCharacters] = useState<number>(0);
  const [isShowNotification, setIsShowNotification] = useState<boolean>(false);
  const [vae, setVae] = useState<string>('Automatic');
  const [samplingMethod, setSamplingMethod] = useState<string>('Euler a');
  const [upscaleMethod, setUpscaleMethod] = useState<string>('4x-UltraSharp');
  const [loraWeights, setLoraWeights] = useState<{ [key: string]: number }>({});
  const [ratio, setRatio] = useState<RatioType>({
    width: 768,
    height: 1152,
    aspectRatio: 'portrait'
  });
  const [sampling, setSampling] = useState<number>(25);
  const [upscaleFactor, setUpscaleFactor] = useState<number>(1.5);
  const [CFG, setCFG] = useState<number>(7);
  const [selectedLink, setSelectedLink] = useState<string | null>(null);


  const handleSetSelectedLink = (link: string | null) => {
    setSelectedLink(link)
  }

  const handleSetLoraWeights = (e: ChangeEvent<HTMLInputElement>, loraName: string) => {
    if (e.target.value.includes('e')) e.target.value = '';
    setLoraWeights({
      ...loraWeights,
      [loraName]: Number(e.target.value)
    })
  }

  const handleSetVae = (vae: string) => {
    setVae(vae);
  }

  const handleSetUpscaleMethod = (method: string) => {
    setUpscaleMethod(method)
  }

  const handleSetSamplingMethod = (method: string) => {
    setSamplingMethod(method)
  }

  const changeVisibility = (state: { modalName: string, isShow: boolean } | null) => {
    setModalVisibility(state);
  }

  const selectModel = ({ modelName, category }: { modelName: string, category: string }) => {


    if (category !== selectedModel.category) {
      setLoraWeights({});
      setSelectedLoras({ loras: [], version: category });
    }


    if (selectedModel.modelName !== 'select model' && modelName === selectedModel.modelName) {
      setSelectedModel({ modelName: 'select model', category: '' })
    } else {
      setSelectedModel({ modelName, category })
    }

    if (category === 'general' && promptText.current.length > 150) {
      if (isBlockedBtn === false) {
        setIsBlockedBtn((prev) => {
          return !prev
        })
      }
    }

    if (category !== 'general') {
      if (isBlockedBtn === true) {
        setIsBlockedBtn((prev) => {
          return !prev
        })
      }
    }
  }

  const selectLoras = ({ lora, version }: { lora: string, version: string }) => {

    if (selectedLoras.version !== version) {
      setSelectedLoras({ loras: [lora], version });
      return;
    }
    if (selectedLoras.loras?.includes(lora)) {
      const newLoras = selectedLoras.loras.filter(el => el !== lora);
      delete loraWeights[lora];

      setSelectedLoras({
        loras: newLoras,
        version: version
      });
    } else {
      const newLoras = [...selectedLoras.loras, lora]
      setSelectedLoras({
        loras: newLoras,
        version: version
      })
      setLoraWeights({
        ...loraWeights,
        [lora]: 0.8
      })
    }
  }


  useEffect(() => {
    setTimeout(() => {
      setShowGeneratingPreloader(false);
    }, 1000);
  }, [])

  return (
    <ModalContext.Provider value={{
      visibility: modalVisibility,
      changeVisibility,
      selectedModel,
      selectModel,
      selectedLoras,
      selectLoras,
      ratio,
      setRatio,
      vae,
      handleSetVae,
      samplingMethod,
      handleSetSamplingMethod,
      upscaleMethod,
      handleSetUpscaleMethod,
      sampling,
      setSampling,
      CFG,
      setCFG,
      upscaleFactor,
      setUpscaleFactor,
      loraWeights,
      handleSetLoraWeights,
    }}>
      <div id="main" className={s.mainPage}>
        {showGeneratingPreloader && <GeneratingPreloader />}
        <div className={s.settingSectionWrap}>
          <section className={s.settingSection}>
            {/* <div className={`${s.btnWrap} ${modalVisibility && s.mobBtnWrap}`}> */}
            <button onClick={() => changeVisibility({ modalName: 'models', isShow: true })} className={s.selectBtn}>
              <span>
                {selectedModel.modelName}
              </span>
            </button>
            {/* <div className={s.btnBG}></div> */}
            {/* </div> */}
            <div className={s.promptAreaWrap}>
              <textarea ref={textAreaRef} placeholder="Enter your promt.." onChange={(e) => changePromptText(e, 'regular', selectedModel, promptText, negativePromptText, setCharactersCount, setNegativeCharacters, isBlockedBtn, setIsBlockedBtn)} className={`${s.promptArea} ${isBlockedBtn && s.invalidText}`} maxLength={450} ></textarea>
              <div className={s.charactersAndRand}>
                {
                  (selectedModel.category !== 'general' && selectedModel.modelName !== 'select model')
                  &&
                  <button onClick={
                    () => getRandomPrompt(
                      selectedModel.category,
                      selectedModel,
                      promptText,
                      textAreaRef,
                      setCharactersCount
                    )
                  } className={s.randBtn}>
                    <Image src='/random.svg' width={20} height={20} alt="random icon" />
                  </button>
                }
                <span className={s.characters}>{charactersCount}/{selectedModel.category === 'general' ? '150' : '450'}</span>
              </div>
            </div>
            {
              (selectedModel.category !== 'general' && selectedModel.category !== '') && <div className={s.promptAreaWrap}>
                <textarea placeholder="Enter your negative prompt.." onChange={(e) => changePromptText(e, 'negative', selectedModel, promptText, negativePromptText, setCharactersCount, setNegativeCharacters, isBlockedBtn, setIsBlockedBtn)} className={`${s.promptArea} ${isBlockedBtn && s.invalidText}`} maxLength={450} ></textarea>
                <span className={s.negativeCharacters}>{negativeCharacters}/{selectedModel.category === 'general' ? '150' : '450'}</span>
              </div>
            }
            {
              (selectedModel.category !== 'general' && selectedModel.modelName !== 'select model') && <AdditionalSettings />
            }
            <div className={`${s.btnWrap} ${s.generateBtnWrap} ${((ratio.width < 512 || ratio.width > 2048) || (ratio.height < 512 || ratio.height > 2048) || (sampling < 20 || sampling > 70) || (CFG < 1 || CFG > 10) || (upscaleFactor < 1 || upscaleFactor > 2)) && s.disabled} ${isBlockedBtnAfterPrompt && s.disabled}`}>
              <button onClick={() => generateImage({
                promptText,
                negativePromptText,
                selectedModel,
                selectedLoras,
                loraWeights,
                samplingMethod,
                ratio,
                sampling,
                upscaleFactor,
                vae,
                CFG,
                upscaleMethod,
                setIsBlockedBtnAfterPrompt,
                setSelectedLink,
                setImagesLinks,
                setIsShowNotification
              })} className={`${s.generateBtn} ${isBlockedBtn && s.blockedBtn} ${((ratio.width < 512 || ratio.width > 2048) || (ratio.height < 512 || ratio.height > 2048) || (sampling < 20 || sampling > 70) || (CFG < 1 || CFG > 10) || (upscaleFactor < 1 || upscaleFactor > 2)) && s.blockedBtn} ${isBlockedBtnAfterPrompt && s.generatingProcess}`}>
                <span>{isBlockedBtnAfterPrompt ? 'generating...' : 'generate'}</span>
                {isBlockedBtnAfterPrompt && <Image className={s.genLoading} src='/generating.svg' width={50} height={50} alt="loading" />}
              </button>
              {/* {(!isBlockedBtn || ((ratio.width < 512 || ratio.width > 2048) || (ratio.height < 512 || ratio.height > 2048) || (sampling < 20 || sampling > 70) || (CFG < 1 || CFG > 10) || (upscaleFactor < 1 || upscaleFactor > 2))) && <div className={s.btnBG}></div>} */}
            </div>
          </section>
        </div>
        <section className={s.generatedImagesSection}>
          {
            isBlockedBtnAfterPrompt &&
            <div className={s.loadingRightSide}>
              <Image src='/generatingLoading2.svg' width={200} height={200} alt="loading" />
            </div>
          }
          {
            imagesLinks?.length > 0 ? <div className={s.generatedImagesWrap}>
              <div className={s.generatedImages}>
                {imagesLinks.map((link, index) => {

                  return (
                    <div key={link} className={s.genImageBtnWrap}>
                      <button onClick={() => handleSetSelectedLink(link)} className={s.genImageBtn}>
                        <img className={s.generatedImage} src={link} alt={promptText.current} />
                        {
                          selectedLink === link &&
                          createPortal(
                            <DownloadImageModal promptText={promptText.current} linkList={imagesLinks} inSlide={index} mw={ratio.width} mn={ratio.height} selectLink={handleSetSelectedLink} />,
                            document.getElementById('main') || document.createElement('div'))
                        }
                      </button>
                      <button onClick={() => handleSetSelectedLink(link)} className={s.showText}>Show</button>
                    </div>
                  )
                })}
              </div>
            </div>
              :
              !isBlockedBtnAfterPrompt && <h1 className={s.waitingText}>Waiting for the generation..</h1>
          }
        </section>
        <ModelsOrLorasModal choice="models" />
        <div className={`${s.badPromptNotification} ${isShowNotification && s.showNotification}`}>Bad prompt. Try again..</div>
      </div>
    </ModalContext.Provider>
  );
}
