import "./App.css"

function App() {

  return (
    <main className="main-content">
      <section className="side-bar">

        <div className="inputs-container">
          <div className="input-container">
            <label>X</label>
            <input className="input-x input-coordinate" placeholder="0" min={0} type="number" />
          </div>

          <div className="input-container">
            <label>Y</label>
            <input className="input-x input-coordinate" placeholder="0" min={0} type="number" />
          </div>
        </div>
        
        <button className="active-pixel">Ativar pixel</button>

        <div className="see-data">
          <div className="min-title">Coordenadas definidas</div>
          <div>C. do mundo: </div>
          <div>C. do usuário: </div>
          <div>C. Dispositivo: </div>
        </div>

      </section>


      <section className="content">
        <div className="chart">

        </div>
      </section>
    </main>
  )
}

export default App
