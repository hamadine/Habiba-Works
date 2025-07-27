import { useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'

export default function Editor() {
  const canvasRef = useRef(null)
  const [canvas, setCanvas] = useState(null)
  const [snap, setSnap] = useState(true)
  const gridSize = 20

  // Fonction : dessine la grille
  const drawGrid = (fabricCanvas) => {
    for (let i = 0; i < (fabricCanvas.width / gridSize); i++) {
      fabricCanvas.add(new fabric.Line([i * gridSize, 0, i * gridSize, fabricCanvas.height], {
        stroke: '#ccc',
        selectable: false,
        evented: false
      }))
    }

    for (let i = 0; i < (fabricCanvas.height / gridSize); i++) {
      fabricCanvas.add(new fabric.Line([0, i * gridSize, fabricCanvas.width, i * gridSize], {
        stroke: '#ccc',
        selectable: false,
        evented: false
      }))
    }
  }

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas('fabricCanvas', {
      width: 800,
      height: 600,
      backgroundColor: '#f8f8f8',
      selection: true,
    })
    setCanvas(fabricCanvas)

    drawGrid(fabricCanvas)

    // Snap des objets
    fabricCanvas.on('object:moving', function (e) {
      if (!snap) return
      const obj = e.target
      obj.set({
        left: Math.round(obj.left / gridSize) * gridSize,
        top: Math.round(obj.top / gridSize) * gridSize
      })
    })

    return () => fabricCanvas.dispose()
  }, [snap])

  const addRect = () => {
    const rect = new fabric.Rect({
      width: 100,
      height: 100,
      left: 100,
      top: 100,
      fill: 'blue',
    })
    canvas.add(rect)
  }

  const addCircle = () => {
    const circle = new fabric.Circle({
      radius: 50,
      left: 150,
      top: 150,
      fill: 'green',
    })
    canvas.add(circle)
  }

  const addText = () => {
    const text = new fabric.Textbox('Texte ici', {
      left: 200,
      top: 200,
      fontSize: 20,
      fill: 'black',
    })
    canvas.add(text)
  }

  const clearCanvas = () => {
    canvas.getObjects().forEach(obj => {
      if (obj.selectable !== false) canvas.remove(obj)
    })
  }

  const saveCanvas = () => {
    const json = canvas.toJSON()
    localStorage.setItem('savedCanvas', JSON.stringify(json))
    alert('Maquette sauvegardée')
  }

  const loadCanvas = () => {
    const saved = localStorage.getItem('savedCanvas')
    if (saved) {
      canvas.loadFromJSON(saved, canvas.renderAll.bind(canvas))
    }
  }

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={addRect} className="px-2 py-1 bg-blue-500 text-white rounded">Rectangle</button>
        <button onClick={addCircle} className="px-2 py-1 bg-green-500 text-white rounded">Cercle</button>
        <button onClick={addText} className="px-2 py-1 bg-gray-700 text-white rounded">Texte</button>
        <button onClick={clearCanvas} className="px-2 py-1 bg-red-600 text-white rounded">Effacer</button>
        <button onClick={saveCanvas} className="px-2 py-1 bg-yellow-500 text-white rounded">Sauvegarder</button>
        <button onClick={loadCanvas} className="px-2 py-1 bg-indigo-600 text-white rounded">Charger</button>
        <button onClick={() => setSnap(!snap)} className="px-2 py-1 bg-purple-600 text-white rounded">
          {snap ? 'Désactiver' : 'Activer'} Snap
        </button>
      </div>
      <canvas id="fabricCanvas" ref={canvasRef} className="border" />
    </div>
  )
}
