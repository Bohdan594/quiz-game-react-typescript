import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QuizProvider } from './QuizContext.tsx'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QuizProvider>
        <App />
    </QuizProvider>
)
