import { Generate, } from "../../types/types";

export const generateImage = async ({
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
}: Generate) => {

  const loraWeightValues = Object.values(loraWeights);
  const isNotValidLoraWeightValues = loraWeightValues.find((el) => el < 0.1 || el > 1);

  if (
    (promptText.current.length > 0 && promptText.current.length <= (selectedModel.category === 'general' ? 150 : 450) && negativePromptText.current.length <= (selectedModel.category === 'general' ? 150 : 450) && selectedModel.modelName !== 'select model')
    &&
    ((ratio.width >= 512 && ratio.width <= 1024) && (ratio.height >= 512 && ratio.height <= 1024) && (sampling >= 20 && sampling <= 70) && (CFG >= 1 && CFG <= 10) && (upscaleFactor >= 1 && upscaleFactor <= 2) && (isNotValidLoraWeightValues === undefined))
  ) {

    const loras: { [key: string]: number }[] = [];

    for (let lora in loraWeights) {
      loras.push({ [lora]: loraWeights[lora] })
    }

    try {
      setImagesLinks([]);
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
              negativePromptText.current
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
      setSelectedLink(null);
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