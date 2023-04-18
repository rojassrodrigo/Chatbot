import { useEffect, useRef, useState } from 'react'

type Message = {
  id: string;
  type: "bot" | "user";
  text: React.ReactNode;
};

const EXAMPLES = [{"label": "Intro", "text": "Hola, como estas?"}, {"label": "Intro", "text": "Como te llamas?"}, {"label": "Proyectos", "text": "Cuál es tu experiencia como desarrollador web?"}, {"label": "Proyectos", "text": "Podrías contarme sobre algún proyecto en el que hayas trabajado recientemente?"}, {"label": "Habilidades", "text": "En qué lenguajes de programación estás especializado?"}, {"label": "Habilidades", "text": "Qué herramientas utilizas para desarrollar aplicaciones web?"}, {"label": "Proyectos", "text": "Puedes proporcionar ejemplos de proyectos de código abierto en los que hayas trabajado?"}, {"label": "Contacto", "text": "Cómo puedo ponerme en contacto contigo o contratar tus servicios?"}, {"label": "Contacto", "text": "Cómo puedo ponerme en contacto contigo?"}, {"label": "Intro", "text": "Cuál es tu formación académica ?"}, {"label": "Proyectos", "text": "Has trabajado en algún proyecto en equipo? "}, {"label": "Habilidades", "text": "Cuáles son tus habilidades principales ?"}, {"label": "Habilidades", "text": "Has trabajado con alguna tecnología de programación?"}, {"label": "Desafios", "text": "Qué tipo de proyectos te interesan más a futuro?"}, {"label": "Desafios", "text": "Qué tipo de proyectos te gustaría trabajar en el futuro?"}, {"label": "Contacto", "text": "Qué herramientas de control de versiones utilizas?"}, {"label": "Contacto", "text": "Podrías explicar un conceptos complejo en términos simples?"}, {"label": "Proyectos", "text": "Cuál ha sido el proyecto más desafiante en el que has trabajado y cómo lo superaste?"}, {"label": "Desafios", "text": "En qué te gustaría centrarte en el futuro?"}, {"label": "Contacto", "text": "Ofreces servicios de mantenimiento y actualización de sitios web?"}, {"label": "Contacto", "text": "Qué tan importante es la calidad del código en tus proyectos?"}, {"label": "Contacto", "text": "Tienes experiencia en desarrollo de aplicaciones móviles?"}, {"label": "Contacto", "text": "Cual es tu espectativa salarial?"}, {"label": "Chatbot", "text": "Sos una IA?"}, {"label": "Chatbot", "text": "Estas hecho con inteligencia artificial?"}, {"label": "Chatbot", "text": "Quien contesta este chat?"}, {"label": "Chatbot", "text": "Como funciona este chat?"}, {"label": "Contacto", "text": "Te quiero ofrecer trabajo"}, {"label": "Contacto", "text": "Tienes redes sociales?"}]
 
const API_KEY = '5eKyvh6gkM27NJaP2wDF1WR4NrbR5HvvneQZVJx4';

const ANSWERS = {
  Chatbot: (
    <p>Soy un chatbot que esta impulsado con Inteligencia Artificial. Estoy diseñado por Rodrigo Rojas para
      responder preguntas automatizadas en tiempo real relacionadas con su portafolio. Puedes hacerme cualquier pregunta relacionada con
       los proyectos que se encuentran en el portafolio y yo te ayudaré a responderla.</p>
  ),
  Intro: (
    <p>Hola, soy Rodrigo, un desarrollador Full Stack con sólidos conocimientos en Backend y Frontend. 
      Además, tengo habilidades en resolución creativa de problemas, trabajo en equipo, 
      adaptabilidad y organización. Soy apasionado por el aprendizaje y la mejora continua. 
      ¡Gracias por visitar mi perfil!</p>
  ),
  Contacto: (
    <p>Hola, gracias por tu interés. Puedes contactarme a través de mi correo electrónico.
      Mis expectativas salariales dependen del proyecto. 
      ¡Sería genial trabajar juntos! Encuéntrame en LinkedIn para conocer más sobre mi experiencia y habilidades.</p>
  ),
  Habilidades: (
    <p>Soy un desarrollador Full Stack especializado en JavaScript, TypeScript, React, Node.js y 
      bases de datos SQL/NoSQL. Utilizo herramientas como Redux, Express.js, MongoDB, Sequelize.
       Además, tengo experiencia en la metodología Scrum y mis habilidades incluyen trabajo en equipo, 
       adaptabilidad, resolución de problemas y organización.</p>
  ),
  Desafios: (
    <p>Me gustaría trabajar en proyectos innovadores que utilicen tecnologías de vanguardia para resolver 
      problemas importantes. Me interesa seguir mejorando mis habilidades en Backend y Frontend, 
      así como en metodologías ágiles como Scrum. En el futuro, me gustaría centrarme en el desarrollo 
      de software que tenga un impacto positivo en la sociedad y el medio ambiente.</p>
  ),
  Proyectos: (
    <p>Como desarrollador web, he trabajado en varios proyectos los cuales puedes encontrar en mi portafolio. 
      En mi ultimo proyecto trabajé en una plataforma de e-commerce social para adopción de animales, 
      usando la metodología Scrum con un equipo de siete personas, con el objetivo de facilitar adopciones, donaciones y 
      apadrinamientos para refugios.</p>
  ),
}; 

function App() {
  const [question, setQuestion] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: 'Hola, soy un bot impulsado por Inteligencia Artificial diseñado por Rodrigo para ayudarte con cualquier consulta.'
    }
])

const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  
  if(loading) return;

  setLoading(true)
  setMessages((messages) => messages.concat({id: String(Date.now()), type: "user", text: question}))
  setQuestion("")
  
   const {classifications} = await fetch('https://api.cohere.ai/v1/classify', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'large',
        inputs: [question],
        examples: EXAMPLES
      })
    }).then((res) => res.json());

    setMessages((messages) => 
    messages.concat({
      id: String(Date.now()), 
      type: "bot", 
      text: ANSWERS[classifications[0].prediction as keyof typeof ANSWERS] || ANSWERS["Chatbot"],

    }))
    setLoading(false)
    console.log(classifications)
};

  useEffect(() => {
    ref.current?.scrollTo(0, ref.current.scrollHeight)
  },[messages])

  return (
   <main className='p-4'>
    <div className='flex flex-col gap-4 m-auto max-w-lg border border-gray-400 p-4 rounded-md'>
      <div ref={ref} className='flex flex-col gap-4 h-[250px] overflow-y-auto'>
      {
        messages.map((message) => (
          <div 
            key={message.id} 
            className={`p-4 max-w-[80%] rounded-3xl text-white ${
            message.type === "bot" 
            ? "bg-slate-500 text-left self-start rounded-bl-none" 
            : "bg-blue-500 text-right self-end rounded-br-none"}`}
            >
              {message.text}
              </div>
        ))
      }
      </div>
      <form className='flex items-center' onSubmit={handleSubmit}>
        <input 
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        className='rounded rounded-r-none flex-1 border border-gray-400 py-2 px-4' 
        type='text'
        placeholder='Escribe tu pregunta...'
        style={{ color: 'black' }} // Agregar esta línea
        />
        <button className={`px-4 py-2 bg-blue-500 rounded-lg rounded-l-none ${loading ? "bg-blue-300" : "bg-blue-500" }`} type='submit'>Enviar</button>
      </form>
    </div>
   </main>
  )
}

export default App
