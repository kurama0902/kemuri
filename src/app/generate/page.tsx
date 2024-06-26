"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

import { ModelsOrLorasModal } from "../components/modelsOrLorasModal";
import { AdditionalSettings } from "../components/AdditionalSettings";
import { GeneratingPreloader } from "../components/GeneratingPreloader";
import { ModalContext } from "../../../context/ModalContext";

import s from "./generate.module.css";
import { RatioType } from "../../../types/types";

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
  const [showGeneratingPreloader, setShowGeneratingPreloader] = useState<boolean>(true);
  const [imagesLinks, setImagesLinks] = useState<string[]>([]);
  const [isBlockedBtn, setIsBlockedBtn] = useState<boolean>(false);
  const [isBlockedBtnAfterPrompt, setIsBlockedBtnAfterPrompt] = useState<boolean>(false);
  const [charactersCount, setCharactersCount] = useState<number>(0);
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

    if(category !== selectedModel.category) {
      setSelectedLoras({loras: [], version: category});
    }

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

  const generateImage = async () => {

    if (promptText.current.length > 0 && selectedModel.modelName !== 'select model') {

      const loras: { [key: string]: number }[] = [];

      for (let lora in loraWeights) {
        loras.push({ [lora]: loraWeights[lora] })
      }

      try {
        setIsBlockedBtnAfterPrompt(true)
        const response = await fetch(`https://api.kemuri.top/v1/${selectedModel.category === 'general' ? 'images/generations' : selectedModel.category === 'sd' ? 'gen-sd' : 'gen-sdxl'}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: selectedModel.category === 'general' ? JSON.stringify({
            "prompt": promptText.current,
            "model": selectedModel.modelName
          }) :
            JSON.stringify({
              "prompt": promptText.current,
              "negative_prompts": [
                "bad anatomy, easynegative"
              ],
              "model_shorthand": selectedModel.modelName,
              "lora_shorthands": loras.length > 0 ? loras : Object.values(selectedLoras.loras).map(el => {
                return { [el]: 0.8 }
              }),
              "sampler": samplingMethod,
              "width": ratio.width,
              "height": ratio.height,
              "steps": sampling,
              "count": 4,
              "upscale_factor": upscaleFactor,
              "sdVae": vae,
              "clip_skip": 2,
              "cfg_scale": CFG,
              "hr_upscaler": upscaleMethod,
              "hr_second_pass_steps": 10,
              "denoising_strength": 1
            })
        })

        const data = await response.json();
        const { urls } = data;
        console.log(urls);
        setImagesLinks(urls)
        setIsBlockedBtnAfterPrompt(false)
      } catch (error) {
        setIsShowNotification(true)
        setTimeout(() => {
          setIsShowNotification(false);
          setIsBlockedBtnAfterPrompt(false);
        }, 1500)
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setShowGeneratingPreloader(false);
    }, 1500);
  }, [])

  return (
    <ModalContext.Provider value={{ visibility: modalVisibility, changeVisibility: changeVisibility, selectedModel: selectedModel, selectModel: selectModel, selectedLoras, selectLoras }}>
      <div className={s.mainPage}>
        {showGeneratingPreloader && <GeneratingPreloader />}
        <div className={s.settingSectionWrap}>
          <section className={s.settingSection}>
            <div className={`${s.btnWrap} ${modalVisibility && s.mobBtnWrap}`}>
              <button onClick={() => changeVisibility({ modalName: 'models', isShow: true })} className={s.selectBtn}>
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
              (selectedModel.category !== 'general' && selectedModel.modelName !== 'select model') && <AdditionalSettings vae={vae} handleSetVae={handleSetVae} samplingMethod={samplingMethod} handleSetSamplingMethod={handleSetSamplingMethod} upscaleMethod={upscaleMethod} handleSetUpscaleMethod={handleSetUpscaleMethod} selectedLoras={selectedLoras} selectLoras={selectLoras} loraWeights={loraWeights} handleSetLoraWeights={handleSetLoraWeights} ratio={ratio} setRatio={setRatio} sampling={sampling} setSampling={setSampling} upscaleFactor={upscaleFactor} setUpscaleFactor={setUpscaleFactor} CFG={CFG} setCFG={setCFG} />
            }
            <div className={`${s.btnWrap} ${s.generateBtnWrap} ${isBlockedBtn && s.disabled} ${isBlockedBtnAfterPrompt && s.disabled}`}>
              <button onClick={generateImage} className={`${s.generateBtn} ${isBlockedBtn && s.blockedBtn} ${isBlockedBtnAfterPrompt && s.generatingProcess}`}><span>{isBlockedBtnAfterPrompt ? 'generating...' : 'generate'}</span></button>
              {!isBlockedBtn && <div className={s.btnBG}></div>}
            </div>
          </section>
        </div>
        <section className={s.generatedImagesSection}>
          <div className={s.generatedImagesWrap}>
            <div className={s.generatedImages}>
              {imagesLinks.map(link => {
                return (
                  <img className={s.generatedImage} src={link} alt={promptText.current} key={link} />
                )
              })}
            </div>
          </div>
        </section>
        <ModelsOrLorasModal choice="models" />
        <div className={`${s.badPromptNotification} ${isShowNotification && s.showNotification}`}>Bad prompt. Try again..</div>
      </div>
    </ModalContext.Provider>
  );
}
