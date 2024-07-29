import { GoUp } from '../components/homeComponents/GoUp';

import Image from 'next/image';
import s from './home.module.css';
import Link from 'next/link';
import Gallery from '../components/homeComponents/Gallery';


export default function Home() {
    return (
        <div className={s.homeWrap}>
            <GoUp />
            <section className={s.fSection}>
                <div className={s.mainDescWrap}>
                    <div className={s.mainDesc}>
                        <h2 className={s.companyName}>Kemuri API</h2>
                        <p className={s.smallDesc}>Unleash the potential of AI with Kemuri API, your portal to a world of seamless text and image generation. Experience the fusion of advanced modeling and intuitive design, where sophisticated AI capabilities become easily accessible. Transform your projects with unrivaled flexibility and power.</p>
                        <div className={s.linksWrap}>
                            <Link target='_blank' className={s.tgLink} href='https://t.me/KemuriAPI'>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="45" height="45" viewBox="0 0 48 48">
                                    <circle cx="24" cy="24" r="21" fill="#74cccf"></circle><path fill="none" stroke="#010101" strokeMiterlimit="10" d="M45.051,24c0,3.826-1.069,7.415-2.857,10.504 c-1.844,3.187-4.305,6.189-7.492,8.033c-3.089,1.787-6.877,2.871-10.702,2.871c-3.826,0-7.567-1.165-10.656-2.952 c-3.187-1.844-5.847-4.677-7.69-7.864C3.867,31.503,3.378,27.826,3.378,24c0-3.826,0.68-7.393,2.467-10.482 c1.844-3.187,4.366-6.038,7.553-7.882C16.487,3.849,20.174,3.188,24,3.188c3.826,0,7.371,0.906,10.46,2.694 c3.187,1.844,5.545,4.627,7.389,7.814C43.636,16.785,45.051,20.174,45.051,24z"></path><path fill="#d6e5e5" d="M17.689,26.814c0.492,1.906,1.089,3.785,1.785,5.626c0.151,0.399,0.366,0.85,0.782,0.946	c0.367,0.084,0.725-0.152,1.02-0.386c0.846-0.672,1.616-1.439,2.292-2.282c1.123,0.936,2.304,1.808,3.427,2.744	c0.437,0.364,0.884,0.734,1.414,0.94c0.53,0.205,1.168,0.22,1.635-0.104c0.321-0.222,0.525-0.574,0.692-0.927	c0.364-0.765,0.633-1.572,0.833-2.395c0.8-3.306,0.851-6.256,2.324-9.936c0.473-1.182,0.572-2.491,0.653-3.76	c0.048-0.748-0.541-1.378-1.289-1.408c-0.89-0.036-1.761,0.193-2.619,0.451c-6.127,1.842-11.582,4.246-17.015,6.668	c-0.505,0.225-1.044,0.413-1.436,0.803c-0.221,0.22-0.397,0.518-0.365,0.828c0.058,0.568,0.716,0.837,1.268,0.98	C14.627,26,16.133,26.517,17.689,26.814z"></path><polygon fill="#bcbcbc" points="20.843,28.309 20.539,33.213 23.569,30.717"></polygon><path fill="none" stroke="#010101" strokeLinejoin="round" strokeMiterlimit="10" d="M20.721,28.01	c1.109,1.117,2.262,2.191,3.455,3.219"></path><polygon fill="#bcbcbc" points="18.264,26.388 29.64,18.955 30.146,19.41 21.197,27.652 20.792,28.916 20.135,33.163 17.758,27.197"></polygon><path fill="none" stroke="#010101" strokeLinejoin="round" strokeMiterlimit="10" d="M17.689,26.814	c0.492,1.906,1.089,3.785,1.785,5.626c0.151,0.399,0.366,0.85,0.782,0.946c0.367,0.084,0.725-0.152,1.02-0.386	c0.846-0.672,1.616-1.439,2.292-2.282c1.123,0.936,2.304,1.808,3.427,2.744c0.437,0.364,0.884,0.734,1.414,0.94	c0.53,0.205,1.168,0.22,1.635-0.104c0.321-0.222,0.525-0.574,0.692-0.927c0.364-0.765,0.633-1.572,0.833-2.395	c0.8-3.306,0.851-6.256,2.324-9.936c0.473-1.182,0.572-2.491,0.653-3.76c0.048-0.748-0.541-1.378-1.289-1.408	c-0.89-0.036-1.761,0.193-2.619,0.451c-6.127,1.842-11.582,4.246-17.015,6.668c-0.505,0.225-1.044,0.413-1.436,0.803	c-0.221,0.22-0.397,0.518-0.365,0.828c0.058,0.568,0.716,0.837,1.268,0.98C14.627,26,16.133,26.517,17.689,26.814z"></path><path fill="none" stroke="#010101" strokeLinejoin="round" strokeMiterlimit="10" d="M17.689,26.814	c3.357-2.222,6.437-4.187,9.794-6.409c0.695-0.46,2.562-1.753,2.87-1.262c0.411,0.654-6.383,5.935-9.624,8.879	c-0.164,1.727-0.287,3.459-0.37,5.192"></path>
                                </svg>
                            </Link>
                            <Link target='_blank' className={s.dsLink} href='https://discord.com/invite/5Qr2NaZw95'>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                                    <path fill="#8a4581" d="M46.21,29.95c-0.98-4.98-1.38-9.94-3.32-14.62c-0.35-0.84-0.76-1.38-1.21-2.17 c-0.26-0.44-0.51-0.89-0.84-1.27c-0.41-0.47-0.91-0.84-1.42-1.19c-1.91-1.33-3.96-2.54-6.22-3.1c-1.03-0.26-2.14-0.37-3.16-0.05 c2.7,2.07,6.16,2.45,8.46,4.95c-8.41-4.34-18.5-4.17-27,0c-0.15,0.09-0.79-0.26-0.66-0.38c0.69-0.65,1.48-1.19,2.26-1.72 c1.6-1.07,3.19-2.15,4.79-3.22c-1.05-0.14-2.09,0.2-3.09,0.53c-2.21,0.74-4.49,1.51-6.27,3.02c-2.22,1.89-3.39,4.63-4.28,7.41 C3.5,20.5,3.29,24.11,2.58,27.1c-0.28,1.19-0.72,2.34-0.96,3.54c-0.23,1.2-0.27,2.49,0.23,3.61c0.71,1.61,2.34,2.57,3.88,3.43 c0.78,0.43,1.55,0.86,2.33,1.29c0.69,0.38,1.38,0.77,2.13,1.04c1.05,0.37,2.18,0.49,3.29,0.36c0.3-0.04,0.62-0.1,0.89-0.25 c0.54-0.28,0.87-0.85,1.17-1.38c0.04-0.08,0.09-0.16,0.08-0.25c-0.01-0.17-0.19-0.27-0.35-0.33c-2.69-1.11-4.91-3.13-6.67-5.44 c1.64,1.65,4.35,3.06,6.58,3.73c2.23,0.67,4.57,0.9,6.89,0.92c6.2,0.08,12.5-1.31,17.79-4.55c0.24-0.15,0.56-0.25,0.59,0.03 c-2.22,2.3-5.03,4.43-7.93,5.79c0.17,0.82,0.78,1.51,1.59,1.74c0.81,0.24,1.68,0.15,2.51,0c2.8-0.5,5.48-1.7,7.72-3.47 c0.62-0.49,1.21-1.03,1.61-1.71C46.84,33.64,46.55,31.71,46.21,29.95z M20.37,27.83c-0.21,0.88-0.69,1.74-1.47,2.23 c-1.17,0.74-2.85,0.44-3.84-0.53c-0.96-0.94-1.31-2.33-1.35-3.66c-0.05-1.54,0.4-3.3,1.8-4.03c0.97-0.5,2.23-0.35,3.13,0.27 c0.9,0.63,1.56,1.81,1.72,2.88C20.49,25.87,20.57,26.94,20.37,27.83z M33.33,28.53c-0.31,0.44-0.68,0.86-1.15,1.15 c-0.9,0.53-2.11,0.49-3.01-0.04c-1.3-0.76-1.86-2.4-1.59-3.85c0.26-1.45,0.99-2.66,2.16-3.6c0.67-0.54,1.39-0.79,2.24-0.58 c0.29,0.07,0.55,0.21,0.8,0.37c1.04,0.69,1.62,1.91,1.67,3.12C34.49,26.32,34.03,27.52,33.33,28.53z"></path><path fill="#010101" d="M35.221,41.028c-0.413,0-0.835-0.046-1.252-0.166c-0.983-0.285-1.727-1.1-1.938-2.126 c-0.046-0.227,0.068-0.455,0.278-0.554c1.955-0.914,3.954-2.234,5.801-3.815c-4.675,2.37-10.172,3.574-16.044,3.507 c-2.719-0.033-5.019-0.343-7.033-0.948c-0.894-0.268-1.801-0.626-2.668-1.046c0.988,0.767,2.021,1.373,3.091,1.814 c0.158,0.065,0.635,0.263,0.666,0.767c0.014,0.241-0.089,0.423-0.145,0.521c-0.286,0.513-0.68,1.218-1.374,1.582 c-0.364,0.191-0.762,0.26-1.066,0.297c-1.178,0.146-2.395,0.015-3.518-0.385c-0.788-0.279-1.509-0.682-2.206-1.07l-2.325-1.292 c-1.39-0.773-3.293-1.832-4.1-3.663c-0.473-1.069-0.558-2.383-0.254-3.905c0.14-0.699,0.342-1.383,0.538-2.044 c0.149-0.503,0.3-1.007,0.421-1.517c0.315-1.322,0.532-2.782,0.742-4.194c0.265-1.782,0.515-3.466,0.942-4.806 c0.837-2.621,2.018-5.579,4.432-7.633c1.879-1.6,4.3-2.406,6.437-3.118c0.999-0.332,2.132-0.705,3.307-0.553 c0.206,0.027,0.374,0.18,0.421,0.382c0.048,0.202-0.034,0.413-0.207,0.528l-4.783,3.227c-0.375,0.253-0.752,0.508-1.116,0.774 c6.776-3.034,14.28-3.578,21.098-1.651c-1.23-0.543-2.489-1.121-3.626-1.99c-0.147-0.113-0.221-0.299-0.189-0.482 c0.032-0.184,0.163-0.334,0.34-0.391c0.964-0.311,2.086-0.297,3.431,0.036c2.522,0.626,4.739,2.025,6.388,3.175 c0.521,0.363,1.065,0.76,1.507,1.272c0.364,0.422,0.634,0.893,0.895,1.348c0.138,0.239,0.271,0.455,0.399,0.664 c0.301,0.486,0.585,0.945,0.841,1.563c1.452,3.499,2.064,7.204,2.656,10.787c0.216,1.306,0.433,2.617,0.689,3.931 c0.374,1.906,0.658,3.909-0.314,5.591c-0.459,0.794-1.135,1.386-1.735,1.859c-2.307,1.818-5.052,3.053-7.939,3.569 C36.246,40.956,35.74,41.028,35.221,41.028z M33.127,38.899c0.211,0.481,0.623,0.858,1.12,1.002 c0.745,0.216,1.572,0.115,2.283-0.012c2.726-0.488,5.318-1.653,7.496-3.37c0.526-0.415,1.114-0.927,1.489-1.574 c0.799-1.383,0.536-3.178,0.199-4.898c-0.26-1.323-0.478-2.645-0.695-3.96c-0.609-3.689-1.186-7.175-2.594-10.567 c-0.226-0.543-0.477-0.95-0.768-1.421c-0.134-0.218-0.272-0.442-0.416-0.691c-0.249-0.434-0.483-0.844-0.785-1.193 c-0.365-0.424-0.834-0.765-1.321-1.104c-1.578-1.1-3.692-2.438-6.056-3.024c-0.62-0.153-1.178-0.23-1.682-0.23 c-0.002,0-0.005,0-0.007,0c0.849,0.5,1.754,0.897,2.638,1.287c1.705,0.75,3.468,1.525,4.839,3.021 c0.164,0.179,0.176,0.449,0.029,0.642c-0.147,0.192-0.411,0.253-0.627,0.141c-8.097-4.177-18.022-4.176-26.551,0.005 c-0.388,0.247-1.08-0.185-1.266-0.423c-0.218-0.279-0.145-0.601,0.04-0.773c0.715-0.672,1.527-1.222,2.313-1.752l3.16-2.131 c-0.345,0.094-0.683,0.206-1.005,0.313c-2.05,0.683-4.374,1.456-6.104,2.931c-2.223,1.891-3.333,4.688-4.127,7.176 c-0.403,1.262-0.647,2.906-0.906,4.647c-0.213,1.434-0.434,2.915-0.759,4.279c-0.126,0.528-0.28,1.049-0.435,1.57 c-0.189,0.639-0.386,1.3-0.517,1.954c-0.263,1.316-0.199,2.429,0.188,3.306c0.622,1.41,2.031,2.28,3.672,3.193L8.3,38.532 c0.662,0.369,1.346,0.751,2.055,1.003c0.978,0.347,2.036,0.463,3.059,0.334c0.236-0.029,0.506-0.074,0.726-0.189 c0.37-0.194,0.634-0.598,0.903-1.074c-2.511-1.042-4.813-2.919-6.84-5.58c-0.16-0.209-0.13-0.507,0.069-0.68 c0.196-0.173,0.495-0.163,0.683,0.024c1.653,1.663,4.389,3.006,6.366,3.599c1.924,0.577,4.135,0.873,6.758,0.905 c0.16,0.002,0.32,0.003,0.479,0.003c6.365,0,12.246-1.546,17.037-4.483c0.261-0.161,0.642-0.318,0.982-0.15 c0.21,0.104,0.346,0.307,0.372,0.558c0.016,0.147-0.035,0.295-0.139,0.401C38.503,35.576,35.79,37.587,33.127,38.899z"></path><path fill="#010101" d="M17.392,30.977c-0.962,0-1.949-0.374-2.678-1.084c-0.929-0.903-1.447-2.29-1.502-4.008 c-0.064-2.102,0.708-3.778,2.067-4.485c1.099-0.573,2.566-0.451,3.649,0.304c0.966,0.676,1.738,1.967,1.923,3.213 c0.187,1.246,0.188,2.236,0.001,3.025c-0.266,1.125-0.864,2.028-1.687,2.544C18.639,30.815,18.021,30.976,17.392,30.977z M16.809,22.036c-0.377,0-0.746,0.082-1.067,0.25c-1.498,0.778-1.55,2.928-1.529,3.567c0.032,1.014,0.266,2.413,1.199,3.322 c0.869,0.848,2.286,1.051,3.224,0.462c0.807-0.506,1.126-1.424,1.245-1.926c0.153-0.654,0.148-1.546-0.017-2.648v-0.001 c-0.146-0.976-0.765-2.021-1.508-2.539C17.896,22.202,17.344,22.036,16.809,22.036z"></path><path fill="#010101" d="M30.729,30.558c-0.627,0-1.262-0.162-1.81-0.485c-1.396-0.821-2.151-2.618-1.836-4.37 c0.282-1.566,1.069-2.878,2.341-3.899l0,0c0.857-0.689,1.735-0.907,2.674-0.676c0.321,0.079,0.645,0.226,0.959,0.436 c1.114,0.737,1.84,2.088,1.891,3.523c0.056,1.573-0.627,2.896-1.208,3.727c-0.419,0.599-0.834,1.009-1.307,1.292 C31.93,30.406,31.333,30.558,30.729,30.558z M31.396,22.039c-0.455,0-0.892,0.178-1.345,0.543l0,0 c-1.078,0.866-1.745,1.976-1.983,3.298c-0.243,1.348,0.316,2.717,1.359,3.331c0.77,0.454,1.771,0.469,2.492,0.036 c0.348-0.209,0.666-0.528,1-1.007c0.699-0.999,1.064-2.106,1.028-3.119c-0.039-1.118-0.593-2.162-1.443-2.726 c-0.22-0.146-0.437-0.246-0.646-0.298C31.7,22.059,31.547,22.039,31.396,22.039z"></path>
                                </svg>
                            </Link>
                        </div>
                        <button className={s.learnMore}>
                            Learn more
                        </button>
                    </div>
                    <Image className={s.kemuriGif} src='/kemuri.gif' width={400} height={400} alt='kemuri' />
                </div>
            </section>
            <section className={s.sSection}>
                <h1 className={s.sText}>About Kemuri</h1>
                <div className={s.containerWrap}>
                    <div className={s.sContainer}>
                        <Image className={s.gifInC} src='/about/1.jpeg' width={250} height={250} alt='' />
                        <p className={s.containerText}>Kemuri API is a service that provides text generation capabilities using modern language models. It is suitable for creating a variety of content and automating text tasks.</p>
                    </div>
                    <div className={s.sContainer}>
                        <Image className={s.gifInC} src='/about/2.png' width={250} height={250} alt='' />
                        <p className={s.containerText}>Kemuri API also provides services for generating images using Midjourney, DALL-E 3, Stable Diffusion and SDXL technologies. This allows you to create unique visual materials for various purposes such as marketing, design and creativity.</p>
                    </div>
                    <div className={s.sContainer}>
                        <Image className={s.gifInC} src='/about/3.jpeg' width={250} height={250} alt='' />
                        <p className={s.containerText}>Kemuri API includes bots for Discord and Telegram, giving users easy access to text and image generation capabilities. These bots make it easy to create content and visuals directly from messengers.</p>
                    </div>
                </div>
            </section>
            <section className={s.sliderSection}>
                <h1 className={s.galleryText}>Gallery</h1>
                <Gallery/>
            </section>

        </div>
    )
}