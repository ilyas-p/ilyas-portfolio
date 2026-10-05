import { useState } from 'react';
import {
  Bot,
  Send,
  X,
  Sparkles,
  ArrowUpRight,
  MessageCircle,
} from 'lucide-react';

import { profile } from '../data/profile.js';

const SUGGESTIONS = [
  'Who is Mohammed Ilyas?',
  'What are his skills?',
  'Tell me about his projects',
];

const PROJECTS = [
  {
    title: 'CodeMentor AI',
    description:
      'AI-powered interactive coding platform for learning programming through practice, hints and feedback.',
    category: 'AI / Full Stack',
  },
  {
    title: '3D Penalty Shootout',
    description:
      'Interactive 3D football game with player animations, goalkeeper movement and touch-based aiming.',
    category: 'React / Three.js',
  },
  {
    title: 'Online Jersey Store',
    description:
      'Django-based e-commerce application with authentication, products, search and cart functionality.',
    category: 'Django / E-Commerce',
  },
];

function getResponse(question) {
  const q = question.toLowerCase();

  if (
    q.includes('who is') ||
    q.includes('about mohammed') ||
    q.includes('introduce')
  ) {
    return {
      text: `Mohammed Ilyas is a Full Stack Developer focused on building modern web applications, interactive experiences and AI-powered projects.`,
    };
  }

  if (
    q.includes('skill') ||
    q.includes('technology') ||
    q.includes('technologies') ||
    q.includes('tech stack')
  ) {
    return {
      text: `His technical skills include Python, JavaScript, React, Flask, Django, HTML, CSS, SQL and Three.js.`,
    };
  }

  if (
    q.includes('project') ||
    q.includes('projects') ||
    q.includes('built')
  ) {
    return {
      text: `Mohammed has worked on projects across AI, full-stack development, 3D graphics and e-commerce.`,
      showProjects: true,
    };
  }

  if (q.includes('codementor') || q.includes('coding platform')) {
    return {
      text: `CodeMentor AI is an AI-powered interactive coding platform designed to help students learn programming through practice, intelligent hints, code analysis and progress tracking.`,
    };
  }

  if (
    q.includes('football') ||
    q.includes('penalty') ||
    q.includes('3d game')
  ) {
    return {
      text: `The 3D Penalty Shootout is an interactive football game built using React and Three.js with player and goalkeeper animations, touch-based aiming and scoring mechanics.`,
    };
  }

  if (
    q.includes('jersey') ||
    q.includes('ecommerce') ||
    q.includes('e-commerce') ||
    q.includes('store')
  ) {
    return {
      text: `The Online Jersey Store is a Django-based e-commerce project with authentication, product browsing, search, product details and cart functionality.`,
    };
  }

  return {
    text: `I can help you explore Mohammed's background, skills, projects and experience. Try one of the suggested questions.`,
  };
}

function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hi 👋 I'm Ilyas Assistant. I can tell you about ${profile.name || 'Mohammed Ilyas'
        }, his skills, projects, and experience.`,
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (message = input) => {
    const text = message.trim();

    if (!text || isTyping) return;

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        sender: 'user',
        text,
      },
    ]);

    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(text);

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: response.text,
          showProjects: response.showProjects || false,
        },
      ]);

      setIsTyping(false);
    }, 650);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  /* =====================================================
     FLOATING CHAT BUTTON
     ===================================================== */

  if (!isOpen) {
    return (
      <div className="portfolio-chatbot-launcher-wrap">
        <span className="portfolio-chatbot-help-text">
          How can I help you?
        </span>

        <button
          type="button"
          className="portfolio-chatbot-launcher"
          onClick={() => setIsOpen(true)}
          aria-label="Open Ilyas Assistant"
        >
          <MessageCircle size={23} />

          <span className="portfolio-chatbot-launcher-dot" />
        </button>
      </div>
    );
  }

  return (
    <section
      className="portfolio-chatbot"
      aria-label="Ilyas Assistant"
    >
      {/* HEADER */}

      <header className="portfolio-chatbot-header">
        <div className="portfolio-chatbot-brand">

          <div className="portfolio-chatbot-brand-icon">
            <Bot size={18} />
          </div>

          <div>
            <h3>Ilyas Assistant</h3>

            <div className="portfolio-chatbot-status">
              <span />
              Portfolio guide
            </div>
          </div>

        </div>

        <button
          type="button"
          className="portfolio-chatbot-close"
          onClick={() => setIsOpen(false)}
          aria-label="Close chatbot"
        >
          <X size={18} />
        </button>
      </header>


      {/* CHAT BODY */}

      <div className="portfolio-chatbot-body">
        <div className="portfolio-chat-welcome">
          <h4>How can I help you?</h4>
        </div>

        {messages.map((message) => (
          <div
            key={message.id}
            className={`portfolio-chat-message portfolio-chat-message-${message.sender}`}
          >

            {message.sender === 'bot' && (
              <div className="portfolio-chat-avatar">
                <Sparkles size={15} />
              </div>
            )}

            <div className="portfolio-chat-content">

              <div className="portfolio-chat-bubble">
                {message.text}
              </div>


              {/* PROJECT CARDS */}

              {message.showProjects && (
                <div className="portfolio-chat-projects">

                  {PROJECTS.map((project) => (
                    <button
                      type="button"
                      key={project.title}
                      className="portfolio-chat-project-card"
                      onClick={() =>
                        sendMessage(
                          `Tell me about ${project.title}`
                        )
                      }
                    >
                      <div className="portfolio-chat-project-info">

                        <span className="portfolio-chat-project-category">
                          {project.category}
                        </span>

                        <strong>
                          {project.title}
                        </strong>

                        <p>
                          {project.description}
                        </p>

                      </div>

                      <ArrowUpRight size={17} />
                    </button>
                  ))}

                </div>
              )}

            </div>

          </div>
        ))}


        {/* TYPING */}

        {isTyping && (
          <div className="portfolio-chat-message portfolio-chat-message-bot">

            <div className="portfolio-chat-avatar">
              <Sparkles size={15} />
            </div>

            <div className="portfolio-chat-bubble portfolio-chat-typing">
              <span />
              <span />
              <span />
            </div>

          </div>
        )}

      </div>


      {/* SUGGESTIONS */}


      <div className="portfolio-chat-suggestions">
        {SUGGESTIONS.map((suggestion) => (
          <button
            type="button"
            key={suggestion}
            onClick={() => sendMessage(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>


      {/* INPUT */}

      <form
        className="portfolio-chat-input-area"
        onSubmit={handleSubmit}
      >
        <div className="portfolio-chat-input-wrapper">

          <input
            type="text"
            value={input}
            onChange={(event) =>
              setInput(event.target.value)
            }
            placeholder="Ask about Mohammed..."
          />

          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            aria-label="Send message"
          >
            <Send size={18} />
          </button>

        </div>
      </form>

    </section>
  );
}

export default PortfolioChatbot;