

import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { useTheme } from './hooks/useTheme';
import './App.css';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-shell">
      <PipelineToolbar theme={theme} toggleTheme={toggleTheme} />
      <div className="app-canvas-area">
        <PipelineUI theme={theme} />
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;

