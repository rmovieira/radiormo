import { createContext } from 'react'

export const ContextoGeral = createContext(1)

export default function Geral({ level, children }) {
    return (
      <section className="section">
        <LevelContext.Provider value={level}>
          {children}
        </LevelContext.Provider>
      </section>
    )
  }