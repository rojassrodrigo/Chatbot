// import { useEffect, useRef, useState } from 'react'

// type Message = {
//   id: string;
//   type: 'bot' | 'user';
//   text: React.ReactNode;
// }

// const EXAMPLES = [{"label": "Intro", "text": "Hola, como estas?"}, {"label": "Intro", "text": "Como te llamas?"}, {"label": "Intro", "text": "Cuál es tu experiencia laboral como desarrollador web?"}, {"label": "Misproyectos", "text": "Podrías contarme sobre algún proyecto en el que hayas trabajado recientemente?"}, {"label": "Habilidades", "text": "En qué lenguajes de programación estás especializado?"}, {"label": "Habilidades", "text": "Qué herramientas utilizas para desarrollar aplicaciones web?"}, {"label": "Intro", "text": "Tienes alguna certificación relacionada con el desarrollo web?"}, {"label": "Intro", "text": "Cómo te mantienes actualizado en cuanto a las últimas tecnologías y tendencias en desarrollo web?"}, {"label": "Misproyectos", "text": "Puedes proporcionar ejemplos de proyectos de código abierto en los que hayas trabajado?"}, {"label": "Contacto", "text": "Cómo puedo ponerme en contacto contigo para discutir un proyecto o contratar tus servicios?"}, {"label": "Contacto", "text": "Cómo puedo ponerme en contacto contigo?"}, {"label": "Intro", "text": "Cuál es tu formación académica en desarrollo web?"}, {"label": "Misproyectos", "text": "Has trabajado en algún proyecto en equipo? ¿Podrías contarme más sobre esa experiencia?"}, {"label": "Habilidades", "text": "Cuáles son tus habilidades principales como desarrollador web full stack?"}, {"label": "Habilidades", "text": "Has trabajado con alguna tecnología de programación en particular que sea tu especialidad?"}, {"label": "Misproyectos", "text": "Cuál es tu enfoque en cuanto al diseño web?"}, {"label": "Desafios", "text": "Qué tipo de proyectos te interesan más?"}, {"label": "Desafios", "text": "Qué tipo de proyectos te gustaría trabajar en el futuro?"}, {"label": "Contacto", "text": "Qué herramientas de control de versiones utilizas?"}, {"label": "Contacto", "text": "Podrías explicar un concepto de programación complejo en términos simples?"}, {"label": "Misproyectos", "text": "Cuál ha sido el proyecto más desafiante en el que has trabajado y cómo lo superaste?"}, {"label": "Desafios", "text": "En qué te gustaría centrarte en el futuro en términos de tecnologías o habilidades?"}, {"label": "Contacto", "text": "Ofreces servicios de mantenimiento y actualización de sitios web?"}, {"label": "Contacto", "text": "Qué tan importante es la calidad del código en tus proyectos?"}, {"label": "Contacto", "text": "Tienes experiencia en desarrollo de aplicaciones móviles?"}, {"label": "Contacto", "text": "Cual es tu espectativa salarial?"}, {"label": "Contacto", "text": "Cuanto cobras por tus servicios"}, {"label": "Desafios", "text": "Sos una IA?"}]
 
// const API_KEY = '5eKyvh6gkM27NJaP2wDF1WR4NrbR5HvvneQZVJx4';

// const ANSWERS = {
//   desafios: (
//     <p>En realidad soy una IA entrenada por Rodrigo Rojas para contestar algunas cosas, asi que volveme a pregtara</p>
//   ),
//   intro: (
//     <p>Soy Rodrigo Rojas, soy full stack developer y tengo que agregar un monton de informacion</p>
//   )
// }

// function App() {
//   const [question, setQuestion] = useState<string>('')
//   const [loading, setLoading] = useState<boolean>(false)
//   const ref = useRef<HTMLDivElement>(null)
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: '1',
//       type: 'bot',
//       text: 'Hola, soy un bot que esta preparado para responder preguntas de Rodri'
//     }
// ])

// const handleSubmit = async (event: React.FormEvent) => {
//   event.preventDefault();
  
//   if(loading) return;

//   setLoading(true)
//   setMessages((messages) => messages.concat({id: String(Date.now()), type: "user", text: question}))
//   setQuestion('')
//   try {
//    const {classifications} = await fetch('https://api.cohere.ai/v1/classify', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         model: 'large',
//         inputs: [question],
//         examples: EXAMPLES
//       })
//     }).then((res) => res.json());

//     setMessages((messages) => 
//     messages.concat({
//       id: String(Date.now()), 
//       type: "bot", 
//       text: ANSWERS[classifications[0] as keyof typeof ANSWERS]
//     }))
//     setLoading(false)
//     console.log(classifications)

//   } catch (error) {
//     console.log(error);
//   }
// };

//   useEffect(() => {
//     ref.current?.scrollTo(0, ref.current.scrollHeight)
//   },[messages])

//   return (
//    <main className='p-4'>
//     <div className='flex flex-col gap-4 m-auto max-w-lg border border-gray-400 p-4 rounded-md'>
//       <div ref={ref} className='flex flex-col gap-4 h-[250px] overflow-y-auto'>
//       {
//         messages.map((message) => (
//           <div 
//             key={message.id} 
//             className={`p-4 max-w-[80%] rounded-3xl text-white ${
//             message.type === "bot" 
//             ? "bg-slate-500 text-left self-start rounded-bl-none" 
//             : "bg-blue-500 text-right self-end rounded-br-none"}`}
//             >
//               {message.text}
//               </div>
//         ))
//       }
//       </div>
//       <form className='flex items-center' onSubmit={handleSubmit}>
//         <input 
//         value={question}
//         onChange={(event) => setQuestion(event.target.value)}
//         className='rounded rounded-r-none flex-1 border border-gray-400 py-2 px-4' 
//         type='text'
//         placeholder='Escribe tu pregunta...'
//         />
//         <button className={`px-4 py-2 bg-blue-500 rounded-lg rounded-l-none ${loading ? "bg-blue-300" : "bg-blue-500" }`} type='submit'>Enviar</button>
//       </form>
//     </div>
//    </main>
//   )
// }

// export default App
