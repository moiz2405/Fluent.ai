// "use client";
// import React, { useState, useEffect, useRef } from 'react';

// const STOP_SEQUENCES = ['world'];

// interface AIModelSession {
//   languageModel: {
//     capabilities: () => Promise<{ available: string }>;
//     create: (options: { systemPrompt: string }) => Promise<AIModelSession>;
//   };
//   promptStreaming: (inputText: string, options: { signal: AbortSignal }) => Promise<AsyncIterable<string>>;
// }

// interface AI {
//   languageModel: {
//     capabilities: () => Promise<{ available: string }>;
//     create: (options: { systemPrompt: string }) => Promise<AIModelSession>;
//   };
// }

// function LanguageModelComponent() {
//   const [inputText, setInputText] = useState<string>('');
//   const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
//   const [isStreaming, setIsStreaming] = useState<boolean>(false);
//   const [session, setSession] = useState<AIModelSession | null>(null);
//   const [isAvailable, setIsAvailable] = useState<boolean>(false);

//   const chatboxRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const initializeSession = async () => {
//       if (typeof chrome !== 'undefined' && chrome.ai && chrome.ai.languageModel) {
//         const { available } = await chrome.ai.languageModel.capabilities();
//         if (available !== 'no') {
//           const newSession = await chrome.ai.languageModel.create({
//             systemPrompt: 'Your system prompt here...',
//           });
//           setSession(newSession);
//           setIsAvailable(true);
//         } else {
//           console.warn('AI model is not available.');
//         }
//       } else {
//         console.warn('Chrome AI API is not available.');
//       }
//     };

//     initializeSession();
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputText(e.target.value);
//   };

//   const handleStreamPrompt = async () => {
//     if (session && inputText.trim()) {
//       const userMessage = { sender: 'user', text: inputText };
//       setMessages((prev) => [...prev, userMessage]);
//       setInputText('');

//       const abortController = new AbortController();
//       const signal = abortController.signal;
//       setIsStreaming(true);

//       const stream = await session.promptStreaming(inputText, { signal });

//       let responseText = '';
//       let lastMessageIndex = -1;

//       try {
//         for await (const chunk of stream) {
//           responseText += chunk;

//           setMessages((prev) => {
//             const updatedMessages = [...prev];
//             lastMessageIndex = updatedMessages.findIndex((msg) => msg.sender === 'ai');

//             if (lastMessageIndex !== -1) {
//               updatedMessages[lastMessageIndex].text = responseText;
//             } else {
//               updatedMessages.push({ sender: 'ai', text: responseText });
//             }

//             return updatedMessages;
//           });

//           // Check for stop sequences to abort if needed
//           for (const stopSequence of STOP_SEQUENCES) {
//             if (responseText.toLowerCase().includes(` ${stopSequence.toLowerCase()} `)) {
//               console.log(`Stop sequence "${stopSequence}" found. Aborting.`);
//               abortController.abort();
//               setIsStreaming(false);
//               return;
//             }
//           }
//         }
//       } catch (error) {
//         if (error.name === 'AbortError') {
//           console.log('Streaming aborted.');
//         }
//       }

//       setIsStreaming(false);
//     }
//   };

//   // Scroll to the bottom of the chatbox whenever a new message is added
//   useEffect(() => {
//     if (chatboxRef.current) {
//       chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <div style={styles.container}>
//       <header style={styles.header}>Chatbot</header>
//       {isAvailable ? (
//         <>
//           <div ref={chatboxRef} style={styles.chatbox}>
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 style={{
//                   ...styles.message,
//                   ...(message.sender === 'user' ? styles.userMessage : styles.aiMessage),
//                 }}
//               >
//                 {message.text}
//               </div>
//             ))}
//           </div>
//           <div style={styles.inputContainer}>
//             <input
//               value={inputText}
//               onChange={handleInputChange}
//               placeholder="Type your message..."
//               style={styles.input}
//               onKeyPress={(e) => {
//                 if (e.key === 'Enter' && !isStreaming) handleStreamPrompt();
//               }}
//               disabled={isStreaming}
//             />
//             <button
//               onClick={handleStreamPrompt}
//               disabled={isStreaming || !inputText.trim()}
//               style={styles.button}
//             >
//               {isStreaming ? '...' : 'Send'}
//             </button>
//           </div>
//         </>
//       ) : (
//         <p style={styles.unavailableText}>
//           AI language model is not available on this device or browser.
//         </p>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     height: '100vh',
//     margin: 0,
//     padding: 0,
//     backgroundColor: '#202020',
//     fontFamily: 'Arial, sans-serif',
//     alignItems: 'center',
//   },
//   header: {
//     background: '#4caf50',
//     color: 'white',
//     textAlign: 'center',
//     padding: '15px 0',
//     fontSize: '1.5rem',
//     fontWeight: 'bold',
//     width: '100%',
//     maxWidth: '700px',
//   },
//   chatbox: {
//     flex: 1,
//     overflowY: 'auto',
//     padding: '20px',
//     background: '#ffffff',
//     width: '100%',
//     maxWidth: '700px',
//     borderRadius: '10px',
//     marginTop: '20px',
//   },
//   message: {
//     margin: '10px 0',
//     padding: '10px 15px',
//     borderRadius: '10px',
//     maxWidth: '80%',
//     lineHeight: '1.5',
//     wordBreak: 'break-word',
//     wordWrap: 'break-word',
//   },
//   userMessage: {
//     backgroundColor: '#d1e7dd',
//     alignSelf: 'flex-end',
//     textAlign: 'right',
//     marginLeft: 'auto',
//   },
//   aiMessage: {
//     backgroundColor: '#e7f3fe',
//     alignSelf: 'flex-start',
//     textAlign: 'left',
//     marginRight: 'auto',
//   },
//   inputContainer: {
//     display: 'flex',
//     padding: '15px',
//     background: '#f9f9f9',
//     borderTop: '1px solid #ddd',
//     width: '100%',
//     maxWidth: '700px',
//   },
//   input: {
//     flex: 1,
//     padding: '10px',
//     borderRadius: '20px',
//     border: '1px solid #ccc',
//     marginRight: '10px',
//     fontSize: '1rem',
//   },
//   button: {
//     padding: '10px 20px',
//     borderRadius: '20px',
//     border: 'none',
//     background: '#4caf50',
//     color: 'white',
//     fontSize: '1rem',
//     cursor: 'pointer',
//   },
//   unavailableText: {
//     padding: '20px',
//     textAlign: 'center',
//     color: 'red',
//     fontWeight: 'bold',
//   },
// };

// export default LanguageModelComponent;
