"use server";
import { AssemblyAI } from 'assemblyai';

const client = new AssemblyAI({
    apiKey: process.env.ASSEMBLY_API_KEY!,
  });

//   const captionsArray =
//   [
//     {
//         "text": "The",
//         "start": 160,
//         "end": 272,
//         "confidence": 0.99536,
//         "speaker": null
//     },
//     {
//         "text": "wind",
//         "start": 272,
//         "end": 456,
//         "confidence": 0.99999,
//         "speaker": null
//     },
//     {
//         "text": "whipped",
//         "start": 480,
//         "end": 728,
//         "confidence": 0.99942,
//         "speaker": null
//     },
//     {
//         "text": "at",
//         "start": 744,
//         "end": 824,
//         "confidence": 0.99901,
//         "speaker": null
//     },
//     {
//         "text": "Elara's",
//         "start": 832,
//         "end": 1496,
//         "confidence": 0.82462,
//         "speaker": null
//     },
//     {
//         "text": "cloak,",
//         "start": 1528,
//         "end": 1960,
//         "confidence": 0.99946,
//         "speaker": null
//     },
//     {
//         "text": "carrying",
//         "start": 2040,
//         "end": 2456,
//         "confidence": 0.99999,
//         "speaker": null
//     },
//     {
//         "text": "the",
//         "start": 2488,
//         "end": 2584,
//         "confidence": 0.99999,
//         "speaker": null
//     },
//     {
//         "text": "scent",
//         "start": 2592,
//         "end": 2856,
//         "confidence": 0.99368,
//         "speaker": null
//     },
//     {
//         "text": "of",
//         "start": 2888,
//         "end": 3032,
//         "confidence": 0.99999,
//         "speaker": null
//     },
//     {
//         "text": "pine",
//         "start": 3056,
//         "end": 3336,
//         "confidence": 0.56201,
//         "speaker": null
//     },
//     {
//         "text": "and",
//         "start": 3368,
//         "end": 3560,
//         "confidence": 0.98677,
//         "speaker": null
//     },
//     {
//         "text": "magic.",
//         "start": 3600,
//         "end": 4380,
//         "confidence": 0.99973,
//         "speaker": null
//     },
//     {
//         "text": "Below,",
//         "start": 4720,
//         "end": 5272,
//         "confidence": 0.99998,
//         "speaker": null
//     },
//     {
//         "text": "the",
//         "start": 5376,
//         "end": 5592,
//         "confidence": 0.99999,
//         "speaker": null
//     },
//     {
//         "text": "Whispering",
//         "start": 5616,
//         "end": 6136,
//         "confidence": 0.95236,
//         "speaker": null
//     },
//     {
//         "text": "woods",
//         "start": 6168,
//         "end": 6504,
//         "confidence": 0.99909,
//         "speaker": null
//     },
//     {
//         "text": "stretched",
//         "start": 6552,
//         "end": 6888,
//         "confidence": 0.96248,
//         "speaker": null
//     },
//     {
//         "text": "out",
//         "start": 6904,
//         "end": 7080,
//         "confidence": 0.66533,
//         "speaker": null
//     },
//     {
//         "text": "like",
//         "start": 7120,
//         "end": 7272,
//         "confidence": 0.99997,
//         "speaker": null
//     },
//     {
//         "text": "a",
//         "start": 7296,
//         "end": 7432,
//         "confidence": 0.99999,
//         "speaker": null
//     },
//     {
//         "text": "tapestry",
//         "start": 7456,
//         "end": 7976,
//         "confidence": 0.99999,
//         "speaker": null
//     },
//     {
//         "text": "of",
//         "start": 8008,
//         "end": 8152,
//         "confidence": 1,
//         "speaker": null
//     },
//     {
//         "text": "emerald",
//         "start": 8176,
//         "end": 8536,
//         "confidence": 0.60978,
//         "speaker": null
//     },
//     {
//         "text": "and",
//         "start": 8568,
//         "end": 8760,
//         "confidence": 0.9989,
//         "speaker": null
//     },
//     {
//         "text": "gold,",
//         "start": 8800,
//         "end": 9240,
//         "confidence": 0.99979,
//         "speaker": null
//     },
//     {
//         "text": "a",
//         "start": 9360,
//         "end": 9592,
//         "confidence": 0.9924,
//         "speaker": null
//     },
//     {
//         "text": "place",
//         "start": 9616,
//         "end": 9800,
//         "confidence": 0.99999,
//         "speaker": null
//     },
//     {
//         "text": "of",
//         "start": 9840,
//         "end": 9992,
//         "confidence": 1,
//         "speaker": null
//     },
//     {
//         "text": "ancient",
//         "start": 10016,
//         "end": 10472,
//         "confidence": 0.99682,
//         "speaker": null
//     },
//     {
//         "text": "secrets",
//         "start": 10536,
//         "end": 10888,
//         "confidence": 0.99999,
//         "speaker": null
//     },
//     {
//         "text": "and",
//         "start": 10904,
//         "end": 11080,
//         "confidence": 0.99933,
//         "speaker": null
//     },
//     {
//         "text": "whispered",
//         "start": 11120,
//         "end": 11656,
//         "confidence": 0.99356,
//         "speaker": null
//     },
//     {
//         "text": "dangers.",
//         "start": 11688,
//         "end": 12616,
//         "confidence": 0.99993,
//         "speaker": null
//     },
//     {
//         "text": "She",
//         "start": 12808,
//         "end": 13112,
//         "confidence": 0.99999,
//         "speaker": null
//     },
//     {
//         "text": "opened",
//         "start": 13136,
//         "end": 13448,
//         "confidence": 1,
//         "speaker": null
//     },
//     {
//         "text": "her",
//         "start": 13464,
//         "end": 13640,
//         "confidence": 0.99999,
//         "speaker": null
//     },
//     {
//         "text": "journal,",
//         "start": 13680,
//         "end": 14072,
//         "confidence": 0.99999,
//         "speaker": null
//     },
//     {
//         "text": "its",
//         "start": 14176,
//         "end": 14440,
//         "confidence": 0.99682,
//         "speaker": null
//     },
//     {
//         "text": "pages",
//         "start": 14480,
//         "end": 14840,
//         "confidence": 0.93626,
//         "speaker": null
//     },
//     {
//         "text": "filled",
//         "start": 14920,
//         "end": 15176,
//         "confidence": 0.99953,
//         "speaker": null
//     },
//     {
//         "text": "with",
//         "start": 15208,
//         "end": 15352,
//         "confidence": 0.99999,
//         "speaker": null
//     },
//     {
//         "text": "the",
//         "start": 15376,
//         "end": 15512,
//         "confidence": 0.99992,
//         "speaker": null
//     },
//     {
//         "text": "scribbles",
//         "start": 15536,
//         "end": 15976,
//         "confidence": 0.99982,
//         "speaker": null
//     },
//     {
//         "text": "of",
//         "start": 16008,
//         "end": 16152,
//         "confidence": 0.99998,
//         "speaker": null
//     },
//     {
//         "text": "her",
//         "start": 16176,
//         "end": 16312,
//         "confidence": 0.99997,
//         "speaker": null
//     },
//     {
//         "text": "travels.",
//         "start": 16336,
//         "end": 17176,
//         "confidence": 0.99993,
//         "speaker": null
//     },
//     {
//         "text": "The",
//         "start": 17368,
//         "end": 17672,
//         "confidence": 0.99997,
//         "speaker": null
//     },
//     {
//         "text": "map",
//         "start": 17696,
//         "end": 17944,
//         "confidence": 0.49019,
//         "speaker": null
//     },
//     {
//         "text": "she'd",
//         "start": 17992,
//         "end": 18296,
//         "confidence": 0.99816,
//         "speaker": null
//     },
//     {
//         "text": "been",
//         "start": 18328,
//         "end": 18424,
//         "confidence": 1,
//         "speaker": null
//     },
//     {
//         "text": "given",
//         "start": 18432,
//         "end": 18696,
//         "confidence": 0.99994,
//         "speaker": null
//     },
//     {
//         "text": "pointed",
//         "start": 18768,
//         "end": 19096,
//         "confidence": 0.99997,
//         "speaker": null
//     },
//     {
//         "text": "to",
//         "start": 19128,
//         "end": 19272,
//         "confidence": 0.99998,
//         "speaker": null
//     },
//     {
//         "text": "a",
//         "start": 19296,
//         "end": 19384,
//         "confidence": 0.99998,
//         "speaker": null
//     },
//     {
//         "text": "hidden",
//         "start": 19392,
//         "end": 19704,
//         "confidence": 0.99997,
//         "speaker": null
//     },
//     {
//         "text": "temple",
//         "start": 19752,
//         "end": 20008,
//         "confidence": 0.99991,
//         "speaker": null
//     },
//     {
//         "text": "within",
//         "start": 20024,
//         "end": 20248,
//         "confidence": 0.75484,
//         "speaker": null
//     },
//     {
//         "text": "the",
//         "start": 20304,
//         "end": 20472,
//         "confidence": 0.99997,
//         "speaker": null
//     },
//     {
//         "text": "woods,",
//         "start": 20496,
//         "end": 21048,
//         "confidence": 0.99966,
//         "speaker": null
//     },
//     {
//         "text": "rumored",
//         "start": 21144,
//         "end": 21576,
//         "confidence": 0.99711,
//         "speaker": null
//     },
//     {
//         "text": "to",
//         "start": 21608,
//         "end": 21752,
//         "confidence": 0.99999,
//         "speaker": null
//     },
//     {
//         "text": "hold",
//         "start": 21776,
//         "end": 21912,
//         "confidence": 1,
//         "speaker": null
//     },
//     {
//         "text": "the",
//         "start": 21936,
//         "end": 22024,
//         "confidence": 0.99997,
//         "speaker": null
//     },
//     {
//         "text": "key",
//         "start": 22032,
//         "end": 22248,
//         "confidence": 0.85964,
//         "speaker": null
//     },
//     {
//         "text": "to",
//         "start": 22304,
//         "end": 22472,
//         "confidence": 0.99999,
//         "speaker": null
//     },
//     {
//         "text": "a",
//         "start": 22496,
//         "end": 22584,
//         "confidence": 0.99996,
//         "speaker": null
//     },
//     {
//         "text": "lost",
//         "start": 22592,
//         "end": 22904,
//         "confidence": 0.99998,
//         "speaker": null
//     },
//     {
//         "text": "power.",
//         "start": 22992,
//         "end": 23620,
//         "confidence": 0.99989,
//         "speaker": null
//     },
//     {
//         "text": "With",
//         "start": 23920,
//         "end": 24232,
//         "confidence": 0.99993,
//         "speaker": null
//     },
//     {
//         "text": "a",
//         "start": 24256,
//         "end": 24392,
//         "confidence": 0.99999,
//         "speaker": null
//     },
//     {
//         "text": "deep",
//         "start": 24416,
//         "end": 24664,
//         "confidence": 0.99999,
//         "speaker": null
//     },
//     {
//         "text": "breath,",
//         "start": 24712,
//         "end": 25080,
//         "confidence": 0.99998,
//         "speaker": null
//     },
//     {
//         "text": "Elara",
//         "start": 25160,
//         "end": 25944,
//         "confidence": 0.83402,
//         "speaker": null
//     },
//     {
//         "text": "stepped",
//         "start": 25992,
//         "end": 26248,
//         "confidence": 0.99998,
//         "speaker": null
//     },
//     {
//         "text": "into",
//         "start": 26264,
//         "end": 26440,
//         "confidence": 0.69268,
//         "speaker": null
//     },
//     {
//         "text": "the",
//         "start": 26480,
//         "end": 26632,
//         "confidence": 0.99996,
//         "speaker": null
//     },
//     {
//         "text": "forest.",
//         "start": 26656,
//         "end": 27326,
//         "confidence": 0.99748,
//         "speaker": null
//     },
//     {
//         "text": "The",
//         "start": 27488,
//         "end": 27762,
//         "confidence": 0.99961,
//         "speaker": null
//     },
//     {
//         "text": "air",
//         "start": 27786,
//         "end": 27970,
//         "confidence": 0.99998,
//         "speaker": null
//     },
//     {
//         "text": "grew",
//         "start": 28010,
//         "end": 28226,
//         "confidence": 0.99998,
//         "speaker": null
//     },
//     {
//         "text": "heavy",
//         "start": 28258,
//         "end": 28498,
//         "confidence": 0.99999,
//         "speaker": null
//     },
//     {
//         "text": "with",
//         "start": 28514,
//         "end": 28642,
//         "confidence": 0.99995,
//         "speaker": null
//     },
//     {
//         "text": "the",
//         "start": 28666,
//         "end": 28754,
//         "confidence": 0.99997,
//         "speaker": null
//     },
//     {
//         "text": "scent",
//         "start": 28762,
//         "end": 29026,
//         "confidence": 0.99286,
//         "speaker": null
//     },
//     {
//         "text": "of",
//         "start": 29058,
//         "end": 29202,
//         "confidence": 0.99999,
//         "speaker": null
//     },
//     {
//         "text": "damp",
//         "start": 29226,
//         "end": 29506,
//         "confidence": 0.99999,
//         "speaker": null
//     },
//     {
//         "text": "earth",
//         "start": 29538,
//         "end": 29778,
//         "confidence": 0.94967,
//         "speaker": null
//     },
//     {
//         "text": "and",
//         "start": 29794,
//         "end": 29970,
//         "confidence": 0.98757,
//         "speaker": null
//     },
//     {
//         "text": "the",
//         "start": 30010,
//         "end": 30162,
//         "confidence": 0.99996,
//         "speaker": null
//     },
//     {
//         "text": "faint",
//         "start": 30186,
//         "end": 30578,
//         "confidence": 0.8167,
//         "speaker": null
//     },
//     {
//         "text": "metallic",
//         "start": 30674,
//         "end": 31186,
//         "confidence": 0.81735,
//         "speaker": null
//     },
//     {
//         "text": "tang",
//         "start": 31218,
//         "end": 31554,
//         "confidence": 0.55228,
//         "speaker": null
//     },
//     {
//         "text": "of",
//         "start": 31602,
//         "end": 31762,
//         "confidence": 0.99984,
//         "speaker": null
//     },
//     {
//         "text": "magic.",
//         "start": 31786,
//         "end": 32626,
//         "confidence": 0.99923,
//         "speaker": null
//     },
//     {
//         "text": "A",
//         "start": 32818,
//         "end": 33122,
//         "confidence": 0.99996,
//         "speaker": null
//     },
//     {
//         "text": "sudden",
//         "start": 33146,
//         "end": 33426,
//         "confidence": 0.99995,
//         "speaker": null
//     },
//     {
//         "text": "rustle",
//         "start": 33458,
//         "end": 33826,
//         "confidence": 0.99979,
//         "speaker": null
//     },
//     {
//         "text": "in",
//         "start": 33858,
//         "end": 33954,
//         "confidence": 0.99999,
//         "speaker": null
//     },
//     {
//         "text": "the",
//         "start": 33962,
//         "end": 34082,
//         "confidence": 0.99997,
//         "speaker": null
//     },
//     {
//         "text": "undergrowth",
//         "start": 34106,
//         "end": 34754,
//         "confidence": 0.6791,
//         "speaker": null
//     },
//     {
//         "text": "made",
//         "start": 34802,
//         "end": 34962,
//         "confidence": 0.99999,
//         "speaker": null
//     },
//     {
//         "text": "her",
//         "start": 34986,
//         "end": 35122,
//         "confidence": 0.99998,
//         "speaker": null
//     },
//     {
//         "text": "jump.",
//         "start": 35146,
//         "end": 35634,
//         "confidence": 0.99803,
//         "speaker": null
//     },
//     {
//         "text": "A",
//         "start": 35762,
//         "end": 36002,
//         "confidence": 0.99994,
//         "speaker": null
//     },
//     {
//         "text": "cloaked",
//         "start": 36026,
//         "end": 36466,
//         "confidence": 0.8114,
//         "speaker": null
//     },
//     {
//         "text": "figure",
//         "start": 36498,
//         "end": 36786,
//         "confidence": 0.99997,
//         "speaker": null
//     },
//     {
//         "text": "emerged",
//         "start": 36818,
//         "end": 37266,
//         "confidence": 0.99997,
//         "speaker": null
//     },
//     {
//         "text": "from",
//         "start": 37298,
//         "end": 37442,
//         "confidence": 1,
//         "speaker": null
//     },
//     {
//         "text": "the",
//         "start": 37466,
//         "end": 37602,
//         "confidence": 0.99996,
//         "speaker": null
//     },
//     {
//         "text": "shadows,",
//         "start": 37626,
//         "end": 38210,
//         "confidence": 0.99975,
//         "speaker": null
//     },
//     {
//         "text": "a",
//         "start": 38290,
//         "end": 38482,
//         "confidence": 0.99995,
//         "speaker": null
//     },
//     {
//         "text": "staff",
//         "start": 38506,
//         "end": 38834,
//         "confidence": 0.51551,
//         "speaker": null
//     },
//     {
//         "text": "glowing",
//         "start": 38922,
//         "end": 39266,
//         "confidence": 0.66707,
//         "speaker": null
//     },
//     {
//         "text": "in",
//         "start": 39298,
//         "end": 39442,
//         "confidence": 0.99999,
//         "speaker": null
//     },
//     {
//         "text": "their",
//         "start": 39466,
//         "end": 39650,
//         "confidence": 0.99968,
//         "speaker": null
//     },
//     {
//         "text": "hand.",
//         "start": 39690,
//         "end": 40322,
//         "confidence": 0.99509,
//         "speaker": null
//     },
//     {
//         "text": "Elara",
//         "start": 40506,
//         "end": 41346,
//         "confidence": 0.90395,
//         "speaker": null
//     },
//     {
//         "text": "gripped",
//         "start": 41378,
//         "end": 41618,
//         "confidence": 0.99994,
//         "speaker": null
//     },
//     {
//         "text": "her",
//         "start": 41634,
//         "end": 41762,
//         "confidence": 0.99996,
//         "speaker": null
//     },
//     {
//         "text": "sword,",
//         "start": 41786,
//         "end": 42306,
//         "confidence": 0.93053,
//         "speaker": null
//     },
//     {
//         "text": "ready",
//         "start": 42418,
//         "end": 42658,
//         "confidence": 0.99999,
//         "speaker": null
//     },
//     {
//         "text": "for",
//         "start": 42674,
//         "end": 42850,
//         "confidence": 0.78788,
//         "speaker": null
//     },
//     {
//         "text": "a.",
//         "start": 42890,
//         "end": 42970,
//         "confidence": 0.99908,
//         "speaker": null
//     }
// ];

  export async function generateCaptions (audioFileUrl: string) {
    try{
        const data = {
            audio_url: audioFileUrl,
        };

        const transcript: any = await client.transcripts.transcribe(data);
        console.log("transcript.words.length => ", transcript.words);
        return transcript.words; 
        // return captionsArray;
    }catch (error: any) {
        console.log(error);
        throw new Error(error);
        
    }
  }