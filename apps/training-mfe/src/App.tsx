import * as styles from './App.module.css';

// Exposed by the federation plugin as 'training-mfe/App' and
// 'training-mfe/RemoteEntry'. Keep this as a non-product placeholder.
export function App() {
  return (
    <section data-testid="training-mfe" className={styles.container}>
      <h3 className={styles.title}>training-mfe placeholder</h3>
      <p>Remote cargado correctamente desde shell por Module Federation.</p>
    </section>
  );
}

export default App;
