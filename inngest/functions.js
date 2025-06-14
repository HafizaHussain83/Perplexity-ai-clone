import { supabase } from "@/services/supasbase";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        return { message: `Hello ${event.data.email}!` };
    },
);

export const llmModel = inngest.createFunction(
    { id: 'llm-model' },
    { event: 'llm-model' },
    async ({ event, step }) => {
        const aiResp = await step.ai.infer('generate-ai-llm-model-call', {
            model: step.ai.models.gemini({
                model: 'gemini-2.0-flash-exp-image-generation',
                apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY
            }),
            body: {
                contents: [
                    {
                        role: 'assistant',
                        parts: [
                            {
                                text: 'Depends on user input sources, Summerize and search about topic, Give e markdowb text with proper formatting. User Input is:'
                                    + event.data.searchInput
                            }
                        ]
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: JSON.stringify(event.data.searchResult)
                            }
                        ]
                    }
                ]
            }
        })

        const saveToDb = await step.run('saveToDb', async () => {
            console.log(aiResp)
            const { data, error } = await supabase
                .from('Chats')
                .update({ aiResp: aiResp?.candidates[0].content.parts[0].text })
                .eq('id', event.data.recordId)
                .select()

            return aiResp;
        })



    }
)

// export const llmModel = inngest.createFunction(
//     { id: 'llm-model' },
//     { event: 'llm-model' },
//     async ({ event, step }) => {
//         const aiResp = await step.ai.infer('generate-ai-llm-model-call', {
//             model: step.ai.models.gemini({
//                 model: 'gemini-2.0-flash-exp-image-generation',
//                 apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY
//             }),
//             body: {
//                 contents: [
//                     {
//                         role: 'assistant',
//                         parts: [
//                             {
//                                 text: 'Depends on user input sources, Summerize and search about topic, Give e markdowb text with proper formatting. User Input is:'
//                                     + event.data.searchInput
//                             }
//                         ]
//                     },
//                     {
//                         role: "user",
//                         parts: [
//                             {
//                                 text: JSON.stringify(event.data.searchResult)
//                             }
//                         ]
//                     }
//                 ]
//             }
//         });

//         console.log(aiResp);

//         // Update the aiResp in the database
//         const { error } = await supabase
//             .from('Chats')
//             .update({ aiResp: aiResp?.candidates[0]?.content?.parts[0]?.text })
//             .eq('id', event.data.recordId);

//         if (error) {
//             console.error("Supabase update error:", error.message);
//             return { error: error.message };
//         }

//         return { aiResp: aiResp?.candidates[0]?.content?.parts[0]?.text };
//     }
// );
